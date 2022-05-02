import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { RideRequest } from 'src/types/main'
import Image from '@components/Image'
import ConfirmationButton from './ConfirmationButton'

interface RideRequestProps {
  RideRequest: RideRequest
}
const longitude = 47.723069
const latitude = 13.071532
const campus = 'Campus Urstein'

// const request: RideRequest = {
//   ride_id: '123456',
//   passenger_id: '6ba688e0-672d-430c-9995-ac271fc84ab2',
//   status: 'declined', //declined or pending
// }

// const request2: RideRequest = {
//   ride_id: '123456',
//   passenger_id: '6ba688e0-672d-430c-9995-ac271fc84ab2',
//   status: 'accepted', //declined or pending
// }

// const request3: RideRequest = {
//   ride_id: '123456',
//   passenger_id: '6ba688e0-672d-430c-9995-ac271fc84ab2',
//   status: 'pending', //declined or pending
// }

export default function RideRequestContainer({ RideRequest }: RideRequestProps) {
  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const bgColor =
    RideRequest.status === 'accepted'
      ? `bg-emerald-100`
      : RideRequest.status === 'pending'
      ? 'bg-orange-100'
      : 'bg-orange-200'

  useEffect(() => {
    setName('Juliane')
    setTime('10:00')
    //fetch information of ride in supabase
    //fetch name of user and location
  })

  const handleClick = (status: 'accepted' | 'declined' | 'pending') => {
    //TODO handle API
    console.log(status)
  }

  return (
    <div className={`${bgColor} p-5 rounded-3xl flex relative flex-row items-center`}>
      <Image src="/cow.svg" alt="Cow-Image" width={40} className="rotate-12 absolute left-0" />
      <div className="w-full flex flex-col items-center ml-8">
        <p>
          <b>{name}</b> requests to join your ride to {campus} at <b>{time}</b>
        </p>
        {RideRequest.status == 'pending' && (
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
        {RideRequest.status == 'accepted' && (
          <div className="flex flex-row mt-4 justify-center gap-3">
            <ConfirmationButton text="Accepted" bgColor="bg-emerald-500" textColor="text-white" />
            <button
              className="bg-orange-600 w-7 h-7 rounded-2xl flex items-center justify-center"
              onClick={() => handleClick('pending')}
            >
              <FontAwesomeIcon icon={faX} color="white" size="xs" />
            </button>
          </div>
        )}
        {RideRequest.status == 'declined' && (
          <div className="flex flex-row mt-4 justify-center gap-3">
            <ConfirmationButton text="Declined" bgColor="bg-orange-600" textColor="text-white" />
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
        href={`https://www.google.com/maps/search/?api=1&query=${longitude}%2C${latitude}`}
        target="_blank"
        rel="noreferrer"
      >
        <Image src="/google-maps.svg" alt="Cow-Image" width={50} />
      </a>
    </div>
  )
}
