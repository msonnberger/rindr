import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Campuses, Location, SupabaseRide } from 'src/types/main'
import { combineCoordinates } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import Image from '@components/Image'
import SelectSuggestions from './SelectSuggestions'

export default function ShareRideForm() {
  const { data: session } = useSession()

  const home = {
    name: 'Home',
    latitude: session?.user.latitude as number,
    longitude: session?.user.longitude as number,
  }

  const router = useRouter()
  const [locationInput, setLocationInput] = useState<Location>(Campuses[0])
  const [destinationInput, setDestinationInput] = useState<Location>(home)
  const [dateInput, setDateInput] = useState(new Date().toISOString().split('T')[0])
  const [timeInput, setTimeInput] = useState('08:00')
  const [thresholdInput, setThresholdInput] = useState(25)

  const handleSubmit = async () => {
    const newRide: Partial<SupabaseRide> = {
      driver_id: session?.user.id as string,
      start_latitude: locationInput.latitude,
      start_longitude: locationInput.longitude,
      start_location: locationInput.name,
      destination_latitude: destinationInput.latitude,
      destination_longitude: destinationInput.longitude,
      destination_location: destinationInput.name,
      threshold: thresholdInput,
    }

    if (newRide.destination_location === 'Home') {
      newRide.destination_location = session?.user.location as string
    }

    if (newRide.start_location === 'Home') {
      newRide.start_location = session?.user.location as string
    }

    const departureString = `${dateInput}T${timeInput}`
    const departureDate = new Date(departureString)
    newRide.departure = departureDate.toISOString()

    const duration = await getRideDuration(locationInput, destinationInput, departureString)
    const arrivalDate = new Date(departureDate.getTime() + duration * 1000)
    newRide.arrival = arrivalDate.toISOString()
    newRide.duration = duration

    const { data, error } = await supabase.from<SupabaseRide>('rides').insert(newRide)

    if (error || !data) {
      alert('Something went wrong. Please try again later.')
      return
    }

    router.push('/rides')
  }

  const getRideDuration = async (start: Location, destination: Location, departure: string) => {
    const baseUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/`

    const params = new URLSearchParams([
      ['depart_at', departure],
      ['access_token', process.env.NEXT_PUBLIC_MAPBOX_KEY as string],
    ])

    const url = `${baseUrl}${combineCoordinates([start, destination])}?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    return data.routes[0].duration
  }

  return (
    <>
      <div className="mt-5">
        <p className="font-light mt-6 mb-2">from</p>
        {Campuses && (
          <SelectSuggestions
            selectedColor="bg-emerald-700"
            defaultColor="bg-emerald-400"
            setInput={setLocationInput}
            options={[...Campuses, home]}
          />
        )}
      </div>
      <div className="mt-5">
        <p className="font-light mt-6 mb-2">to</p>
        {Campuses && (
          <SelectSuggestions
            selectedColor="bg-emerald-700"
            defaultColor="bg-emerald-400"
            setInput={setDestinationInput}
            options={[home, ...Campuses]}
          />
        )}
      </div>
      <div className="flex flex-row w-full gap-10">
        <label htmlFor="date" className="mt-5">
          <p className="font-light mt-6 mb-2">date</p>
          <input
            className="flex gap-4 rounded-full bg-slate-100 p-3 focus:outline-none text-slate-600 font-light"
            type="date"
            name="date"
            onChange={(ev) => setDateInput(ev.target.value)}
            value={dateInput}
          />
        </label>
        <label htmlFor="time" className="mt-5">
          <p className="font-light mt-6 mb-2">departure time</p>
          <input
            className="flex gap-4 rounded-full bg-slate-100 p-3 focus:outline-none text-slate-600 font-light"
            type="time"
            name="time"
            onChange={(ev) => setTimeInput(ev.target.value)}
            value={timeInput}
          />
        </label>
      </div>
      <label htmlFor="threshold" className="mt-5">
        <div className="flex flex-row mt-6 mb-2 justify-between w-full">
          <p className="font-light">extra time</p>
          <p className="font-bold text-emerald-400">+{thresholdInput} min</p>
        </div>
        <input
          name="threshold"
          type="range"
          min="0"
          max="50"
          step="5"
          value={thresholdInput}
          className="w-full appearance-none bg-slate-200 h-4"
          id="threshold"
          // @ts-ignore
          onInput={(ev) => setThresholdInput(ev.target.value)}
        />
      </label>
      <div className="w-full flex flex-col items-center mt-10">
        <button
          className="rounded-3xl flex items-center justify-center bg-emerald-400 py-3 pl-4 pr-4 font-bold text-white fit-content w-max"
          onClick={handleSubmit}
        >
          SHARE RIDE
        </button>
        <Image src="/car-share-ride.svg" alt="Cow in the car" className="mt-10" />
      </div>
    </>
  )
}
