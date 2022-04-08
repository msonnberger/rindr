import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rindr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-6xl font-bold">Rindr</h1>
      </Layout>
    </>
  )
}

export default Home
