import {
  faCarSide,
  faClose,
  faCommentDots,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { User } from 'src/types/main'
import { Emerald, Orange } from '@styles/colors'
import Image from '@components/Image'

interface SwiperCardProps {
  user: User | undefined
  ride: {
    id: string
    driver_id: string
    passenger_id: string
    start_latitude: number
    start_longitude: number
    start_location: string
    destination_latitude: number
    destination_longitude: number
    destination_location: string
    departure: string
    arrival: string
    duration: number
  }
}

export const SwiperCard = ({ user, ride }: SwiperCardProps) => {
  return (
    <div className="w-96 rounded-3xl bg-slate-100 h-600px flex flex-col shadow-xl">
      <div className="bg-sky-300 rounded-3xl shadow-xl h-520px relative">
        <div className="absolute bg-slate-50 bg-opacity-50 h-20 bottom-0 rounded-3xl mb-2 left-2 right-2 p-3 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <p className="font-bold text-2xl text-slate-800">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="font-light text-slate-800">{user?.department}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-slate-200 rounded-2xl flex items-center justify-between pl-2 pr-2 gap-2">
              <FontAwesomeIcon icon={faThumbsUp} color={Emerald[500]} />
              <p className="font-light">{user?.thumbsUpCount ? user?.thumbsUpCount : '0'}</p>
            </div>
            <div className="bg-slate-200 rounded-2xl flex items-center justify-between pl-2 pr-2 gap-2">
              <FontAwesomeIcon icon={faThumbsDown} color={Orange[500]} />
              <p className="font-light">{user?.thumbsDownCount ? user?.thumbsDownCount : '0'}</p>
            </div>
          </div>
          {user?.pictureUrl && (
            <Image
              src={user.pictureUrl}
              alt={`Profile picture of ${user.firstName} ${user.lastName}`}
              className="rounded-full h-14 w-14 object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-5 mt-2">
        <button className="h-12 w-12 bg-slate-400 rounded-3xl">
          <FontAwesomeIcon icon={faClose} size="lg" color="white" />
        </button>
        <button className="h-16 w-16 bg-sky-400 rounded-4xl">
          <FontAwesomeIcon icon={faCommentDots} size="2x" color="white" />
        </button>
        <button className="h-12 w-12 bg-emerald-400 rounded-3xl">
          <FontAwesomeIcon icon={faCarSide} size="lg" color="white" />
        </button>
      </div>
    </div>
  )
}
