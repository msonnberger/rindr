import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useRef, useState } from 'react'
import { formatTimestamp } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import { MessagesByDate, SupabaseChatMessages, User } from '@utils/types'
import ChatMessageForm from '@components/ChatMessageForm'
import ChatMessages from '@components/ChatMessages'
import ChatRoomHeader from '@components/ChatRoomHeader'
import Layout from '@components/Layout'

const user: User = {
  name: 'Juliane',
  id: '4b824c28-6ac4-45ff-b175-56624c287706',
}

interface ChatRoomProps {
  otherUser: {
    id: string
    firstName: string
    lastName: string
    pictureUrl: string
  }
  initialMessagesByDate: MessagesByDate
}

const ChatRoom: NextPage<ChatRoomProps> = ({ otherUser, initialMessagesByDate }: ChatRoomProps) => {
  const router = useRouter()
  const { id } = router.query
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [messagesByDate, setMessagesByDate] = useState(initialMessagesByDate)

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNewMassage = (payload: any) => {
    const { id, content, created_at: timestamp, sender_id } = payload.new
    const received = sender_id !== user.id
    setMessagesByDate((dateGroups) => {
      const dateString = formatTimestamp(timestamp)

      return {
        ...dateGroups,
        [dateString]: [...(dateGroups[dateString] || []), { id, content, timestamp, received }],
      }
    })
  }

  useEffect(() => {
    const messagesSubscription = supabase
      .from(`chat_messages:channel_id=eq.${id}`)
      .on('INSERT', handleNewMassage)
      .subscribe()

    return () => {
      supabase.removeSubscription(messagesSubscription)
    }
  }, [])

  useEffect(scrollToBottom, [messagesByDate])

  return (
    <>
      <Head>
        <title>Chatroom</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <ChatRoomHeader
          firstName={otherUser.firstName}
          lastName={otherUser.lastName}
          pictureUrl={otherUser.pictureUrl}
        />
        {messagesByDate && <ChatMessages messagesByDate={messagesByDate} />}
        <ChatMessageForm channelId={id as string} receiverId={otherUser.id} />
        <div ref={messagesEndRef} className="mb-32"></div>
      </Layout>
    </>
  )
}

async function fetchChannel(id: string) {
  const { data: channel, error: error } = await supabase
    .from('chat_channels')
    .select(
      `
    user1:users!chat_channels_user1_id_fkey (
      id,
      first_name,
      last_name,
      picture_url
    ),
    user2:users!chat_channels_user2_id_fkey (
      id,
      first_name,
      last_name,
      picture_url
    )
  `
    )
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  if (!channel) {
    throw new Error('Channel could not be found')
  }

  return channel
}

async function fetchMessages(channelId: string) {
  const { data: messages, error } = await supabase
    .from<SupabaseChatMessages>('chat_messages')
    .select('*')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true })

  if (error) {
    throw error
  }

  if (!messages) {
    throw new Error('Messages failed to load')
  }

  return messages
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = { id: '4b824c28-6ac4-45ff-b175-56624c287706' }
  const { id: channelId } = context.params as Params
  const channel = await fetchChannel(channelId)

  let otherUser = {}
  if (channel.user1.id === user.id) {
    otherUser = {
      id: channel.user2.id,
      firstName: channel.user2.first_name,
      lastName: channel.user2.last_name,
      pictureUrl: channel.user2.picture_url,
    }
  } else {
    otherUser = {
      id: channel.user1.id,
      firstName: channel.user1.first_name,
      lastName: channel.user1.last_name,
      pictureUrl: channel.user1.picture_url,
    }
  }

  const rawMessages = await fetchMessages(channelId)

  const messages = rawMessages.map((message) => {
    const received = message.sender_id !== user.id

    return {
      id: message.id,
      content: message.content,
      timestamp: message.created_at,
      received,
    }
  })

  const initialMessagesByDate = messages.reduce((dateGroups, message) => {
    const dateString = formatTimestamp(message.timestamp)

    return {
      ...dateGroups,
      [dateString]: [...(dateGroups[dateString] || []), message],
    }
  }, {} as MessagesByDate)

  return { props: { otherUser, initialMessagesByDate } }
}

export default ChatRoom
