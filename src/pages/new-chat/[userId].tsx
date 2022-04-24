import type { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { supabase } from '@utils/supabaseClient'

export default function Empty() {
  return null
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = { id: '4b824c28-6ac4-45ff-b175-56624c287706' }
  const { userId: otherUserId } = context.params as Params
  let channelId: string
  const query = `and(user1_id.eq.${user.id},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${user.id})`
  let { data: channel } = await supabase.from('chat_channels').select('id').or(query).single()

  if (channel) {
    channelId = channel.id
  } else {
    const { data: newChannel, error } = await supabase
      .from('chat_channels')
      .insert({ user1_id: user.id, user2_id: otherUserId })
      .single()

    if (error) throw error
    if (!newChannel) {
      throw new Error('Could not create new channel')
    }

    channelId = newChannel.id
  }

  return {
    redirect: {
      destination: `/chatroom/${channelId}`,
      permanent: true,
    },
  }
}
