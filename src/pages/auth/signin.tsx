import { NextPageContext } from 'next'
import { signIn } from 'next-auth/react'

interface SignInProps {
  callbackUrl: string
}

export default function SignIn({ callbackUrl }: SignInProps) {
  return (
    <main className="grid place-items-center min-h-screen">
      <button
        onClick={() => signIn('fhs', { callbackUrl: callbackUrl })}
        className="cursor-pointer rounded-full bg-rose-500 py-3 px-5 font-semibold text-rose-50"
      >
        Sign in with FH Salzburg
      </button>
    </main>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { callbackUrl } = context.query
  return {
    props: { callbackUrl },
  }
}
