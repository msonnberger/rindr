import { Fragment } from 'react'
import { printDate } from '@utils/functions'
import { MessagesByDate } from '@utils/types'
import ChatMessage from '@components/ChatMessage'

export default function ChatMessages({ messagesByDate }: { messagesByDate: MessagesByDate }) {
  return (
    <div>
      {Object.keys(messagesByDate).map((date) => (
        <Fragment key={date}>
          <p className="mb-5 mt-7 flex w-full justify-center text-xs text-sky-700 mt-20">
            {printDate(new Date(date))}
          </p>
          <ul className="flex flex-col gap-7">
            {messagesByDate[date].map((message) => (
              <li key={message.id}>
                <ChatMessage
                  text={message.content}
                  timestamp={message.timestamp}
                  received={message.received}
                />
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  )
}