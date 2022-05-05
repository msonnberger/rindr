import type { JWT } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

    if (!userData?.id) {
      url.pathname = '/auth/newuser'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

const fetchUserData = async (uid: string) => {
  const url = 'https://epipzztphtjupkzwxmsj.supabase.co/rest/v1/users?'
  const params = new URLSearchParams([
    ['id', `eq.${uid}`],
    ['select', '*'],
  ])
  const headers = new Headers()
  headers.set('apikey', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)
  headers.set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)
  headers.set('Accept', 'application/vnd.pgrst.object+json')

  const res = await fetch(url + params.toString(), {
    headers,
  })

  const data = await res.json()

  return data
}
