import { faCheck, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Rose } from '@styles/colors'
import { getRandomInt } from '@utils/functions'

interface Tag {
  tag: string
  bgColor: string
  textColor: string
}

export default function TagsInput() {
  const [newTagValue, setNewTagValue] = useState('')
  const [tags, setTags] = useState<Tag[]>([])
  const icon = newTagValue === '' ? faPlus : faCheck

  const onAddTagClick = () => {
    const [bgColor, textColor] = randomColor()
    setTags([{ tag: newTagValue, bgColor, textColor }, ...tags])
    setNewTagValue('')
  }

  const onRemoveTagClick = (event: React.SyntheticEvent) => {
    const target = event.nativeEvent.target as HTMLButtonElement
    const parent = target.closest('div') as HTMLDivElement
    const input = parent.firstChild as HTMLInputElement
    const valueToRemove = input.value
    setTags(tags.filter((tag) => tag.tag !== valueToRemove))
  }

  const randomColor = () => {
    const random = getRandomInt(1, 9) * 100
    const textColor = random < 400 ? Rose[900] : Rose[50]
    // @ts-ignore
    return [Rose[random], textColor]
  }

  return (
    <div className="flex max-w-md flex-wrap justify-start gap-3">
      <div className="flex w-fit gap-2 rounded-full bg-slate-100 p-2 pr-8">
        <button
          disabled={newTagValue === ''}
          onClick={onAddTagClick}
          className="grid h-6 w-6 place-items-center rounded-full bg-rose-500"
        >
          <FontAwesomeIcon icon={icon} color="white" />
        </button>
        <input
          type="text"
          placeholder="new tag"
          value={newTagValue}
          onChange={(e) => setNewTagValue(e.target.value)}
          className="max-w-[6rem] bg-slate-100"
        />
      </div>
      {tags.map(({ tag, bgColor, textColor }) => (
        <div
          key={tag}
          className="group relative flex gap-4 rounded-full bg-slate-100 p-2"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <input type="text" disabled value={tag} className="max-w-[6rem] bg-inherit pl-3 font-medium" />
          <button
            onClick={onRemoveTagClick}
            className="invisible absolute right-2 grid h-6 w-6 place-items-center rounded-full bg-rose-500 group-hover:visible"
          >
            <FontAwesomeIcon icon={faTrashAlt} color="white" className="text-sm" />
          </button>
        </div>
      ))}
    </div>
  )
}
