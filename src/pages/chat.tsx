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
import { User, Channel} from '@utils/types'



const Chat: NextPage = () => {
  const [chatRoom, setChatRoom] = useState<Channel>()
  const [channels, setChannels] = useState<Channel[]>([])
  const [users, setUsers] = useState<User[]>([])
  const channelRef = collection(db, 'channels')
  const usersRef = collection(db, 'users')

  const user : User = {
    name: "Juliane",
    id: "1111"
  }

  const otherUserObject : User = {
    name: "Pascal Gottschling",
    id: "2222"
  }

  const channelQuery = query(channelRef, where("users", "array-contains", user.id));
  const usersQuery = query(usersRef);

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

  function findOtherUser (channel: Channel){
    const otherUserId = channel?.users.find((currentUser: string) => currentUser != user.id)
    console.log(otherUserId, "otherUserId")
    console.log("users", users)
    const found = users.find((currentUser) => currentUser.id == otherUserId)
    console.log(found, "found")
    return found
  }
  

  useEffect(() => {
      onSnapshot(channelQuery, (querySnapshot) => {
        let newChannels : Channel[] = [];
        querySnapshot.forEach((doc) => {
          newChannels.push({id: doc.id, users: doc.data().users})
        })
        setChannels([...newChannels]);
        });        
        console.log(chatRoom)

      onSnapshot(usersQuery, (querySnapshot) => {
        let newUsers : User[] = [];
        querySnapshot.forEach((doc) => {
          newUsers.push({name: doc.data().name, id: doc.data().id})
        })
        setUsers([...newUsers]);
        });        
        console.log(chatRoom)
  }, [])

  return (
    <>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {chatRoom == undefined &&
        <>
        <Heading title={"Messages"} color={fgStylings.Sky}/>
        <div className={"flex flex-col gap-5 mt-11"}>
          {channels.map((channel) => 
            <ChatPreview key={channel.id} channel={channel} otherUser={findOtherUser(channel)} setChatRoom={setChatRoom}/>
          )}
        </div>
        </>
        }
        {chatRoom != undefined &&
          <ChatRoom user={user} otherUser={findOtherUser(chatRoom)} channelId={chatRoom.id} setChatRoom={setChatRoom}/>
        }
      </Layout>
    </>
  )
}

export default Chat
