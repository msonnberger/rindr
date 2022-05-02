import type { NextPage } from 'next'
import Head from 'next/head'
import 'swiper/css'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import { SwiperContainer } from '@components/Swiper'

const FindRide: NextPage = () => {
  return (
    <>
      <Head>
        <title>Find Ride</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Find Ride" color={fgStylings.Sky} marginTop="mt-10" />
        <SwiperContainer />
      </Layout>
    </>
  )
}

export default FindRide
