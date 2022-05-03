import { useState } from 'react'
import { Location } from 'src/types/main'

interface SelectSuggestionsProps {
  options: Array<Location>
  setInput: any
}
export default function SelectSuggestions({ options, setInput }: SelectSuggestionsProps) {
  const [selectedOption, setSelectedOption] = useState<null | Location>(null)
  const handleClick = (optionName: Location) => {
    setSelectedOption(optionName)
    console.log(optionName, 'input')
    setInput(optionName)
  }

  return (
    <div className="flex-wrap flex gap-4 rounded-full p-3 text-slate-600 font-light">
      {options &&
        options.map((option, key) => {
          return (
            <button
              onClick={() => handleClick(option)}
              key={key}
              className={`rounded-3xl flex items-center justify-center py-1 pl-4 pr-4 text-white fit-content w-max ${
                selectedOption === option ? 'bg-sky-400' : 'bg-sky-200'
              }`}
            >
              {option.name}
            </button>
          )
        })}
    </div>
  )
}
