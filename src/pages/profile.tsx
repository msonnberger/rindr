import type { NextPage } from 'next'
import Head from 'next/head'
import { fgStylings } from '@styles/colors'
import Heading from '@components/heading'
import Layout from '@components/layout'

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading title="Profile" color={fgStylings.Rose} marginTop="mt-10" />
      </Layout>
    </>
  )
}

export default Profile
