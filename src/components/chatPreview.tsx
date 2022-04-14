import { User } from '../utils/types'

interface ChatPreviewProps {
    otherUser: User
}

export default function ChatPreview({otherUser} : ChatPreviewProps) {
  
  return (
    <div className={"bg-sky-50 rounded-3xl p-4 w-full max-w-md font-bold flex flex-row"}>
        <div className={"bg-emerald-300 h-12 w-12 rounded-3xl mr-5"}></div>
        <div className='mx-0 w-8/12'>
            <p className={"font-bold"}>{otherUser.name}</p>
            <p className={"font-light overflow-ellipsis overflow-hidden whitespace-nowrap"}>Bis später! Nimmst du einen Rucksack mit?</p>
        </div>
        <div className={"flex flex-col justify-between items-end mr-0 ml-auto"}>
            <p className={"font-light text-sm"}>8:03</p>
            <div className={"bg-sky-400 h-5 w-5 rounded-xl flex items-center justify-center ml-5"}>
                <p className={"text-xs font-white text-slate-50"}>2</p>
            </div>
        </div>
    </div>
  )
}
