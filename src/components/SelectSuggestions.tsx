import { LocationObject } from 'src/types/main'

interface SelectSuggestionsProps {
  options: Array<LocationObject>
  setInput: any
  selectedColor: string
  defaultColor: string
  selected: LocationObject
}
export default function SelectSuggestions({
  options,
  setInput,
  selectedColor,
  defaultColor,
  selected,
}: SelectSuggestionsProps) {
  const handleClick = (optionName: LocationObject) => {
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
                selected.name === option.name ? selectedColor : defaultColor
              }`}
            >
              {option.name}
            </button>
          )
        })}
    </div>
  )
}
