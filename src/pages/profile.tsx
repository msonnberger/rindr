import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Heading from '../components/heading'
import { fgStylings } from 'src/styles/colors'

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading title="Profile" color={fgStylings.Rose} />
      </Layout>
    </>
  )
}

export default Profile
