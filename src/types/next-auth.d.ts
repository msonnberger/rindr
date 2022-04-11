import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Profile {
    sub: string
    created_at: number
    token_id: number
    email: string
    given_name: string
    family_name: string
    preferred_username: string
    status: string
    studies: string
    both_responses: string
    user_info_response: string
  }

  interface Session {
    user: {
      name: string
      color: string
      id: string
    } & DefaultSession['user']
  }
}
