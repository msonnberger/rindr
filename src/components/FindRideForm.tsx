import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Campuses, Location } from 'src/types/main'
import Image from '@components/Image'
import SelectSuggestions from './SelectSuggestions'

interface FindRideFormProps {
  setOpenFilter: any
  setSwiperCards: any
}

export default function FindRideForm({ setOpenFilter, setSwiperCards }: FindRideFormProps) {
  const { data: session } = useSession()

  const home: Location = {
    name: 'Home',
    latitude: session?.user.latitude as number,
    longitude: session?.user.longitude as number,
  }

  const [locationInput, setLocationInput] = useState<Location>(Campuses[0])
  const [destinationInput, setDestinationInput] = useState<Location>(home)
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

  // const ExchangeLocation = (ev: any) => {
  //   ev.preventDefault()
  //   setDestinationInput(locationInput)
  //   setLocationInput(destinationInput)
  // }

  return (
    <>
      {/* <button
        className="rounded-3xl flex items-center justify-center bg-sky-400 py-2 pl-4 pr-4 text-white fit-content w-max absolute right-0 top-16"
        onClick={() => handleSubmit()}
      >
        Back
      </button> */}
      <div className="mt-5">
        <p className="font-light mt-6 mb-2">from</p>
        {Campuses && (
          <SelectSuggestions
            selectedColor="bg-sky-400"
            defaultColor="bg-sky-200"
            setInput={setLocationInput}
            options={[...Campuses, home]}
          />
        )}
      </div>
      {/* <button
        className="w-6 h-6 bg-sky-400 rounded-2xl flex justify-center items-center absolute right-0 mt-4 mr-3"
        onClick={(ev) => ExchangeLocation(ev)}
      >
        <FontAwesomeIcon icon={faRightLeft} color="white" rotation={90} />
      </button> */}
      <div className="mt-5">
        <p className="font-light mt-6 mb-2">to</p>
        {Campuses && (
          <SelectSuggestions
            selectedColor="bg-sky-400"
            defaultColor="bg-sky-200"
            setInput={setDestinationInput}
            options={[...Campuses, home]}
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
        <button
          className="rounded-3xl flex items-center justify-center bg-sky-400 py-3 pl-4 pr-4 font-bold text-white fit-content w-max"
          onClick={handleSubmit}
        >
          FIND MATCH
        </button>
        <Image src="/car-find-ride.svg" alt="Cow in the car" className="mt-10" />
      </div>
    </>
  )
}
