import { faPencil } from '@fortawesome/free-solid-svg-icons'
//faMagnifyingGlass,
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { ChatPreviewType, SupabaseLatestMessages } from 'src/types/main'
import { supabase } from '@utils/supabaseClient'
import { Sky, fgStylings } from '@styles/colors'
import ChatPreview from '@components/ChatPreview'
import Heading from '@components/Heading'
import Layout from '@components/Layout'

//import SearchField from '@components/SearchField'

// eslint-disable-next-line react/prop-types
const Chat: NextPage<{ initialPreviews: ChatPreviewType[] }> = ({ initialPreviews }) => {
  const { data: session } = useSession()
  const user = { id: session?.user.id }

  const [previews, setPreviews] = useState(initialPreviews)

  useEffect(() => {
    const channelsSubscription = supabase
      .from('chat_messages')
      .on('INSERT', (payload) => {
        const { receiver_id, sender_id } = payload.new
        if (receiver_id === user?.id || sender_id === user?.id) {
          updatePreviews()
        }
      })
      .subscribe()

    async function updatePreviews() {
      if (user) {
        const newPreviews = await fetchPreviews(user.id as string)
        setPreviews(newPreviews)
      }
    }

    return () => {
      supabase.removeSubscription(channelsSubscription)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <div className="flex flex-row items-center w-full justify-between max-w-md">
          {/*<SearchField size="w-10/12">
            <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} color={Sky[400]} />
            <p className="text-left font-light text-sky-800 ml-6">Type something...</p>
  </SearchField>*/}
          <Link href="/new-chat" passHref>
            <button className="h-12 bg-sky-400 w-12 rounded-3xl flex flex-row items-center justify-center">
              <FontAwesomeIcon icon={faPencil} color="white" size="lg" />
            </button>
          </Link>
        </div>
        <Heading title="Messages" color={fgStylings.Sky} marginTop="mt-10" />
        <div className="mt-11 flex flex-col gap-5">
          {previews.map((channel) => (
            <ChatPreview
              key={channel.channelId}
              otherUser={channel.otherUser}
              content={channel.content}
              timestamp={channel.timestamp}
              channelId={channel.channelId}
            />
          ))}
        </div>
      </Layout>
    </>
  )
}

async function fetchPreviews(userId: string): Promise<ChatPreviewType[]> {
  const { data, error } = await supabase
    .from<SupabaseLatestMessages>('latest_messages')
    .select('*')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .eq('row_num', 1)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error()
  }

  const previews = data.map((message) => {
    let otherUser = {} as ChatPreviewType['otherUser']

    if (message.sender_id === userId) {
      otherUser = {
        firstName: message.receiver_first_name,
        lastName: message.receiver_last_name,
        pictureUrl: message.receiver_picture_url,
      }
    } else {
      otherUser = {
        firstName: message.sender_first_name,
        lastName: message.sender_last_name,
        pictureUrl: message.sender_picture_url,
      }
    }

    return {
      channelId: message.id,
      content: message.content,
      timestamp: message.created_at,
      otherUser,
    }
  })

  return previews
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userData = await getSession(context)
  const initialPreviews = await fetchPreviews(userData?.user.id as string)

  return { props: { initialPreviews } }
}

export default Chat
