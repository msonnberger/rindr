import { DefaultSession } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'
import { User } from './main'

declare module 'next-auth' {
  export interface Profile {
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

  export interface JWT extends DefaultJWT {
    profileSetupCompleted: boolean
  }

  export interface Session extends DefaultSession {
    user: User
  }
}
