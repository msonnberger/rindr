import type { NextPage } from 'next'
import Head from 'next/head'
import { fgStylings } from '@styles/colors'
import Heading from '@components/heading2'
import Layout from '@components/layout2'

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Profile" color={fgStylings.Rose} marginTop="mt-10" />
      </Layout>
    </>
  )
}

export default Profile
