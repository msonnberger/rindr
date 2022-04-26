import Image from 'next/image'
import Link from 'next/link'

interface UserPreview {
  id: string
  firstName: string
  lastName: string
  pictureUrl: string | null
}

interface AutocompleteProps {
  options: UserPreview[]
}

export default function AutoComplete({ options }: AutocompleteProps) {
  return (
    <div className="flex w-full flex-col bg-sky-50 p-4 items-start absolute top-16 z-10 rounded-3xl left-0">
      {options.length > 0 ? (
        options.map((option, key) => {
          return (
            <Link key={key} href={`/chatroom/${option.id}`} passHref>
              <div className="h-16 flex items-center text-start flex-start hover:bg-sky-100 cursor-pointer w-full rounded-3xl">
                <div className="mr-5 ml-3 h-12 w-12 rounded-3xl bg-emerald-300">
                  {option.pictureUrl && <Image src={option.pictureUrl} alt="Profile picture" />}
                </div>
                <p className="font-light">
                  {option.firstName} {option.lastName}
                </p>
              </div>
            </Link>
          )
        })
      ) : (
        <p className="font-light  text-sm text-sky-800">no results found...</p>
      )}
    </div>
  )
}
