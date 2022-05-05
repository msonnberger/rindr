import { useEffect, useState } from 'react'
import { Campuses, RequestsJoinRides } from 'src/types/main'
import { LocationObject } from 'src/types/main'
import { formatTime } from '@utils/functions'
import { combineCoordinates } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import Image from '@components/Image'

interface RideDateContainerProps {
  ride: RequestsJoinRides
}

export default function RideDateContainer({ ride }: RideDateContainerProps) {
  const [firstName, setFirstname] = useState<string>('')
  const [driverAddress, setDriverAddress] = useState<LocationObject>()
  const [pickupTime, setPickupTime] = useState<string>('')

  const fetchPickupTime = async (
    start: LocationObject,
    destination: LocationObject,
    departureString: string
  ) => {
    const baseUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/`
    const splitDeparture = ride.departure.split('+')[0]
    const departure = splitDeparture.substring(0, splitDeparture.length - 3)
    const departureDate = new Date(departureString)
    const params = new URLSearchParams([
      ['depart_at', departure],
      ['access_token', process.env.NEXT_PUBLIC_MAPBOX_KEY as string],
    ])

    const url = `${baseUrl}${combineCoordinates([start, destination])}?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    const duration = data.routes[0].duration
    const arrivalDate = new Date(departureDate.getTime() + duration * 1000)

    setPickupTime(arrivalDate.toISOString())
  }

  async function getDriverFirstname(userId: string) {
    const { data } = await supabase
      .from('users')
      .select('first_name,location,latitude,longitude')
      .eq('id', userId)
    if (data) {
      setFirstname(data[0].first_name)
      setDriverAddress({
        name: data[0].location,
        latitude: data[0].latitude,
        longitude: data[0].longitude,
      })
    }
  }

  useEffect(() => {
    getDriverFirstname(ride.driver_id)
    const userAdress: LocationObject = {
      name: ride.via_point_location,
      latitude: ride.via_point_latitude,
      longitude: ride.via_point_longitude,
    }

    if (driverAddress) fetchPickupTime(driverAddress, userAdress, ride.departure)
  }, [ride.departure])

  return (
    <div className="bg-sky-100 p-5 rounded-3xl flex relative flex-row items-center">
      <Image src="/car-orange.svg" alt="Cow-Image" width={40} className="absolute" />
      <div className="w-full flex flex-row ml-14 justify-between items-center">
        {Campuses.find((campusObject) => campusObject.name == ride.destination_location) ? (
          <p>
            <b>{firstName}</b> picks you up from {ride.via_point_location} at{' '}
            <b>{pickupTime && formatTime(new Date(pickupTime))}!</b>
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
