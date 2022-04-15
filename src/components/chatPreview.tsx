import { Dispatch, SetStateAction } from 'react'
import { Channel, User } from '../utils/types'

interface ChatPreviewProps {
    channel: Channel,
    setChatRoom: any,
    otherUser: User | undefined
}

export default function ChatPreview({channel, setChatRoom, otherUser} : ChatPreviewProps) {
  const handleClick = () => {
      setChatRoom(channel)
      console.log("clicked")
  }
  return (
    <button className={"bg-sky-50 rounded-3xl p-4 w-full max-w-md font-bold flex flex-row"} onClick={handleClick}>
        <div className={"bg-emerald-300 h-12 w-12 rounded-3xl mr-5"}></div>
        <div className='mx-0 w-8/12'>
            <p className={"font-bold text-left"}>{otherUser?.name}</p>
            <p className={"font-light overflow-ellipsis overflow-hidden whitespace-nowrap text-left"}>TODO</p>
        </div>
        <div className={"flex flex-col justify-between items-end mr-0 ml-auto"}>
            <p className={"font-light text-sm"}>TODO</p>
            <div className={"bg-sky-400 h-5 w-5 rounded-xl flex items-center justify-center ml-5"}>
                <p className={"text-xs font-white text-slate-50"}>?</p>
            </div>
        </div>
    </button>
  )
}
