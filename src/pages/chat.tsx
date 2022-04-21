import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'

const Chat: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-6xl font-bold">Chat</h1>
      </Layout>
    </>
  )
}

export default Chat
