import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Heading from  '../components/heading'
import ChatRoom from '../components/chatRoom'
import { db } from '../firebase-config'

const Chat: NextPage = () => {

  const user = {
    name: "Juliane"
  }

  const otherUser = {
    name: "Pascal"
  }

  return (
    <>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Layout>
        <Heading title={"Chat"} />
        <ChatRoom user={user} database={db} otherUser={otherUser}/>
      </Layout> */}
    </>
  )
}

export default Chat
