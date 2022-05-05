import { NextPageContext } from 'next'
import { signIn } from 'next-auth/react'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Logo from '@components/Logo'

interface SignInProps {
  callbackUrl: string
}

export default function SignIn({ callbackUrl }: SignInProps) {
  return (
    <main className="flex items-center justify-evenly flex-col min-h-screen">
      <Logo />
      <div className="mb-20 max-w-xl">
        <Heading title="Welcome to Rindr!" color={fgStylings.Sky} marginTop="mt-10" />
        <p className="mt-6 text-xl leading-8 text-sky-900">
          Rindr is a ride sharing platform for students at FH Salzburg. We want to make sure that
          everyone feels safe when using Rindr, so please sign in with your FH Account to verify
          your identity.
        </p>
      </div>

      <button
        onClick={() => signIn('fhs', { callbackUrl: callbackUrl })}
        className="cursor-pointer rounded-full bg-sky-500 py-3 px-5 font-semibold text-rose-50"
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
