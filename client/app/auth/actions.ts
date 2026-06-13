'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  if (!email || !password || !name) {
    return { error: 'Name, email, and password are required' }
  }

  // Compute expected handle exactly like the DB trigger does
  const nameCleaned = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  const baseHandle = nameCleaned || emailPrefix || 'user';

  // Handle Validation Regex (Must be at least 3 characters long, alphanumeric)
  if (baseHandle.length < 3) {
    return { error: 'Your name or email prefix must contain at least 3 alphanumeric characters to generate a valid username.' }
  }

  // Reserved Handles Check
  const RESERVED_HANDLES = [
    'signin', 'signup', 'dashboard', 'auth', 'verify-email', 'api', 
    '_next', 'static', 'favicon', 'favicon.ico', 'logo', 'logo.png', 
    'robots.txt', 'sitemap.xml', 'public', 'index', 'home', 'admin', 
    'user', 'memoriant'
  ];

  if (RESERVED_HANDLES.includes(baseHandle)) {
    return { error: 'This name or email generates a reserved username. Please use a different name or email.' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data?.user?.identities && data.user.identities.length === 0) {
    return { error: 'An account with this email already exists. Please sign in instead.' }
  }

  redirect('/verify-email')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/signin')
}
