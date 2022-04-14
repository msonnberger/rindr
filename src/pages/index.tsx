import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Heading from  '../components/heading'
import { fgStylings } from 'src/styles/colors'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading title={"Hi <name>!"} color={fgStylings.Sky}/>
      </Layout>
    </>
  )
}

export default Home
