import { faCarSide, faClose, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { User } from 'src/types/main'
import { formatTime } from '@utils/functions'
import SwiperUserInfo from './SwiperUserInfo'

interface SwiperCardProps {
  user: User
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
  swipe: any
  setOpenedProfile: any
}

export const SwiperCard = ({ user, ride, swipe }: SwiperCardProps) => {
  const handleClickRequest = () => {
    console.log('Clicked on request')
    swipe('right')
    //TODO: API - send RideRequest, use same function as on swiping right or call SwipeRight
  }

  return (
    <>
      <div className="w-96 rounded-3xl bg-slate-100 h-600px flex flex-col shadow-xl relative">
        <div className="bg-sky-300 rounded-3xl shadow-xl h-520px relative">
          <div className="flex flex-row justify-center items-center bg-slate-50 bg-opacity-50 absolute top-0 mt-2 right-2 left-2 rounded-3xl h-10">
            <div className="flex items-center justify-center bg-sky-400 rounded-2xl py-1 pl-3 pr-3 absolute left-1">
              <p className="text-white font-bold">{formatTime(new Date(ride.arrival))}</p>
            </div>
            <div className="w-full flex flex-row ml-24">
              <b>Ankunft: </b>
              <p className="font-light ml-3">{ride?.destination_location}</p>
            </div>
          </div>
          <div className="absolute bottom-0 mb-2 left-2 right-2">
            <SwiperUserInfo
              pictureUrl={user?.pictureUrl}
              department={user?.department}
              firstName={user?.firstName}
              lastName={user?.lastName}
              thumbsUpCount={user?.thumbsUpCount}
              thumbsDownCount={user?.thumbsDownCount}
              withArrow={true}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-5 mt-2">
          <button className="h-12 w-12 bg-slate-400 rounded-3xl" onClick={() => swipe('left')}>
            <FontAwesomeIcon icon={faClose} size="lg" color="white" />
          </button>
          {/*TODO: fetch correct channelId and redirect to chatRoom */}
          <Link href={`/new-chat/${user.id}`} passHref>
            <button className="h-16 w-16 bg-sky-400 rounded-4xl">
              <FontAwesomeIcon icon={faCommentDots} size="2x" color="white" />
            </button>
          </Link>
          <button
            className="h-12 w-12 bg-emerald-400 rounded-3xl"
            onClick={() => handleClickRequest()}
          >
            <FontAwesomeIcon icon={faCarSide} size="lg" color="white" />
          </button>
        </div>
      </div>
    </>
  )
}
