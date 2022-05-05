import { useEffect, useState } from 'react'
import { Campuses, RequestsJoinRides } from 'src/types/main'
import { formatTime } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import Image from '@components/Image'

interface RideDateContainerProps {
  ride: RequestsJoinRides
}

export default function RideDateContainer({ ride }: RideDateContainerProps) {
  const [firstName, setFirstname] = useState<string>('')

  useEffect(() => {
    getDriverFirstname(ride.driver_id)
  }, [])
  async function getDriverFirstname(userId: string) {
    const { data } = await supabase.from('users').select('first_name').eq('id', userId)
    if (data) setFirstname(data[0].first_name)
  }
  return (
    <div className="bg-sky-100 p-5 rounded-3xl flex relative flex-row items-center">
      <Image src="/car-orange.svg" alt="Cow-Image" width={40} className="absolute" />
      <div className="w-full flex flex-row ml-14 justify-between items-center">
        {Campuses.find((campusObject) => campusObject.name == ride.destination_location) ? (
          <p>
            <b>{firstName}</b> picks you up from {ride.via_point_location} at TIME {/*TODO: */}
          </p>
        ) : (
          <p>
            <b>{firstName}</b> picks you up from {ride.start_location} at{' '}
            <b>{formatTime(new Date(ride.departure))}</b>!
          </p>
        )}
      </div>
    </div>
  )
}
