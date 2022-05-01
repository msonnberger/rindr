import NextAuth from 'next-auth/next'
import { supabase } from '@utils/supabaseClient'
import { camelizeKeys } from '@utils/functions'
import { Profile } from 'next-auth'

export default NextAuth({
  theme: {
    colorScheme: 'light',
  },
  pages: {
    signIn: '/auth/signin',
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
      profile(profile: Profile) {
        return {
          id: profile.sub,
        }
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
      session.user.id = token.sub as string
      session.user.firstName = token.name?.split(' ')[0] as string
      session.user.lastName = token.name?.split(' ')[1] as string

      if (token.profileSetupCompleted) {
        const userData = await fetchUserData(token.sub as string)

        if (!userData) {
          throw new Error('Could not fetch user data.')
        }

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
