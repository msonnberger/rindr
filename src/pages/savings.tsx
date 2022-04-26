import type { NextPage } from 'next'
import Head from 'next/head'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'

const Savings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Savings</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Savings" color={fgStylings.Emerald} marginTop="mt-10" />
      </Layout>
    </>
  )
}

export default Savings
