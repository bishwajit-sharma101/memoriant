const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Helper to prompt user inputs in terminal
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans);
  }));
};

// 1. Read environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (err) {
  console.error('Error: Could not read client/.env.local file.');
  process.exit(1);
}

const env = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Could not read Supabase URL or Anon Key from .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runCrossUserTest(emailA, passwordA, emailB, passwordB) {
  console.log(`\nRunning Cross-User Validation:`);
  console.log(`- User A: ${emailA}`);
  console.log(`- User B: ${emailB}`);

  // Client A session
  const clientA = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  });
  
  const { data: loginA, error: loginAError } = await clientA.auth.signInWithPassword({
    email: emailA,
    password: passwordA
  });

  if (loginAError) {
    console.error(`FAIL: Could not log in as User A: ${loginAError.message}`);
    return;
  }

  const userA = loginA.user;
  console.log(`User A authenticated (ID: ${userA.id}). Creating private bookmark...`);

  // User A inserts a private bookmark
  const { data: bookmarkA, error: createError } = await clientA
    .from('bookmarks')
    .insert([{
      title: 'User A Private Reference',
      url: 'https://private-vault-a.com',
      is_public: false,
      user_id: userA.id
    }])
    .select()
    .single();

  if (createError) {
    console.error('FAIL: User A failed to create private bookmark:', createError.message);
    return;
  }
  
  console.log(`User A private bookmark created (ID: ${bookmarkA.id}).`);

  // Client B session
  const clientB = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  });
  
  const { data: loginB, error: loginBError } = await clientB.auth.signInWithPassword({
    email: emailB,
    password: passwordB
  });

  if (loginBError) {
    console.error(`FAIL: Could not log in as User B: ${loginBError.message}`);
    // Cleanup
    await clientA.from('bookmarks').delete().eq('id', bookmarkA.id);
    return;
  }

  const userB = loginB.user;
  console.log(`User B authenticated (ID: ${userB.id}).`);

  // User B attempts to read User A's private bookmark
  console.log(`User B attempting to read User A's private bookmark...`);
  const { data: readA } = await clientB
    .from('bookmarks')
    .select('*')
    .eq('id', bookmarkA.id);

  if (readA && readA.length > 0) {
    console.error('FAIL: User B was able to read User A\'s private bookmark!');
  } else {
    console.log('PASS: User B query returned 0 rows (User A\'s private bookmark is invisible).');
  }

  // User B attempts to update User A's bookmark
  console.log(`User B attempting to update User A's private bookmark title...`);
  const { data: updateB } = await clientB
    .from('bookmarks')
    .update({ title: 'Hacked by User B' })
    .eq('id', bookmarkA.id)
    .select();

  if (updateB && updateB.length > 0) {
    console.error('FAIL: User B was able to update User A\'s private bookmark!');
  } else {
    console.log('PASS: User B update affected 0 rows (Update blocked by RLS).');
  }

  // User B attempts to delete User A's bookmark
  console.log(`User B attempting to delete User A's private bookmark...`);
  const { data: deleteB } = await clientB
    .from('bookmarks')
    .delete()
    .eq('id', bookmarkA.id)
    .select();

  if (deleteB && deleteB.length > 0) {
    console.error('FAIL: User B was able to delete User A\'s private bookmark!');
  } else {
    console.log('PASS: User B delete affected 0 rows (Delete blocked by RLS).');
  }

  // Clean up test bookmark
  console.log('Cleaning up: User A deleting test bookmark...');
  await clientA.from('bookmarks').delete().eq('id', bookmarkA.id);
  console.log('Cleanup finished.');
}

