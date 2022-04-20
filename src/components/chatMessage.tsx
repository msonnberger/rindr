import { Timestamp } from 'firebase/firestore'
import { formatMinutes, formatTime } from '../utils/functions'

interface ChatMessageProps {
  text: string
  createdAt: Timestamp
  received: boolean
}
export default function ChatMessage({ text, createdAt, received }: ChatMessageProps) {
  return (
    <div
      className={
        received ? 'mr-4 flex flex-row items-center justify-start' : 'ml-4 flex flex-row items-center justify-end'
      }
    >
      {!received && <p className="mr-3 text-xs font-light">{formatTime(new Date(createdAt.seconds * 1000))}</p>}
      <div
        className={
          received
            ? 'w-full max-w-md rounded-t-3xl rounded-br-3xl bg-sky-50 p-5'
            : 'w-full max-w-md rounded-t-3xl rounded-bl-3xl bg-sky-300 p-5'
        }
      >
        <p className="font-light">{text}</p>
      </div>
      {received && <p className="ml-3 text-xs font-light">{formatTime(new Date(createdAt.seconds * 1000))}</p>}
    </div>
  )
}
