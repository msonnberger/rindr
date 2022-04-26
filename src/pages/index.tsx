import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { fgStylings } from '@styles/colors'
import Heading from '@components/heading2'
import Layout from '@components/layout2'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Hi <name>!" color={fgStylings.Sky} marginTop="mt-10" />
        <Image alt="logo-rindr" src="/logo-rindr.svg" height={300} width={300} />
      </Layout>
    </>
  )
}

export default Home
