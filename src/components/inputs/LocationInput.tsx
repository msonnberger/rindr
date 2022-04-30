import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { SetupProfileFormValues } from '@utils/types'

interface Location {
  name: string
  coordinates: string[]
}

interface LocationInputProps {
  register: UseFormRegister<SetupProfileFormValues>
  setValue: UseFormSetValue<SetupProfileFormValues>
}

export default function LocationInput({ register, setValue }: LocationInputProps) {
  const [suggestions, setSuggestions] = useState<Location[]>([])
  const [selected, setSelected] = useState<Location>({} as Location)
  const [query, setQuery] = useState('')

  const onInputChange = async (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    setQuery(value)

    if (value.length <= 3) return

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?`
    const searchParams = new URLSearchParams([
      ['access_token', process.env.NEXT_PUBLIC_MAPBOX_KEY ?? ''],
      ['country', 'at,de'],
      ['types', 'postcode,place,locality,neighborhood,address'],
    ])

    const response = await fetch(url + searchParams.toString())
    const { features: results } = await response.json()

    if (results) {
      setSuggestions(results.map((result: any) => ({ name: result.place_name, coordinates: result.center })))
    }
  }

  const onSelectedChange = (selected: Location) => {
    setSelected(selected)
    setValue('location', selected.coordinates.join(','))
  }

  return (
    <div>
      <input type="hidden" {...register('location')} />
      <Combobox value={selected} onChange={onSelectedChange}>
        <div className="relative">
          <div className="flex gap-4 rounded-full bg-slate-100 p-2 pr-6">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-rose-500">
              <FontAwesomeIcon icon={faMapMarkerAlt} color="white" />
            </div>
            <Combobox.Input
              placeholder="Where do you commute from?"
              className="truncate bg-inherit focus:outline-none"
              displayValue={(location: Location) => location.name}
              onChange={onInputChange}
            />
          </div>

          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
            {suggestions.length === 0 && query.length > 3 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-slate-700">Nothing found.</div>
            ) : (
              suggestions.map((location) => (
                <Combobox.Option
                  key={location.coordinates.join()}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 text-left ${
                      active ? 'bg-rose-700 text-rose-50' : 'text-slate-900'
                    }`
                  }
                  value={location}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {location.name}
                    </span>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}
