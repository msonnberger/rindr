import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Heading from  '../components/heading'
import { db } from '../firebase-config'
import { fgStylings } from 'src/styles/colors'
import ChatRoom from '@components/chatRoom'
import { useEffect, useState } from 'react'
import ChatPreview from '@components/chatPreview'
import { collection, where, getDocs, query, onSnapshot } from 'firebase/firestore'
import { User } from '@utils/types'

interface Channel {
  id: string
  users: string[]
}

const Chat: NextPage = () => {
  const [chatRoom, setChatRoom] = useState<string>("")
  const [channels, setChannels] = useState<Channel[]>([])
  const channelRef = collection(db, 'channels')

  const handleSelect = () => {
    setChatRoom('1111')
  }


  const user : User = {
    name: "Juliane",
    id: "1111"
  }

  const otherUserObject : User = {
    name: "Pascal Gottschling",
    id: "2222"
  }

  const channelQuery = query(channelRef, where("users", "array-contains", user.id));

  function findBelongingChannel (otherUser: User){
    let foundChannel = ""
    
    channels.forEach((channel) => {
      if(channel.users.find((currentUser) => currentUser == otherUser.id) != undefined){
        foundChannel = channel.id
        return
      }
    })

    return foundChannel
  }

  useEffect(() => {
      onSnapshot(channelQuery, (querySnapshot) => {
        let newChannels : Channel[] = [];
        querySnapshot.forEach((doc) => {
          newChannels.push({id: doc.id, users: doc.data().users})
        })
        setChannels([...newChannels]);
        });        
  }, [])

  return (
    <>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* <Heading title={"Messages"} color={fgStylings.Sky}/> */}
        {/* <div className={"flex flex-col gap-5 mt-11"}>
          <ChatPreview otherUser={otherUserObject} />
          <ChatPreview otherUser={otherUserObject} />
          <ChatPreview otherUser={otherUserObject} />
        </div> */}
        <ChatRoom user={user} otherUser={otherUserObject} channelId={findBelongingChannel(otherUserObject)}/>
      </Layout>
    </>
  )
}

export default Chat
