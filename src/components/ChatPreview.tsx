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

          {
            // hidden until we find a better use case
          }
          <div className="hidden ml-5 h-5 w-5 items-center justify-center rounded-xl bg-sky-400">
            <p className="font-white text-xs text-slate-50">?</p>
          </div>
        </div>
      </button>
    </Link>
  )
}
