import type { NextPage } from 'next'
import Head from 'next/head'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'

const Rides: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rides</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Rides" color={fgStylings.Orange} marginTop="mt-10" />
      </Layout>
    </>
  )
}

export default Rides
