import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Channel, User } from '@utils/types'
import { db } from '@firebase-config'
import { Sky } from '@styles/colors'
import Button from '@components/button'
import ChatRoomContainer from '@components/chatRoomContainer'
import ErrorMessage from '@components/errorMessage'
import Layout from '@components/layout'

const user: User = {
  name: 'Juliane',
  id: '1111',
}

const Chatroom: NextPage = () => {
  const [channels, setChannels] = useState<Channel[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [foundChannel, setFoundChannel] = useState<string>()
  const [otherUser, setOtherUser] = useState<string>()
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
      //create new channel
      const newChannel = {
        users: [user.id, otherUser],
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
    setOtherUser(pid)
    if (otherUser != undefined) {
      setFoundChannel(findChannelId(otherUser))
    }
  }, [channels])

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
        {channels != undefined && foundChannel != undefined ? (
          <ChatRoomContainer
            user={user}
            otherUser={users.find((current) => current.id == pid)}
            channelId={foundChannel}
          />
        ) : (
          <ErrorMessage headline="Error" text="Channel not found" colors="sky">
            <button onClick={() => router.back()}>
              <FontAwesomeIcon icon={faAngleLeft} color={Sky[500]} size="lg" />
            </button>
            <Link href="/" passHref>
              <Button bgColor="bg-sky-500" text="Back to home" textColor="text-white" />
            </Link>
          </ErrorMessage>
        )}
      </Layout>
    </>
  )
}

export default Chatroom
