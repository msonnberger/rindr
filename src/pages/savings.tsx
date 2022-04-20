import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Heading from '../components/heading'
import { fgStylings } from 'src/styles/colors'

const Savings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Savings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading title="Savings" color={fgStylings.Emerald} />
      </Layout>
    </>
  )
}

export default Savings
