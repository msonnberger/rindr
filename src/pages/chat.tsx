import { faMagnifyingGlass, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@utils/supabaseClient'
import { Sky, fgStylings } from '@styles/colors'
import ChatPreview from '@components/chatPreview'
import Heading from '@components/heading'
import Layout from '@components/layout'
import SearchField from '@components/searchField'

const Chat: NextPage = ({ channels }) => {
  console.log(channels)
  /* const [users, setUsers] = useState<User[]>([])
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
  }, []) */

  const user = { id: '4b824c28-6ac4-45ff-b175-56624c287706' }

  //const [loading, setLoading] = useState<boolean>(true)
  const [schannels, setChannels] = useState<any[]>([])

  useEffect(() => {
    const channelsSubscription = supabase
      .from('chat_channels')
      .on('INSERT', (payload) => {
        const { user1_id, user2_id } = payload.new

        if (user1_id === user.id || user2_id === user.id) {
          setChannels((oldChannels) => [payload.new, ...oldChannels])
        }
      })
      .subscribe()

    return () => {
      supabase.removeSubscription(channelsSubscription)
    }
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
        <Heading title="Messages" color={fgStylings.Sky} marginTop="mt-10" />
        <div className="mt-11 flex flex-col gap-5">
          {channels.map((channel) => (
            <ChatPreview
              key={channel.id}
              channel={channel}
              otherUser={{ name: 'Oliver', id: '1111' }}
              setChannels={setChannels}
              channels={channels}
            />
          ))}
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const user = { id: '4b824c28-6ac4-45ff-b175-56624c287706' }

  const { data: channels, error } = await supabase
    .from('chat_channels')
    .select(
      `
      id,
      user1:user1_id ( first_name, last_name ),
      user2:user2_id ( first_name, last_name )
    `
    )
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)

  if (error) {
    throw error
  }

  if (!channels) {
    throw new Error()
  }

  return { props: { channels } }
}

export default Chat
