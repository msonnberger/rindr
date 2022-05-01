import Layout from '@components/layout'
import { NextPageContext } from 'next'
import { getCsrfToken } from 'next-auth/react'

interface SignInProps {
  csrfToken: string
  callbackUrl: string
}

export default function SignIn({ csrfToken, callbackUrl }: SignInProps) {
  return (
    <Layout>
      <form action="/api/auth/signin/fhs" method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <input
          type="submit"
          className="cursor-pointer rounded-full bg-rose-500 py-3 px-5 font-semibold text-rose-50"
          value="Sign in with FH Salzburg"
        />
      </form>
    </Layout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const csrfToken = await getCsrfToken(context)
  const { callbackUrl } = context.query
  return {
    props: { csrfToken, callbackUrl },
  }
}
