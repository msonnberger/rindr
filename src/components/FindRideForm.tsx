import { faRightLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Campuses } from 'src/types/main'
import Image from '@components/Image'
import SelectSuggestions from './SelectSuggestions'

interface FindRideFormProps {
  setOpenFilter: any
  setDate: any
  setDestination: any
  setLocation: any
}

export default function FindRideForm({
  setOpenFilter,
  setDate,
  setDestination,
  setLocation,
}: FindRideFormProps) {
  const [destinationInput, setDestinationInput] = useState<Location>()
  const [dateInput, setDateInput] = useState('')
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
    setOpenFilter(false)
  }

  const ExchangeLocation = (ev: any) => {
    ev.preventDefault()
    setDestinationInput(locationInput)
    setLocationInput(destinationInput)
  }
  useEffect(() => {
    console.log(locationInput, 'from')
    console.log(destinationInput, 'to')
    console.log(dateInput, 'date')
  }, [destinationInput, dateInput, locationInput])

  return (
    <>
      <button
        className="rounded-3xl flex items-center justify-center bg-sky-400 py-2 pl-4 pr-4 text-white fit-content w-max absolute right-0 top-16"
        onClick={() => handleSubmit()}
      >
        Back
      </button>
      <div className="mt-5">
        <p className="font-light mt-6 mb-2">from</p>
        {Campuses && (
          <SelectSuggestions
            selectedColor="bg-sky-400"
            defaultColor="bg-sky-200"
            setInput={setLocationInput}
            options={[...Campuses, Home]}
          />
        )}
      </div>
      <button
        className="w-6 h-6 bg-sky-400 rounded-2xl flex justify-center items-center absolute right-0 mt-4 mr-3"
        onClick={(ev) => ExchangeLocation(ev)}
      >
        <FontAwesomeIcon icon={faRightLeft} color="white" rotation={90} />
      </button>
      <div className="mt-5">
        <p className="font-light mt-6 mb-2">to</p>
        {Campuses && (
          <SelectSuggestions
            selectedColor="bg-sky-400"
            defaultColor="bg-sky-200"
            setInput={setDestinationInput}
            options={[...Campuses, Home]}
          />
        )}
      </div>
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
      <div className="w-full flex flex-col items-center mt-10">
        <button
          className="rounded-3xl flex items-center justify-center bg-sky-400 py-3 pl-4 pr-4 font-bold text-white fit-content w-max"
          onClick={() => handleSubmit()}
        >
          FIND MATCH
        </button>
        <Image src="/car-find-ride.svg" alt="Cow in the car" className="mt-10" />
      </div>
    </>
  )
}
