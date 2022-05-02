import { useEffect, useState } from 'react'
import { RideRequest } from 'src/types/main'
import Image from '@components/Image'

interface RideRequestProps {
  RideRequest: RideRequest
}
// const longitude = 47.723069
// const latitude = 13.071532
const campus = 'Campus Urstein'

// const request: RideRequest = {
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
      : 'bg-orange-400'

  useEffect(() => {
    setName('Juliane')
    setTime('10:00')
    //fetch information of ride in supabase
    //fetch name of user and location
  })

  return (
    <>
      <div className={`${bgColor} w-full rounded-3xl p-5 flex-row`}>
        <Image src="/cow.svg" alt="Cow-Image" />
        <p>
          <b>{name}</b> requests to join your ride to {campus} at <b>{time}</b>
        </p>
      </div>
    </>
  )
}
