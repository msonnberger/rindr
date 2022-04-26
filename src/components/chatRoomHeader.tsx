import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { Sky } from '@styles/colors'

interface HeaderProps {
  firstName: string
  lastName: string
  pictureUrl: string | null
}

export default function ChatRoomHeader({ firstName, lastName, pictureUrl }: HeaderProps) {
  return (
    <div className="sticky top-0 left-0 mb-10 flex h-20 w-full flex-row items-center rounded-bl-3xl rounded-br-3xl bg-sky-100 px-3">
      <Link href="/chat" passHref>
        <FontAwesomeIcon icon={faAngleLeft} size="lg" color={Sky[400]} className="cursor-pointer" />
      </Link>
      <div className="mr-5 ml-5 h-12 w-12 rounded-full bg-emerald-300 relative">
        {pictureUrl && (
          <Image
            src={pictureUrl}
            alt={`Profile picture of ${firstName} ${lastName}`}
            objectFit="cover"
            layout="fill"
            className="rounded-full h-12 w-12"
          />
        )}
      </div>
      <p className="font-bold">
        {firstName} {lastName}
      </p>
    </div>
  )
}
