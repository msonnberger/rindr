//import { faRightLeft } from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Campuses, LocationObject } from 'src/types/main'
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
  const { data: session } = useSession()

  const home: LocationObject = {
    name: 'Home',
    latitude: session?.user.latitude as number,
    longitude: session?.user.longitude as number,
  }
  const [destinationInput, setDestinationInput] = useState<LocationObject>(Campuses[0])
  const [destinationOptions, setDestinationOptions] = useState<Array<LocationObject>>(Campuses)
  const [dateInput, setDateInput] = useState(new Date().toString())
  const [locationInput, setLocationInput] = useState<LocationObject>(home)
  const [locationOptions, setLocationOptions] = useState<Array<LocationObject>>([home])

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
    let tempOptions = destinationOptions
    setDestinationOptions(locationOptions)
    setLocationOptions(tempOptions)
  }

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
        {locationOptions && (
          <SelectSuggestions
            selectedColor="bg-sky-400"
            defaultColor="bg-sky-200"
            setInput={setLocationInput}
            selected={locationInput}
            options={locationOptions}
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
        {destinationOptions && (
          <SelectSuggestions
            selectedColor="bg-sky-400"
            defaultColor="bg-sky-200"
            setInput={setDestinationInput}
            selected={destinationInput}
            options={destinationOptions}
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
