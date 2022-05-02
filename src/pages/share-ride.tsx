import type { NextPage } from 'next'
import Head from 'next/head'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'

const ShareRide: NextPage = () => {
  return (
    <>
      <Head>
        <title>Share Ride</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Share Ride" color={fgStylings.Emerald} marginTop="mt-10" />
      </Layout>
    </>
  )
}

export default ShareRide
