import { NextPageContext } from 'next'
import { signIn } from 'next-auth/react'

interface SignInProp {
  callbackUrl: string
}

export default function SignIn({ callbackUrl }: SignInProp) {
  return (
    <button onClick={() => signIn('fhs', { callbackUrl: callbackUrl })}>
      Sign in with FH Salzburg
    </button>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { callbackUrl } = context.query
  return {
    props: { callbackUrl },
  }
}
