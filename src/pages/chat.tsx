import { collection, onSnapshot, query, where } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Channel, User } from '@utils/types'
import { db } from '@firebase-config'
import { fgStylings } from '@styles/colors'
import ChatPreview from '@components/chatPreview'
import ChatRoom from '@components/chatRoom'
import Heading from '@components/heading'
import Layout from '@components/layout'

const Chat: NextPage = () => {
  const [chatRoom, setChatRoom] = useState<Channel>()
  const [channels, setChannels] = useState<Channel[]>([])
  const [users, setUsers] = useState<User[]>([])
  const channelRef = collection(db, 'channels')
  const usersRef = collection(db, 'users')

  const user: User = {
    name: 'Juliane',
    id: '1111',
  }

  const channelQuery = query(channelRef, where('users', 'array-contains', user.id))
  const usersQuery = query(usersRef)

  function findOtherUser(channel: Channel) {
    const otherUserId = channel?.users.find((currentUser: string) => currentUser != user.id)
    const found = users.find((currentUser) => currentUser.id == otherUserId)
    return found
  }

  useEffect(() => {
    onSnapshot(channelQuery, (querySnapshot) => {
      let newChannels: Channel[] = []
      querySnapshot.forEach((doc) => {
        newChannels.push({ id: doc.id, users: doc.data().users })
      })
      setChannels([...newChannels])
    })

    onSnapshot(usersQuery, (querySnapshot) => {
      let newUsers: User[] = []
      querySnapshot.forEach((doc) => {
        newUsers.push({ name: doc.data().name, id: doc.data().id })
      })
      setUsers([...newUsers])
    })
  }, [])

  return (
    <>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {chatRoom == undefined && (
          <>
            <Heading title="Messages" color={fgStylings.Sky} />
            <div className="mt-11 flex flex-col gap-5">
              {channels.map((channel) => (
                <ChatPreview
                  key={channel.id}
                  channel={channel}
                  otherUser={findOtherUser(channel)}
                  setChatRoom={setChatRoom}
                  setChannels={setChannels}
                  channels={channels}
                />
              ))}
            </div>
          </>
        )}
        {chatRoom != undefined && (
          <ChatRoom user={user} otherUser={findOtherUser(chatRoom)} channelId={chatRoom.id} setChatRoom={setChatRoom} />
        )}
      </Layout>
    </>
  )
}

export default Chat