async function runTests() {
  console.log('=== Starting Supabase RLS Security Verification ===\n');

  // Test 1: Anonymous Read of Bookmarks (Should only see public ones)
  console.log('Test 1: Querying bookmarks table anonymously...');
  const { data: selectData, error: selectError } = await supabase
    .from('bookmarks')
    .select('*');

  if (selectError) {
    console.error('FAIL: Anonymous select query failed with error:', selectError.message);
  } else {
    const privateBookmarks = selectData.filter(b => !b.is_public);
    if (privateBookmarks.length > 0) {
      console.error('FAIL: Anonymous client retrieved private bookmarks!', privateBookmarks);
    } else {
      console.log(`PASS: Anonymous select returned ${selectData.length} bookmarks. All of them are public. (Verified RLS block on private records)`);
    }
  }

  // Test 2: Anonymous Insert (Should fail RLS)
  console.log('\nTest 2: Attempting to insert a bookmark anonymously...');
  const { data: insertData, error: insertError } = await supabase
    .from('bookmarks')
    .insert([
      { title: 'Hacked Bookmark', url: 'https://hacked.com', is_public: false, user_id: '00000000-0000-0000-0000-000000000000' }
    ])
    .select();

  if (insertError) {
    console.log('PASS: Anonymous insert rejected by database policy. Error:', insertError.message);
  } else if (insertData && insertData.length > 0) {
    console.error('FAIL: Anonymous insert was allowed! Inserted record:', insertData);
  } else {
    console.log('PASS: Anonymous insert was blocked (no row was returned or written).');
  }

  // Test 3: Anonymous Update (Should fail/return empty)
  console.log('\nTest 3: Attempting to update a random bookmark anonymously...');
  const { data: updateData, error: updateError } = await supabase
    .from('bookmarks')
    .update({ title: 'Hacked Title' })
    .eq('is_public', false) // target a private bookmark
    .select();

  if (updateError) {
    console.log('PASS: Anonymous update rejected by database policy. Error:', updateError.message);
  } else if (updateData && updateData.length > 0) {
    console.error('FAIL: Anonymous update was allowed! Updated record:', updateData);
  } else {
    console.log('PASS: Anonymous update did not affect any private rows.');
  }

  // Test 4: Anonymous Delete (Should fail/return empty)
  console.log('\nTest 4: Attempting to delete a random bookmark anonymously...');
  const { data: deleteData, error: deleteError } = await supabase
    .from('bookmarks')
    .delete()
    .eq('is_public', false)
    .select();

  if (deleteError) {
    console.log('PASS: Anonymous delete rejected by database policy. Error:', deleteError.message);
  } else if (deleteData && deleteData.length > 0) {
    console.error('FAIL: Anonymous delete was allowed! Deleted record:', deleteData);
  } else {
    console.log('PASS: Anonymous delete did not affect any private rows.');
  }

  // Test 5: Cross-User Security Check (User A vs User B)
  console.log('\nTest 5: Cross-User Isolation (User A private bookmark vs User B update attempt)...');
  
  const randA = Math.random().toString(36).substring(7);
  const randB = Math.random().toString(36).substring(7);
  const emailA = `test_user_a_${randA}@memoriant.com`;
  const emailB = `test_user_b_${randB}@memoriant.com`;
  const password = 'Password123!';

  console.log(`Attempting to register User A: ${emailA}`);
  const { data: authA, error: authAError } = await supabase.auth.signUp({
    email: emailA,
    password: password
  });

  if (authAError) {
    console.log(`NOTICE: Programmatic signup failed (Error: ${authAError.message}).`);
    console.log('This happens when Email Confirmation is enabled on your Supabase dashboard.');
    
    const runChoice = await askQuestion('\nDo you want to log in using two existing confirmed test accounts? (y/n): ');
    if (runChoice.trim().toLowerCase() === 'y') {
      const emailInputA = await askQuestion('Enter Email for User A: ');
      const passInputA = await askQuestion('Enter Password for User A: ');
      const emailInputB = await askQuestion('Enter Email for User B: ');
      const passInputB = await askQuestion('Enter Password for User B: ');
      
      if (emailInputA && passInputA && emailInputB && passInputB) {
        await runCrossUserTest(emailInputA, passInputA, emailInputB, passInputB);
      } else {
        console.log('Invalid input. Skipping Test 5.');
      }
    } else {
      console.log('Skipping Test 5.');
    }
  } else {
    console.log('User A registered successfully. Logging in User A...');
    
    // Register User B
    console.log(`Registering User B: ${emailB}`);
    const { data: authB, error: authBError } = await supabase.auth.signUp({
      email: emailB,
      password: password
    });

    if (authBError) {
      console.log(`NOTICE: Failed to register User B: ${authBError.message}. Skipping Test 5.`);
    } else {
      await runCrossUserTest(emailA, password, emailB, password);
    }
  }

  console.log('\n=== Security Verification Completed ===');
}

runTests();
