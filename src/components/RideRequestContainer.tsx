import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { RequestsJoinRides } from 'src/types/main'
import { formatTime } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import Image from '@components/Image'
import ConfirmationButton from './ConfirmationButton'

interface RideRequestProps {
  rideRequest: RequestsJoinRides
  updatePreviews: any
}

export default function RideRequestContainer({ rideRequest, updatePreviews }: RideRequestProps) {
  const { data: session } = useSession()
  const bgColor =
    rideRequest.status === 'accepted'
      ? 'bg-emerald-100'
      : rideRequest.status === 'pending'
      ? 'bg-orange-100'
      : 'bg-orange-200'

  const handleClick = (status: 'accepted' | 'declined' | 'pending') => {
    answerRideRequest(status)

    if (status === 'accepted') {
      updateSavingsCO2ForPassenger(rideRequest.ride_id, rideRequest.accepted_passenger_id)
    }
  }

  async function answerRideRequest(status: 'accepted' | 'declined' | 'pending') {
    if (!session) {
      alert('Looks like you are not logged in. Please try reloading the page.')
      return
    }

    if (status === 'accepted' && rideRequest.accepted_passenger_id != null) {
      //only one passenger allowed, set the other one to decline
      const { data, error } = await supabase
        .from('ride_requests')
        .update({ status: 'declined' })
        .eq('passenger_id', rideRequest.accepted_passenger_id)
        .eq('ride_id', rideRequest.ride_id)

      if (error || !data) {
        alert('Delete other passenger from ride failed.')
        return
      }
    }

    const { data, error } = await supabase
      .from('ride_requests')
      .update({ status: status })
      .eq('id', rideRequest.id)

    const { data: dataRides, error: ErrorRides } = await supabase
      .from('rides')
      .update({ passenger_id: rideRequest.passenger_id })
      .eq('id', rideRequest.ride_id)

    updatePreviews()

    if (error || !data) {
      alert('Updating status failed')
      return
    }
    if (ErrorRides || !dataRides) {
      alert('Updating rides.passenger_id failed')
      return
    }
  }

  const updateSavingsCO2ForPassenger = async (rideId: string, passengerId: string) => {
    const { data: dataRides } = await supabase
      .from('rides')
      .select('duration')
      .match({ id: rideId })
      .limit(1)
      .single()

    const { data: dataPassenger } = await supabase
      .from('users')
      .select('savings_co2')
      .match({ id: passengerId })
      .limit(1)
      .single()

    if (!dataPassenger || !dataRides) return

    const calc = ~~(dataPassenger.savings_co2 + dataRides.duration / 200)
    await supabase.from('users').update({ savings_co2: calc }).match({ id: passengerId })
  }

  return (
    <div className={`${bgColor} p-5 rounded-3xl flex relative flex-row items-center`}>
      <Image src="/cow.svg" alt="Cow-Image" width={40} className="rotate-12 absolute left-0" />
      <div className="w-full flex flex-col items-center ml-8">
        <p>
          <b>{rideRequest.first_name}</b> requests to join your ride to{' '}
          {rideRequest.destination_location} at <b>{formatTime(new Date(rideRequest.departure))}</b>
        </p>
        {rideRequest.status == 'pending' && (
          <div className="flex flex-row mt-4 justify-center gap-3">
            <ConfirmationButton
              text="Accept"
              bgColor="bg-emerald-500"
              textColor="text-white"
              onClick={() => handleClick('accepted')}
            />
            <ConfirmationButton
              text="Decline"
              bgColor="bg-orange-600"
              textColor="text-white"
              onClick={() => handleClick('declined')}
            />
          </div>
        )}
        {rideRequest.status == 'accepted' && (
          <div className="flex flex-row mt-4 justify-center gap-3">
            <ConfirmationButton
              text="Accepted"
              bgColor="bg-emerald-500"
              textColor="text-white"
              disabled
            />
            <button
              className="bg-orange-600 w-7 h-7 rounded-2xl flex items-center justify-center"
              onClick={() => handleClick('pending')}
            >
              <FontAwesomeIcon icon={faX} color="white" size="xs" />
            </button>
          </div>
        )}
        {rideRequest.status == 'declined' && (
          <div className="flex flex-row mt-4 justify-center gap-3">
            <ConfirmationButton
              text="Declined"
              bgColor="bg-orange-600"
              textColor="text-white"
              disabled
            />
            <button
              className="bg-emerald-400 w-7 h-7 rounded-2xl flex items-center justify-center"
              onClick={() => handleClick('pending')}
            >
              <FontAwesomeIcon icon={faX} color="white" size="xs" />
            </button>
          </div>
        )}
      </div>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${rideRequest.via_point_latitude}%2C${rideRequest.via_point_longitude}`}
        target="_blank"
        rel="noreferrer"
      >
        <Image src="/google-maps.svg" alt="Cow-Image" width={50} />
      </a>
    </div>
  )
}
