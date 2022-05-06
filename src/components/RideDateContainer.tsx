import { Campuses, RequestsJoinRides } from 'src/types/main'
import { formatTime } from '@utils/functions'
import Image from '@components/Image'

interface RideDateContainerProps {
  ride: RequestsJoinRides
}

export default function RideDateContainer({ ride }: RideDateContainerProps) {
  return (
    <div className="bg-sky-100 p-5 rounded-3xl flex relative flex-row items-center">
      <Image src="/car-orange.svg" alt="Cow-Image" width={40} className="absolute" />
      <div className="w-full flex flex-row ml-14 justify-between items-center">
        {Campuses.find((campusObject) => campusObject.name == ride.destination_location) ? (
          <p>
            <span className="font-bold">{ride.driver_first_name}</span> picks you up from{' '}
            {ride.via_point_location} at{' '}
            <span className="font-bold">{formatTime(new Date(ride.pickup_time))}!</span>
          </p>
        ) : (
          <p>
            <span className="font-bold">{ride.driver_first_name}</span> picks you up from{' '}
            {ride.destination_location} at{' '}
            <span className="font-bold">{formatTime(new Date(ride.departure))}</span>!
          </p>
        )}
      </div>
    </div>
  )
}
