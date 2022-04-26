import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import Map from '@components/Map'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Hi <name>!" color={fgStylings.Sky} marginTop="mt-10" />
        <Image alt="logo" src="/logo.svg" height={300} width={300} />
        <Map />
      </Layout>
    </>
  )
}

export default Home
