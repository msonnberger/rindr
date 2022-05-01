import { useSession, signIn, signOut } from 'next-auth/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'

const Profile: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex w-full flex-1 flex-col items-center justify-center gap-8 px-20 text-center">
          <div className="">
            {session ? (
              <>
                Signed in as {session.user.firstName} <br />
                <button className="font-bold text-blue-700 underline" onClick={() => signOut()}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button className="font-bold text-blue-700 underline" onClick={() => signIn()}>
                  Sign in
                </button>
              </>
            )}
          </div>
          <h1 className="text-6xl font-bold">Rindr</h1>
        </main>
      </Layout>
    </>
  )
}

export default Profile
