import { Timestamp } from "firebase/firestore";

interface ChatMessageProps {
    text: string,
    createdAt: Timestamp;
    received: boolean
}
export default function ChatMessage({text, createdAt, received} : ChatMessageProps) {
    const formatMinutes = (min: string) => {
        return min.length == 1 ? `0${min}` : min
    }

    const date = new Date(createdAt.seconds*1000)
    const hours = date.getHours()
    const minutes = formatMinutes(`${date.getMinutes()}`)
    
  return (
    <div className={received ? "flex flex-row items-center justify-start mr-4" : "flex flex-row items-center justify-end ml-4"}>
        {!received && <p className={"font-light text-xs mr-3"}>{`${hours}:${minutes}`}</p>}
        <div className={received ? "bg-sky-50 rounded-t-3xl rounded-br-3xl p-5 w-full max-w-md" : "bg-sky-300 rounded-t-3xl rounded-bl-3xl p-5 w-full max-w-md"}>
            
            <p className={"font-light"}>{text}</p>
            
        </div>
        {received && <p className={"font-light text-xs ml-3"}>{`${hours}:${minutes}`}</p>}
    </div>)
}
