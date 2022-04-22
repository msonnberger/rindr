import { faAngleLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Timestamp, addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { printDate } from '@utils/functions'
import { Message, User } from '@utils/types'
import { db } from '@firebase-config'
import { Sky } from '@styles/colors'
import ChatMessage from '@components/chatMessage'

interface ChatRoomContainerProps {
  user: User
  otherUser: User | undefined
  channelId: string
}

interface DateMessages {
  day: string
  dateMessages: Message[]
}

export default function ChatRoomContainer({ user, otherUser, channelId }: ChatRoomContainerProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const messagesRef = collection(db, 'messages')
  const router = useRouter()

  const [newMessageValue, setNewMessageValue] = useState<string>()
  const [messages, setMessages] = useState<DateMessages[]>([])

  async function handleSubmit(e: any) {
    e.preventDefault()

    const newMessageObject = {
      text: newMessageValue,
      createdAt: Timestamp.fromDate(new Date()),
      from: user.id,
      to: otherUser?.id,
      channelId: channelId,
    }

    setNewMessageValue('')
    await addDoc(messagesRef, newMessageObject)
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current!.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sortMessages = (allMessages: Message[]) => {
    let collectionByDate: DateMessages[] = []
    allMessages.forEach((message) => {
      let date = new Date(message.createdAt.seconds * 1000)
      let dayOfMonth = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let fullDate = `${month}/${dayOfMonth}/${year}`
      let dayIndex = collectionByDate.find((element: DateMessages) => element.day == fullDate)
      if (dayIndex != undefined) {
        dayIndex.dateMessages.push(message)
      } else {
        collectionByDate.push({
          day: fullDate,
          dateMessages: [message],
        })
      }
    })

    collectionByDate.forEach((dayMessages) => {
      dayMessages.dateMessages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
    })
    return collectionByDate.sort((a, b) => (a.day > b.day ? 1 : -1))
  }

  const receivedMessages = query(messagesRef, where('channelId', '==', channelId)) //two were aren't possible?

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
          channelId: channelId,
        })
      })

      let sortByDate = sortMessages(newMessages)
      setMessages([...sortByDate])
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <section id="chat_room" className="flex flex-col">
      <div className="fixed top-0 left-0 flex h-20 w-full flex-row items-center rounded-bl-3xl rounded-br-3xl bg-sky-100 px-3">
        <button onClick={() => router.back()}>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" color={Sky[400]} />
        </button>
        <div className="mr-5 ml-3 h-12 w-12 rounded-3xl bg-emerald-300"></div>
        <p className="font-bold">{otherUser?.name}</p>
      </div>
      <div className="mt-12">
        {messages.map((dateMessage: DateMessages, keyOuter) => {
          return (
            <>
              <p key={keyOuter} className="mb-5 mt-7 flex w-full justify-center text-xs text-sky-700">
                {printDate(new Date(dateMessage.day))}
              </p>
              <ul className="flex flex-col gap-7">
                {dateMessage.dateMessages.map((message: Message, key) => (
                  <li key={key}>
                    <ChatMessage createdAt={message.createdAt} text={message.text} received={message.to == user.id} />
                  </li>
                ))}
              </ul>
            </>
          )
        })}
      </div>
      <div ref={messagesEndRef} className="mb-32"></div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-20 left-4 right-4 flex h-12 flex-row items-center justify-between rounded-3xl bg-sky-500 px-3"
      >
        <textarea
          value={newMessageValue || ''}
          onChange={(e) => setNewMessageValue(e.target.value)}
          placeholder="Type something..."
          rows={1}
          className="ml-3 w-full resize-none bg-transparent font-light text-slate-50 placeholder-slate-50 outline-none"
        />

        <button
          type="submit"
          className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-50"
          disabled={newMessageValue == undefined || newMessageValue == ''}
        >
          <FontAwesomeIcon icon={faPaperPlane} color={Sky[500]} />
        </button>
      </form>
    </section>
  )
}
