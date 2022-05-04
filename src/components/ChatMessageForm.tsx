import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { supabase } from '@utils/supabaseClient'
import { Sky } from '@styles/colors'

interface FormProps {
  channelId: string
  receiverId: string
}

export default function ChatMessageForm({ channelId, receiverId }: FormProps) {
  const { data: session } = useSession()
  const user = { id: session?.user.id }
  const [newMessage, setNewMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { error } = await supabase.from('chat_messages').insert({
      content: newMessage,
      channel_id: channelId,
      sender_id: user.id,
      receiver_id: receiverId,
    })

    if (error) {
      alert('Could not send message')
    }

    setNewMessage('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-20 left-4 right-4 flex h-12 flex-row items-center justify-between rounded-3xl bg-sky-500 px-3"
    >
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type something..."
        rows={1}
        className="ml-3 w-full resize-none bg-transparent font-light text-slate-50 placeholder-slate-50 outline-none"
      />

      <button
        type="submit"
        className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-50"
        disabled={newMessage === ''}
      >
        <FontAwesomeIcon icon={faPaperPlane} color={Sky[500]} />
      </button>
    </form>
  )
}
