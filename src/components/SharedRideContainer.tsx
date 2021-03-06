import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SupabaseRide } from 'src/types/main'
import { formatDate, formatTime } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import Image from '@components/Image'

interface SharedRideContainerProps {
  ride: SupabaseRide
  updatePreviews: any
}

export default function SharedRideContainer({ ride, updatePreviews }: SharedRideContainerProps) {
  async function deleteSharedRide() {
    const { data, error } = await supabase
      .from('rides')
      .delete()
      .match({ id: `${ride.id}` })

    if (data) {
      const { data: deleteRideRequests, error: errorDeleteRideRequests } = await supabase
        .from('ride_requests')
        .delete()
        .match({ ride_id: ride.id })

      if (errorDeleteRideRequests || !deleteRideRequests) {
        alert('Entry in Ride-Requests could not be deleted. Please try again later.')
        return
      }
    }

    if (error || !data) {
      alert('Entry in Rides could not be deleted. Try again later.')
      return
    }

    updatePreviews()
  }
  return (
    <div className="bg-emerald-100 p-3 xs:p-5 rounded-3xl flex relative flex-row items-center">
      <Image
        src="/car-orange.svg"
        alt="Cow-Image"
        width={40}
        className="absolute hidden xs:block"
      />
      <div className="w-full flex flex-row xs:ml-14 justify-between items-center gap-x-5">
        <div className="flex flex-col w-3/5">
          <p>
            From: <b>{ride.start_location}</b>
          </p>
          <p>
            To: <b>{ride.destination_location}</b>
          </p>
        </div>
        <div className="flex flex-col w-1/5">
          <p>
            Date: <b>{formatDate(new Date(ride.departure))}</b>
          </p>
          <p>
            Time: <b>{formatTime(new Date(ride.departure))}</b>
          </p>
        </div>
        <button
          className="bg-slate-400 h-10 w-10 bg-opacity-50 rounded-3xl items-center justify-center flex min-w-10/4r ml-1"
          onClick={() => deleteSharedRide()}
        >
          <FontAwesomeIcon icon={faClose} size="lg" color="white" />
        </button>
      </div>
    </div>
  )
}
