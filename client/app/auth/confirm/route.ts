import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/signin'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // Redirect to the specified next page, which defaults to signin
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // Redirect to an error page or back to signin with an error parameter
  const url = request.nextUrl.clone()
  url.pathname = '/signin'
  url.searchParams.set('error', 'Could not verify email')
  return NextResponse.redirect(url)
}
