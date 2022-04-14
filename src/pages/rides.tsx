import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Heading from  '../components/heading'
import { fgStylings } from 'src/styles/colors'



const Rides: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rides</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading title={"Rides"} color={fgStylings.Orange}/>
      </Layout>
    </>
  )
}

export default Rides
