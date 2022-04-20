import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { formatDate, formatMinutes, formatTime } from '@utils/functions'
import { Channel, Message, User } from '@utils/types'
import { db } from '@firebase-config'

interface ChatPreviewProps {
  channel: Channel
  setChatRoom: any
  otherUser: User | undefined
  setChannels: any
  channels: Channel[]
}

export default function ChatPreview({ channel, setChatRoom, otherUser, setChannels, channels }: ChatPreviewProps) {
  const messagesRef = collection(db, 'messages')
  const [lastMessage, setLastMessage] = useState<Message>()
  const handleClick = () => {
    setChatRoom(channel)
  }

  const printDatePreview = (date: Date) => {
    let todayDate = new Date()
    let todayFormatted = formatDate(todayDate)
    let dateFormatted = formatDate(date)
    if (dateFormatted === todayFormatted) {
      return formatMinutes(formatTime(date))
    } else if (dateFormatted === formatDate(new Date(Date.now() - 86400000))) {
      return 'yesterday'
    } else {
      return dateFormatted
    }
  }

  const receivedMessages = query(
    messagesRef,
    where('channelId', '==', channel.id),
    orderBy('createdAt', 'desc'),
    limit(1)
  ) //two were aren't possible?

  //receivedMessages
  useEffect(() => {
    onSnapshot(receivedMessages, (querySnapshot) => {
      let newMessages: Message[] = []
      querySnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          from: doc.data().from,
          to: doc.data().to,
          channelId: channel.id,
        })
      })
      setLastMessage(newMessages[0])
      let activeChannels = channels
      let currentChannel: Channel = activeChannels.find((element) => element.id == channel.id)
      currentChannel.lastMessage = newMessages[0]
      if (activeChannels != undefined) {
        activeChannels.sort((a, b) => (a?.lastMessage.createdAt < b?.lastMessage.createdAt ? 1 : -1))
      }
      setChannels([...activeChannels])
    })
  }, [])
  return (
    <button className="flex w-full max-w-md flex-row rounded-3xl bg-sky-50 p-4 font-bold" onClick={handleClick}>
      <div className="mr-5 h-12 w-12 rounded-3xl bg-emerald-300"></div>
      <div className="mx-0 w-8/12">
        <p className="text-left font-bold">{otherUser?.name}</p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left font-light">{lastMessage?.text}</p>
      </div>
      <div className="mr-0 ml-auto flex flex-col items-end justify-between">
        {lastMessage && (
          <p className="text-sm font-light">{printDatePreview(new Date(lastMessage.createdAt.seconds * 1000))}</p>
        )}
        {lastMessage?.from == otherUser?.id && (
          <div className="ml-5 flex h-5 w-5 items-center justify-center rounded-xl bg-sky-400">
            <p className="font-white text-xs text-slate-50">?</p>
          </div>
        )}
      </div>
    </button>
  )
}
