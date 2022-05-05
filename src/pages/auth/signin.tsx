import { NextPageContext } from 'next'
import { signIn } from 'next-auth/react'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'

interface SignInProps {
  callbackUrl: string
}

export default function SignIn({ callbackUrl }: SignInProps) {
  return (
    <main className="flex items-center justify-around flex-col min-h-screen">
      <div className="mb-20">
        <Heading title="Welcome to Rindr!" color={fgStylings.Sky} marginTop="mt-10" />
      </div>

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
