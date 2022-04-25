import type { Profile } from 'next-auth'
import NextAuth from 'next-auth/next'

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
      profile(profile: Profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          studies: profile.studies,
        }
      },
    },
  ],
  /* callbacks: {
    async jwt({ token }) {
      const uid = token.sub
      const userData = await fetchUserData(uid)
      token.user = userData

      return token
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user = token.user
      return session
    },
  }, */
})

/* const fetchUserData = async (uid?: string) => {
  if (!uid) return undefined

  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)

  return userSnap.data()
} */
