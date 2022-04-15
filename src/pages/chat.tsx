import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Heading from  '../components/heading'
import { db } from '../firebase-config'
import { fgStylings } from 'src/styles/colors'
import ChatRoom from '@components/chatRoom'
import { useState } from 'react'
import ChatPreview from '@components/chatPreview'

const Chat: NextPage = () => {
  const [chatRoom, setChatRoom] = useState<string>("")

  const handleSelect = () => {
    setChatRoom('1111')
    console.log("Hallo")
  }


  const user = {
    name: "Juliane",
    id: "1111"
  }

  const otherUser = {
    name: "Pascal Gottschling",
    id: "2222"
  }

  return (
    <>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading title={"Messages"} color={fgStylings.Sky}/>
        {/* <div className={"flex flex-col gap-5 mt-11"}>
          <ChatPreview otherUser={otherUser} />
          <ChatPreview otherUser={otherUser} />
          <ChatPreview otherUser={otherUser} />
        </div> */}
        <ChatRoom user={user} otherUser={otherUser}/>
      </Layout>
    </>
  )
}

export default Chat
