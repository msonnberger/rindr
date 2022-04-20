import { DefaultSession } from 'next-auth'
import type { DefaultJWT, JWT as DJWT } from 'next-auth/jwt'

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

  export interface JWT extends DJWT {
    user: {
      name: string
      id: string
      profileSetupCompleted: boolean
    }
  }

  export interface Session extends DefaultSession {
    user: {
      name: string
      id: string
      profileSetupCompleted: boolean
    }
  }
}
