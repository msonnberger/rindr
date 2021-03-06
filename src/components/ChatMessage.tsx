import { formatTime } from '@utils/functions'

interface ChatMessageProps {
  text: string
  timestamp: string
  received: boolean
}
export default function ChatMessage({ text, timestamp, received }: ChatMessageProps) {
  return (
    <div
      className={`flex flex-row items-center ${
        received ? 'justify-start mr-4' : 'justify-end ml-4'
      }`}
    >
      {!received && <p className="mr-3 text-xs font-light">{formatTime(new Date(timestamp))}</p>}
      <div
        className={`w-full max-w-md rounded-t-3xl p-5 ${
          received ? 'rounded-br-3xl bg-sky-50' : 'rounded-bl-3xl bg-sky-300'
        }`}
      >
        <p className="font-light">{text}</p>
      </div>
      {received && <p className="ml-3 text-xs font-light">{formatTime(new Date(timestamp))}</p>}
    </div>
  )
}
