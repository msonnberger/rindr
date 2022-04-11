import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'

const Rides: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rides</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-6xl font-bold">Rides</h1>
      </Layout>
    </>
  )
}

export default Rides
