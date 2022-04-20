import Layout from '@components/layout'
import SetupProfile from '@components/setupProfile'
import { NextPage } from 'next'
import Head from 'next/head'

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
