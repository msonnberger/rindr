import type { NextPage } from 'next'
import Head from 'next/head'
import { fgStylings } from '@styles/colors'
import Heading from '@components/heading'
import Layout from '@components/layout'

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
