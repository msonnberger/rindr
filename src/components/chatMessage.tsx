import { Timestamp } from "firebase/firestore";
import { formatMinutes, formatTime } from '../utils/functions'


interface ChatMessageProps {
    text: string,
    createdAt: Timestamp;
    received: boolean
}
export default function ChatMessage({text, createdAt, received} : ChatMessageProps) {

  return (
    <div className={received ? "flex flex-row items-center justify-start mr-4" : "flex flex-row items-center justify-end ml-4"}>
        {!received && <p className={"font-light text-xs mr-3"}>{formatTime(new Date(createdAt.seconds*1000))}</p>}
        <div className={received ? "bg-sky-50 rounded-t-3xl rounded-br-3xl p-5 w-full max-w-md" : "bg-sky-300 rounded-t-3xl rounded-bl-3xl p-5 w-full max-w-md"}>
            
            <p className={"font-light"}>{text}</p>
            
        </div>
        {received && <p className={"font-light text-xs ml-3"}>{formatTime(new Date(createdAt.seconds*1000))}</p>}
    </div>)
}
