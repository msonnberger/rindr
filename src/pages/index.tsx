import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Image from '@components/Image'
import Layout from '@components/Layout'

const Profile: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Image alt="logo" src="/logo.svg" height={100} width={100} />

        <main className="flex w-full flex-1 flex-col items-center justify-center gap-8 px-20 text-center">
          <Link href="/find-ride">Find Ride</Link>
          <Link href="/share-ride">Share Ride</Link>
          <div className="">
            {session ? (
              <>
                <Heading
                  title={`Hi, ${session.user.firstName}!`}
                  color={fgStylings.Sky}
                  marginTop="mt-10"
                />
                <div className="flex items-center gap-5 mt-8">
                  <Image
                    src={session.user.pictureUrl}
                    width={50}
                    height={50}
                    alt="Your profile picture"
                  />

                  <button className="font-bold text-blue-700 underline" onClick={() => signOut()}>
                    Sign out
                  </button>
                </div>
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
