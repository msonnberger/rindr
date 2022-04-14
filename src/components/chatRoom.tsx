import { useEffect, useRef, useState } from "react";
import { addDoc, collection, getDocs, Timestamp, onSnapshot, doc, query, where } from "firebase/firestore";
import { formatRelative } from "date-fns";

interface User {
    name: string
}
interface ChatRoomProps {
    user: User,
    database: any,
    otherUser: User
}
interface Message {
    id: string,
    text: string,
    from: string,
    createdAt: Timestamp,
    to: string
}

export default function ChatRoom({user, database, otherUser}: ChatRoomProps) {
    const db = database;
    const { name } = user;

    const dummySpace = useRef()

    const [newMessageValue, setNewMessageValue] = useState<string>();
    const [messages, setMessages] = useState<Message[]>([]);

    async function handleSubmit(e: any){
        e.preventDefault();

        const newMessageObject = {
            text: newMessageValue,
            createdAt: Date.now(),
            from: user.name,
            to: otherUser.name
        }
        
        await addDoc(collection(db, 'messages'), newMessageObject)

        setNewMessageValue('');
        

        // scroll down the chat
        // if(dummySpace.current !== undefined) {
        //     dummySpace.current.scrollIntoView({ behavor: "smooth" });
        // }
  };



    const q = query(collection(db, "messages"), where("to", "==", "someone"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newMessages: Array<Message> = [];
        querySnapshot.forEach((doc) => {
            newMessages.push({
              id: doc.id,
              text: doc.data().text,
              createdAt: doc.data().createdAt,
              from: doc.data().from,
              to: doc.data().to
            });
        });
        const filteredMessages = newMessages.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
        setMessages(filteredMessages);
    });

    function compare( a: Message, b: Message) {
        if ( a.createdAt < b.createdAt ){
            return -1;
        }
        if ( a.createdAt > b.createdAt ){
            return 1;
        }
        return 0;
    }



  return (
    <main id="chat_room">
        <ul>
        {messages.map((message: Message) => (
          <li key={message.id}>
            <section>
              <p>{message.text}</p>

              {message.from ? <span className="bg-sky-300">{message.from}</span> : null}
              <br />
              {message.createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(message.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
            </section>
          </li>
        ))}
      </ul>


      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessageValue}
          onChange={(e) => setNewMessageValue(e.target.value)}
          placeholder="Type your message here..."
        />

        <button type="submit" disabled={!newMessageValue}>
          Send
        </button>
      </form>
    </main>
  );
}