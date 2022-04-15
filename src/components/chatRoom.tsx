import { useEffect, useRef, useState } from "react";
import { addDoc, collection, getDocs, Timestamp, onSnapshot, doc, query, where } from "firebase/firestore";
import ChatMessage from "./chatMessage";
import { db } from '../firebase-config'
import { User } from '../utils/types'

interface ChatRoomProps {
    user: User,
    otherUser: User
}
interface Message {
    id: string,
    text: string,
    from: string,
    createdAt: Timestamp,
    to: string
}

interface DateMessages {
  day: string,
  dateMessages: Message[] 
}

const dummyArray : DateMessages = {
  day: '4/14/2022',
  dateMessages: [
    {
      id: '323232333',
      to: '1111',
      from: '2222',
      text: 'Hallo!',
      createdAt: Timestamp.now()
    },
    {
      id: '323324',
      to: '2222',
      from: '1111',
      text: 'Hi wie gehts?',
      createdAt: Timestamp.now()
    },
  ]
}

export default function ChatRoom({user, otherUser} : ChatRoomProps) {
 
    const dummySpace = useRef()
    const messagesRef = collection(db, 'messages')

    const [newMessageValue, setNewMessageValue] = useState<string>();
    const [messages, setMessages] = useState<DateMessages[]>([]);

    async function handleSubmit(e: any){
        e.preventDefault();

        const newMessageObject = {
            text: newMessageValue,
            createdAt: Timestamp.fromDate(new Date()),
            from: user.id,
            to: otherUser.id
        }
        
        setNewMessageValue('');
        console.log(messages)
        await addDoc(messagesRef, newMessageObject)

        // scroll down the chat
        // if(dummySpace.current !== undefined) {
        //     dummySpace.current.scrollIntoView({ behavor: "smooth" });
        // }
  };

  const printDate = (date: Date) => {
    let todayDate = new Date()
    let todayFormatted = formatDate(todayDate)
    let dateFormatted = formatDate(date)
    if(dateFormatted === todayFormatted) {
      return "today"
    } else if(dateFormatted === formatDate(new Date(Date.now() - 86400000))) {
      return "yesterday"
    } else {
      return dateFormatted
    }
  }

  const formatDate = (date: Date) => {
    let dayOfMonth = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    return `${month}/${dayOfMonth}/${year}`
  }

  const sortMessages = (allMessages: Message[]) => {
    let collectionByDate: DateMessages[] = []
        allMessages.forEach((message) => {
          let date = new Date(message.createdAt.seconds*1000)
          let dayOfMonth = date.getDate()
          let month = date.getMonth() + 1
          let year = date.getFullYear()
          let fullDate = `${month}/${dayOfMonth}/${year}`
          let dayIndex = collectionByDate.find((element: DateMessages) => element.day == fullDate)
          if(dayIndex != undefined) {
            dayIndex.dateMessages.push(message)
          } else {
            collectionByDate.push({
              day: fullDate,
              dateMessages: [message]
            })
          }
        })
        return collectionByDate.sort((a, b) => (a.day > b.day) ? 1 : -1)
  }


    const receivedMessages = query(messagesRef, where("to", "in", [user.id, otherUser.id])); //two were aren't possible?

    receivedMessages
    useEffect(() => {
      onSnapshot(receivedMessages, (querySnapshot) => {
        let newMessages: Message[] = [];
        querySnapshot.forEach((doc) => {
          if(doc.data().from == user.id || doc.data().from == otherUser.id) { //push only messages between both
            newMessages.push({
              id: doc.id,
              text: doc.data().text,
              createdAt: doc.data().createdAt,
              from: doc.data().from,
              to: doc.data().to
            });
          }
        });
 
        let sortByDate = sortMessages(newMessages)
        setMessages([...sortByDate]);
        console.log(sortByDate)
        console.log("messages updated")
    });
    }, [])
    

  return (
    <section id="chat_room" className="flex flex-col">
      {messages.map((dateMessage: DateMessages) => {
        return(
        <>
        <p className={"text-xs w-full flex justify-center mb-5 mt-7 text-sky-700"}>{printDate(new Date(dateMessage.day))}</p>
          <ul className="flex flex-col gap-7">
            {(dateMessage.dateMessages).map((message: Message) => (
              <li key={message.id}>
                <ChatMessage createdAt={message.createdAt} text={message.text} received={message.to == user.id}/>
              </li>
            ))}
          </ul>
        </>)
      })}
        


      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessageValue || ''}
          onChange={(e) => setNewMessageValue(e.target.value)}
          placeholder="Type your message here..."
        />

        {newMessageValue != '' && <button type="submit" disabled={newMessageValue == ''}>
          Send
        </button>}
      </form>
    </section>
  );
}