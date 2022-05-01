import { faCheck, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Rose } from '@styles/colors'
import { getRandomInt } from '@utils/functions'
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form'
import { SetupProfileFormValues } from '@utils/types'

interface TagsInputProps {
  control: Control<SetupProfileFormValues>
  register: UseFormRegister<SetupProfileFormValues>
}

export default function TagsInput({ control, register }: TagsInputProps) {
  const [newTagValue, setNewTagValue] = useState('')
  const [tagColors, setTagColors] = useState<{ bgColor: string; textColor: string }[]>([])

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'interests',
  })

  const randomColor = () => {
    const random = getRandomInt(1, 9) * 100
    const textColor = random < 400 ? Rose[900] : Rose[50]
    // @ts-ignore
    return [Rose[random], textColor]
  }

  return (
    <div className="flex flex-wrap justify-start gap-3">
      <div className="flex w-fit gap-2 rounded-full bg-slate-100 p-2 pr-8">
        <button
          disabled={newTagValue === ''}
          onClick={(e) => {
            e.preventDefault()
            const [bgColor, textColor] = randomColor()
            setTagColors([{ bgColor, textColor }, ...tagColors])
            prepend({ tag: newTagValue })
            setNewTagValue('')
          }}
          className="grid h-6 w-6 place-items-center rounded-full bg-rose-500"
        >
          <FontAwesomeIcon icon={newTagValue === '' ? faPlus : faCheck} color="white" />
        </button>
        <input
          type="text"
          value={newTagValue}
          onChange={(e) => {
            setNewTagValue(e.target.value)
          }}
          placeholder="new tag"
          className="max-w-[6rem] bg-slate-100 focus:outline-none"
        />
      </div>
      {fields.map((field, index) => {
        const { bgColor, textColor } = tagColors[index]
        return (
          <div
            key={field.id}
            className="group relative flex gap-4 rounded-full bg-slate-100 p-2"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <input
              key={field.id}
              disabled
              placeholder="new tag..."
              {...register(`interests.${index}.tag` as const)}
              className="max-w-[6rem] bg-inherit pl-3 font-medium"
            />

            <button
              onClick={() => {
                remove(index)
                setTagColors(tagColors.filter((_, idx) => idx !== index))
              }}
              className="invisible absolute right-2 grid h-6 w-6 place-items-center rounded-full bg-rose-500 group-hover:visible"
            >
              <FontAwesomeIcon icon={faTrashAlt} color="white" className="text-sm" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
