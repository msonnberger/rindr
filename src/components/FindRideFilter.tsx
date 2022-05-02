import { useState } from 'react'

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
      <input
        className="bg-emerald-400"
        type="text"
        name="location"
        onChange={(ev) => setLocationInput(ev.target.value)}
      />
      <input
        className="bg-sky-400"
        type="text"
        name="destination"
        onChange={(ev) => setDestinationInput(ev.target.value)}
      />
      <input
        className="bg-orange-400"
        type="text"
        name="date"
        onChange={(ev) => setDateInput(ev.target.value)}
      />
      <button
        className="rounded-3xl flex items-center justify-center bg-sky-400 py-1 pl-4 pr-4 font-bold text-white fit-content w-max"
        onClick={() => handleSubmit()}
      >
        FIND MATCH
      </button>
    </>
  )
}
