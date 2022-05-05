import { faCarSide, faClose, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FindRideResponse } from 'src/types/main'
import { formatTime } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import Image from './Image'
import SwiperUserInfo from './SwiperUserInfo'

interface SwiperCardProps {
  driver: FindRideResponse['driver']
  ride: FindRideResponse['ride']
  swipe: any
}

export const SwiperCard = ({ driver, ride, swipe }: SwiperCardProps) => {
  const { data: session } = useSession()
  const handleClickRequest = () => {
    swipe('right')
    sendRideRequest()
  }

  async function sendRideRequest() {
    if (!session) {
      alert('Looks like you are not logged in. Please try reloading the page.')
      return
    }

    const { data, error } = await supabase.from('ride_requests').insert({
      ride_id: ride.id,
      passenger_id: session?.user.id,
      status: 'pending',
    })

    if (error || !data) {
      alert('Something went wrong. Please try again later.')
      return
    }
  }

  return (
    <div className="w-96 rounded-3xl bg-slate-100 h-600px flex flex-col shadow-xl relative">
      <div className="bg-sky-300 rounded-3xl shadow-xl h-520px relative">
        <Image
          src={ride.image_url}
          alt="Image of a map showing the route"
          className="absolute rounded-3xl h-full"
        />
        <div className="flex flex-row justify-center items-center bg-slate-50 bg-opacity-50 absolute top-0 mt-2 right-2 left-2 rounded-3xl h-10">
          <div className="flex items-center justify-center bg-sky-400 rounded-2xl py-1 pl-3 pr-3 absolute left-1">
            <p className="text-white font-bold">{formatTime(new Date(ride.arrival))}</p>
          </div>
          <div className="w-full flex flex-row ml-24">
            <b>Ankunft: </b>
            <p className="font-light ml-3">{ride.destination_location}</p>
          </div>
        </div>
        <div className="absolute bottom-0 mb-2 left-2 right-2">
          <SwiperUserInfo
            pictureUrl={driver.picture_url}
            department={driver.department}
            firstName={driver.first_name}
            lastName={driver.last_name}
            thumbsUpCount={driver.thumbs_up_count}
            thumbsDownCount={driver.thumbs_down_count}
            withArrow={true}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-5 mt-2">
        <button className="h-12 w-12 bg-slate-400 rounded-3xl" onClick={() => swipe('left')}>
          <FontAwesomeIcon icon={faClose} size="lg" color="white" />
        </button>
        <Link href={`/new-chat/${driver.id}`} passHref>
          <button className="h-16 w-16 bg-sky-400 rounded-4xl">
            <FontAwesomeIcon icon={faCommentDots} size="2x" color="white" />
          </button>
        </Link>
        <button className="h-12 w-12 bg-emerald-400 rounded-3xl" onClick={handleClickRequest}>
          <FontAwesomeIcon icon={faCarSide} size="lg" color="white" />
        </button>
      </div>
    </div>
  )
}
