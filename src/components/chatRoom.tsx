import { useRef, useState } from "react";
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

export default function ChatRoom({user, otherUser} : ChatRoomProps) {
 
    const dummySpace = useRef()
    const messagesRef = collection(db, 'messages')

    const [newMessageValue, setNewMessageValue] = useState<string>();
    const [messages, setMessages] = useState<Message[]>([]);

    async function handleSubmit(e: any){
        e.preventDefault();

        const newMessageObject = {
            text: newMessageValue,
            createdAt: Timestamp.fromDate(new Date()),
            from: user.id,
            to: otherUser.id
        }
        
        setNewMessageValue('');
        await addDoc(messagesRef, newMessageObject)

        // scroll down the chat
        // if(dummySpace.current !== undefined) {
        //     dummySpace.current.scrollIntoView({ behavor: "smooth" });
        // }
  };


    const receivedMessages = query(messagesRef, where("to", "in", [user.id, otherUser.id]));

    //receivedMessages
    onSnapshot(receivedMessages, (querySnapshot) => {
        let newMessages: Array<Message> = [];
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
 
        const sortedMessages = newMessages.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
        setMessages(sortedMessages);
    });

  return (
    <section id="chat_room" className="flex flex-col">
        <ul className="flex flex-col gap-7 mt-10">
        {messages.map((message: Message) => (
          <li key={message.id}>
            <ChatMessage createdAt={message.createdAt} text={message.text} received={message.to == user.id}/>
          </li>
        ))}
      </ul>


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