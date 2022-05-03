import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Campuses } from 'src/types/main'
import Image from '@components/Image'
import SelectSuggestions from './SelectSuggestions'

interface ShareRideFormProps {
  setDate: any
  setDestination: any
  setLocation: any
  setThreshold: any
}

export default function ShareRideForm({
  setDate,
  setDestination,
  setLocation,
  setThreshold,
}: ShareRideFormProps) {
  const [destinationInput, setDestinationInput] = useState<Location>()
  const [dateInput, setDateInput] = useState('')
  const [thresholdInput, setThresholdInput] = useState(25)
  const [locationInput, setLocationInput] = useState<Location>()
  const { data: session } = useSession()

  const Home = {
    name: 'home',
    latitude: session?.user.latitude,
    longitude: session?.user.longitude,
  }

  const handleSubmit = () => {
    setDate(dateInput)
    setDestination(destinationInput)
    setLocation(locationInput)
    setThreshold(thresholdInput)
  }

  useEffect(() => {
    console.log(locationInput, 'from')
    console.log(destinationInput, 'to')
    console.log(dateInput, 'date')
  }, [destinationInput, dateInput, locationInput])

  return (
    <>
      <div className="mt-5">
        <p className="font-light mt-6 mb-2">from</p>
        {Campuses && (
          <SelectSuggestions
            selectedColor="bg-emerald-400"
            defaultColor="bg-emerald-200"
            setInput={setLocationInput}
            options={[...Campuses, Home]}
          />
        )}
      </div>
      <div className="mt-5">
        <p className="font-light mt-6 mb-2">to</p>
        {Campuses && (
          <SelectSuggestions
            selectedColor="bg-emerald-400"
            defaultColor="bg-emerald-200"
            setInput={setDestinationInput}
            options={[...Campuses, Home]}
          />
        )}
      </div>
      <div className="flex flex-row w-full gap-10">
        <label htmlFor="date" className="mt-5">
          <p className="font-light mt-6 mb-2">date</p>
          <input
            className="bg-slate-50 flex gap-4 rounded-full bg-slate-100 p-3 focus:outline-none text-slate-600 font-light"
            type="date"
            name="date"
            onChange={(ev) => setDateInput(ev.target.value)}
            value={dateInput}
          />
        </label>
        <label htmlFor="time" className="mt-5">
          <p className="font-light mt-6 mb-2">departure time</p>
          <input
            className="bg-slate-50 flex gap-4 rounded-full bg-slate-100 p-3 focus:outline-none text-slate-600 font-light"
            type="time"
            name="time"
            onChange={(ev) => setDateInput(ev.target.value)}
            value={dateInput}
          />
        </label>
      </div>
      <label htmlFor="threshold" className="mt-5">
        <div className="flex flex-row mt-6 mb-2 justify-between w-full">
          <p className="font-light">threshold</p>
          <p className="font-bold text-emerald-400">+{thresholdInput} km</p>
        </div>
        <input
          name="threshold"
          type="range"
          min="0"
          max="50"
          value={thresholdInput}
          className="w-full appearance-none bg-slate-200 h-4"
          id="threshold"
          onInput={(ev) => setThresholdInput(ev.target.value)}
        />
      </label>
      <div className="w-full flex flex-col items-center mt-10">
        <button
          className="rounded-3xl flex items-center justify-center bg-emerald-400 py-3 pl-4 pr-4 font-bold text-white fit-content w-max"
          onClick={() => handleSubmit()}
        >
          FIND MATCH
        </button>
        <Image src="/car-share-ride.svg" alt="Cow in the car" className="mt-10" />
      </div>
    </>
  )
}
