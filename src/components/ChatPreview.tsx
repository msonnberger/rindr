import Link from 'next/link'
import { ChatPreviewType } from 'src/types/main'
import { printDatePreview } from '@utils/functions'
import Image from '@components/Image'

export default function ChatPreview({ content, otherUser, timestamp, channelId }: ChatPreviewType) {
  return (
    <Link href={`/chatroom/${channelId}`} passHref>
      <button className="flex w-full max-w-md flex-row rounded-3xl bg-sky-50 p-4 font-bold">
        <div className="mr-5 h-12 w-12 rounded-full bg-emerald-300 relative">
          {otherUser.pictureUrl && (
            <Image
              src={otherUser.pictureUrl}
              alt={`Profile picture of ${otherUser.firstName} ${otherUser.lastName}`}
              className="rounded-full h-12 w-12 object-cover"
            />
          )}
        </div>
        <div className="mx-0 w-8/12">
          <p className="text-left font-bold">
            {otherUser.firstName} {otherUser.lastName}
          </p>
          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left font-light">
            {content}
          </p>
        </div>
        <div className="mr-0 ml-auto flex flex-col items-end justify-between">
          <p className="text-sm font-light">{printDatePreview(new Date(timestamp))}</p>
        </div>
      </button>
    </Link>
  )
}
