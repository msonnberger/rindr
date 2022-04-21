import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Channel, User } from '@utils/types'
import { db } from '@firebase-config'
import ChatRoomContainer from '@components/chatRoomContainer'
import Layout from '@components/layout'

const user: User = {
  name: 'Juliane',
  id: '1111',
}

const Chatroom: NextPage = () => {
  const [channels, setChannels] = useState<Channel[]>([])
  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()
  const { pid } = router.query
  const channelRef = collection(db, 'channels')
  const usersRef = collection(db, 'users')

  const channelQuery = query(channelRef, where('users', 'array-contains', user.id))
  const usersQuery = query(usersRef)

  function findChannelId(otherUser: string) {
    let found = channels.find((channel) => {
      return channel.users.find((current) => current == otherUser)
    })

    if (found == undefined) {
      console.log('ddd')
      //create new channel
      const newChannel = {
        users: [otherUser, user.id],
      }
      addDoc(channelRef, newChannel)
      return channels.find((channel) => {
        return channel.users.find((current) => current == otherUser)
      })?.id
    } else {
      return found.id
    }
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
        <title>Chatroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <p>{pid}</p>
        {pid != undefined && (
          <ChatRoomContainer
            user={user}
            otherUser={users.find((current) => current.id == pid)}
            channelId={findChannelId(pid)}
          />
        )}
      </Layout>
    </>
  )
}

export default Chatroom
