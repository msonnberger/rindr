import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '@components/Layout'
import SetupProfile from '@components/SetupProfile'

const NewUser: NextPage = () => {
  return (
    <>
      <Head>
        <title>Complete your Profile</title>
      </Head>
      <Layout>
        <SetupProfile />
      </Layout>
    </>
  )
}

export default NewUser
