import type { Profile } from 'next-auth'
import NextAuth from 'next-auth/next'
import { supabase } from '@utils/supabaseClient'
import { camelizeKeys } from '@utils/functions'

export default NextAuth({
  theme: {
    colorScheme: 'light',
  },
  pages: {
    newUser: '/auth/newuser',
  },
  providers: [
    {
      id: 'fhs',
      name: 'FH Salzburg',
      type: 'oauth',
      idToken: true,
      wellKnown: 'https://auth.projects.multimediatechnology.at/.well-known/openid-configuration',
      authorization: { params: { scope: 'openid public identity' } },
      clientId: process.env.FHS_ID,
      clientSecret: process.env.FHS_SECRET,
      userinfo: {
        async request(context) {
          const res = await fetch('https://auth.projects.multimediatechnology.at/oauth/userinfo', {
            headers: {
              Authorization: `Bearer ${context.tokens.access_token}`,
            },
          })

          return await res.json()
        },
      },
    },
  ],
  callbacks: {
    async jwt({ token }) {
      const uid = token.sub as string
      const userData = await fetchUserData(uid)
      token.profileSetupCompleted = Boolean(userData)

      return token
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.sub
      session.user.firstName = token.name?.split(' ')[0]
      session.user.lastName = token.name?.split(' ')[1]

      if (token.profileSetupCompleted) {
        const userData = await fetchUserData(token.sub as string)
        session.user = camelizeKeys(userData)
      }

      return session
    },
  },
})

const fetchUserData = async (uid: string) => {
  const { data } = await supabase.from('users').select('*').eq('id', uid).single()

  return data
}
