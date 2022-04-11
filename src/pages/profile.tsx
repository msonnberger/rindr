import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-6xl font-bold">Profile</h1>
      </Layout>
    </>
  )
}

export default Profile
