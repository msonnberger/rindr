import { NextPage } from 'next'
import Head from 'next/head'
import SetupProfile from '@components/SetupProfile2'
import Layout from '@components/layout'

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
