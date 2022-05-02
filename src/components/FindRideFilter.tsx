import { useState } from 'react'
import Image from '@components/Image'
import RideFilterInput from './RideFilterInput'

interface FindRideFilterProps {
  setOpenFilter: any
  setDate: any
  setDestination: any
  setLocation: any
}

export default function FindRideFilter({
  setOpenFilter,
  setDate,
  setDestination,
  setLocation,
}: FindRideFilterProps) {
  const [destinationInput, setDestinationInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [locationInput, setLocationInput] = useState('')

  const handleSubmit = () => {
    setDate(dateInput)
    setDestination(destinationInput)
    setLocation(locationInput)
    setOpenFilter(false)
  }
  return (
    <>
      <RideFilterInput
        name="location"
        setInput={setLocationInput}
        type="destination"
        label="from"
      />
      <RideFilterInput
        name="destination"
        setInput={setDestinationInput}
        type="destination"
        label="to"
      />
      <RideFilterInput name="date" setInput={setDateInput} type="date" label="date" />
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
