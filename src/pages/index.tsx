import { faRoute, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
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
          {session && (
            <div className="mb-20">
              <Heading
                title={`Hi, ${session.user.firstName}!`}
                color={fgStylings.Sky}
                marginTop="mt-10"
              />
            </div>
          )}
          <Link href="/share-ride" passHref>
            <div className="flex flex-row h-20 bg-emerald-200 items-center rounded-4xl cursor-pointer w-52">
              <div className="h-16 w-16 rounded-4xl bg-emerald-400 flex justify-center items-center ml-2">
                <FontAwesomeIcon icon={faUserGroup} color="white" size="2x" />
              </div>
              <p className="text-white font-bold ml-5 text-lg">Share Ride</p>
            </div>
          </Link>
          <Link href="/find-ride" passHref>
            <div className="flex flex-row h-20 bg-sky-200 items-center rounded-4xl cursor-pointer w-52">
              <div className="h-16 w-16 rounded-4xl bg-sky-400 flex justify-center items-center ml-2">
                <FontAwesomeIcon icon={faRoute} color="white" size="2x" />
              </div>
              <p className="text-white font-bold ml-5 text-lg">Find Ride</p>
            </div>
          </Link>
        </main>
      </Layout>
    </>
  )
}

export default Profile
