import type { NextPage } from 'next'
import Head from 'next/head'
import { fgStylings } from '@styles/colors'
import Heading from '@components/heading'
import Layout from '@components/layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading title="Hi <name>!" color={fgStylings.Sky} marginTop="mt-10" />
      </Layout>
    </>
  )
}

export default Home
