import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { JWT } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

type NextAuthRequest = NextRequest & {
  nextauth: {
    token: JWT
  }
}

// @ts-ignore
export default withAuth((request: NextAuthRequest) => {
  const url = request.nextUrl.clone()

  if (url.pathname === '/auth/newuser') {
    return NextResponse.next()
  }

  const { profileSetupCompleted } = request.nextauth.token

  if (!profileSetupCompleted) {
    url.pathname = '/auth/newuser'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
})
