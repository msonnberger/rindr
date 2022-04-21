import { faMagnifyingGlass, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Channel, User } from '@utils/types'
import { db } from '@firebase-config'
import { Sky, fgStylings } from '@styles/colors'
import ChatPreview from '@components/chatPreview'
import Heading from '@components/heading'
import Layout from '@components/layout'
import SearchField from '@components/searchField'

const Chat: NextPage = () => {
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
        <div className="flex flex-row items-center w-full justify-between max-w-md">
          <SearchField size="w-10/12">
            <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} color={Sky[400]} />
            <p className="text-left font-light text-sky-800 ml-6">Type something...</p>
          </SearchField>
          <Link href="/new-chat" passHref>
            <button className="h-12 bg-sky-400 w-12 rounded-3xl flex flex-row items-center justify-center">
              <FontAwesomeIcon icon={faPencil} color="white" size="lg" />
            </button>
          </Link>
        </div>
        <Heading title="Messages" color={fgStylings.Sky} />
        <div className="mt-11 flex flex-col gap-5">
          {channels.map((channel) => (
            <Link key={channel.id} href={`/chatroom/${findOtherUser(channel)?.id}`} passHref>
              <ChatPreview
                key={channel.id}
                channel={channel}
                otherUser={findOtherUser(channel)}
                setChannels={setChannels}
                channels={channels}
              />
            </Link>
          ))}
        </div>
      </Layout>
    </>
  )
}

export default Chat
