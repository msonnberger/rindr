import type { JWT } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabase } from '@utils/supabaseClient'

type NextAuthRequest = NextRequest & {
  nextauth: {
    token: JWT
  }
}

// @ts-ignore
export default withAuth(middleware, {
  pages: {
    signIn: '/auth/signin',
  },
})

async function middleware(request: NextAuthRequest) {
  const url = request.nextUrl.clone()

  if (url.pathname === '/auth/newuser') {
    return NextResponse.next()
  }

  const { sub, profileSetupCompleted } = request.nextauth.token

  if (!profileSetupCompleted) {
    const userData = await fetchUserData(sub as string)

    if (!userData) {
      url.pathname = '/auth/newuser'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

const fetchUserData = async (uid: string) => {
  const { data } = await supabase.from('users').select('*').eq('id', uid).single()

  return data
}
