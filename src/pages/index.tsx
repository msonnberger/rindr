import { useSession, signIn, signOut } from 'next-auth/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Image from '@components/Image'

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
              <div className="flex items-center gap-5">
                <Image
                  src={session.user.pictureUrl}
                  width={50}
                  height={50}
                  alt="Your profile picture"
                />
                <p>Signed in as {session.user.firstName}</p>

                <button className="font-bold text-blue-700 underline" onClick={() => signOut()}>
                  Sign out
                </button>
              </div>
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
