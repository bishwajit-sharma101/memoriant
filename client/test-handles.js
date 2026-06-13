// Test implementation matching the clean-and-validate logic in utils/handle.ts
function generateAndValidateHandle(name, email) {
  const nameCleaned = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const emailPrefix = (email || '').split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  const baseHandle = nameCleaned || emailPrefix || 'user';

  if (baseHandle.length < 3) {
    return { error: 'Your name or email prefix must contain at least 3 alphanumeric characters to generate a valid username.' };
  }

  const RESERVED_HANDLES = [
    'signin', 'signup', 'dashboard', 'auth', 'verify-email', 'api', 
    '_next', 'static', 'favicon', 'favicon.ico', 'logo', 'logo.png', 
    'robots.txt', 'sitemap.xml', 'public', 'index', 'home', 'admin', 
    'user', 'memoriant'
  ];

  if (RESERVED_HANDLES.includes(baseHandle)) {
    return { error: 'This name or email generates a reserved username. Please use a different name or email.' };
  }

  return { handle: baseHandle };
}

// Assert helper to print pass/fail results
function assert(name, email, expectedHandle, expectedError) {
  const result = generateAndValidateHandle(name, email);
  if (expectedError) {
    if (result.error === expectedError) {
      console.log(`PASS: name="${name}", email="${email}" -> Correctly rejected: "${result.error}"`);
    } else {
      console.error(`FAIL: name="${name}", email="${email}" -> Expected error "${expectedError}", but got "${result.error}" (handle: "${result.handle}")`);
    }
  } else {
    if (result.handle === expectedHandle) {
      console.log(`PASS: name="${name}", email="${email}" -> Generated correct handle: "@${result.handle}"`);
    } else {
      console.error(`FAIL: name="${name}", email="${email}" -> Expected handle "@${expectedHandle}", but got "@${result.handle}" (error: "${result.error}")`);
    }
  }
}

console.log('=== Starting Username / Handle Generation Unit Tests ===\n');

// Valid handles from name
assert("Rahul Sharma", "rahul@gmail.com", "rahulsharma");
assert("LetMeSolo", "solo@gmail.com", "letmesolo");
assert("R@hul!", "any@gmail.com", "rhul");

// Fallback to email prefix when name is empty/spaces
assert("", "john_dev@gmail.com", "johndev");
assert("   ", "alice.design@gmail.com", "alicedesign");

// Reserved handle failures (names or email prefixes matching route names)
assert("Admin", "admin@gmail.com", null, "This name or email generates a reserved username. Please use a different name or email.");
assert("", "signin@gmail.com", null, "This name or email generates a reserved username. Please use a different name or email.");
assert("MEMORIANT", "any@gmail.com", null, "This name or email generates a reserved username. Please use a different name or email.");
assert("", "user@gmail.com", null, "This name or email generates a reserved username. Please use a different name or email.");

// Length boundary failures (generated handles must be >= 3 characters)
assert("Jo", "jo@gmail.com", null, "Your name or email prefix must contain at least 3 alphanumeric characters to generate a valid username.");
assert("   ", "ab@gmail.com", null, "Your name or email prefix must contain at least 3 alphanumeric characters to generate a valid username.");
assert("!@#", "abc@gmail.com", "abc"); // name cleans to empty, falls back to valid email prefix
assert("!@#", "ab@gmail.com", null, "Your name or email prefix must contain at least 3 alphanumeric characters to generate a valid username."); // name and email both too short

console.log('\n=== Username / Handle Unit Tests Completed ===');
