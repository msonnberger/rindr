import { faRightLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Campuses, LocationObject } from 'src/types/main'
import Button from '@components/Button'
import Image from '@components/Image'
import SelectSuggestions from './SelectSuggestions'

interface FindRideFormProps {
  setOpenFilter: any
  setSwiperCards: any
}

export default function FindRideForm({ setOpenFilter, setSwiperCards }: FindRideFormProps) {
  const { data: session } = useSession()

  const home: LocationObject = {
    name: 'Home',
    latitude: session?.user.latitude as number,
    longitude: session?.user.longitude as number,
  }

  const [destinationInput, setDestinationInput] = useState<LocationObject>(Campuses[0])
  const [destinationOptions, setDestinationOptions] = useState<Array<LocationObject>>(Campuses)
  const [locationInput, setLocationInput] = useState<LocationObject>(home)
  const [locationOptions, setLocationOptions] = useState<Array<LocationObject>>([home])
  const [dateInput, setDateInput] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = async () => {
    const params = new URLSearchParams()
    params.set('date', dateInput)

    if (locationInput.name === 'Home') {
      params.set('campus', destinationInput.name)
      params.set('campusIsStart', 'false')
      params.set('pickup', `${locationInput.latitude},${locationInput.longitude}`)
    } else {
      params.set('campus', locationInput.name)
      params.set('campusIsStart', 'true')
      params.set('pickup', `${destinationInput.latitude},${destinationInput.longitude}`)
    }

    const res = await fetch('/api/rides/find-matches?' + params.toString())
    const data = await res.json()

    setSwiperCards(data)
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
        className="rounded-3xl flex items-center justify-center bg-sky-400 py-2 pl-4 pr-4 text-white fit-content w-max absolute right-0 top-0"
        onClick={() => setOpenFilter(false)}
      >
        Close
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
        className="p-2 bg-sky-400 rounded-full flex justify-center items-center absolute right-0 mt-4 mr-3"
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
          className="flex gap-4 rounded-full bg-slate-100 p-3 focus:outline-none text-slate-600 font-light"
          type="date"
          name="date"
          onChange={(ev) => setDateInput(ev.target.value)}
          value={dateInput}
        />
      </label>
      <div className="w-full flex flex-col items-center mt-10">
        <Button
          text="FIND MATCH"
          bgColor="bg-sky-400"
          buttonType="button"
          textColor="text-white"
          fontWeight="bold"
          onClick={handleSubmit}
        />
        <Image src="/car-find-ride.svg" alt="Cow in the car" className="mt-10" />
      </div>
    </>
  )
}
