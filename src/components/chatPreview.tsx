import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { db } from 'src/firebase-config'
import { Channel, Message, User } from '../utils/types'
import { formatDate, formatMinutes, formatTime } from '../utils/functions'


interface ChatPreviewProps {
    channel: Channel,
    setChatRoom: any,
    otherUser: User | undefined
}

export default function ChatPreview({channel, setChatRoom, otherUser} : ChatPreviewProps) {
    const messagesRef = collection(db, 'messages')
    const [lastMessage, setLastMessage] = useState<Message>()
    const handleClick = () => {
        setChatRoom(channel)
    }

    const printDatePreview = (date: Date) => {
        let todayDate = new Date()
        let todayFormatted = formatDate(todayDate)
        let dateFormatted = formatDate(date)
        if(dateFormatted === todayFormatted) {
            return formatMinutes(formatTime(date))
        } else if(dateFormatted === formatDate(new Date(Date.now() - 86400000))) {
            return "yesterday"
        } else {
            return dateFormatted
        }
    }
    

    const receivedMessages = query(messagesRef, where("channelId", "==", channel.id), orderBy("createdAt", "desc"), limit(1)); //two were aren't possible?

    //receivedMessages
    useEffect(() => {
        onSnapshot(receivedMessages, (querySnapshot) => {
        let newMessages: Message[] = [];
        querySnapshot.forEach((doc) => {
            newMessages.push({
                id: doc.id,
                text: doc.data().text,
                createdAt: doc.data().createdAt,
                from: doc.data().from,
                to: doc.data().to,
                channelId: channel.id
            });
            
        });
        setLastMessage(newMessages[0])
        // setLastMessage([...newMessages]);
    });
    }, [])
    return (
        <button className={"bg-sky-50 rounded-3xl p-4 w-full max-w-md font-bold flex flex-row"} onClick={handleClick}>
            <div className={"bg-emerald-300 h-12 w-12 rounded-3xl mr-5"}></div>
            <div className='mx-0 w-8/12'>
                <p className={"font-bold text-left"}>{otherUser?.name}</p>
                <p className={"font-light overflow-ellipsis overflow-hidden whitespace-nowrap text-left"}>{lastMessage?.text}</p>
            </div>
            <div className={"flex flex-col justify-between items-end mr-0 ml-auto"}>
                {lastMessage && <p className={"font-light text-sm"}>{printDatePreview(new Date(lastMessage.createdAt.seconds*1000))}</p>}
                <div className={"bg-sky-400 h-5 w-5 rounded-xl flex items-center justify-center ml-5"}>
                    <p className={"text-xs font-white text-slate-50"}>?</p>
                </div>
            </div>
        </button>
    )
}
