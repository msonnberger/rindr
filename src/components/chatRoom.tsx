import { useEffect, useRef, useState } from "react";
import { addDoc, collection, getDocs, Timestamp, onSnapshot, doc, query, where } from "firebase/firestore";
import { formatRelative } from "date-fns";

interface User {
    name: string
}
interface ChatRoomProps {
    user: User,
    database: any
}
interface Message {
    id: number,
    text: string,
    from: string,
    createdAt: Timestamp,
    to: string
}

export default function ChatRoom({user, database}: ChatRoomProps) {
    const db = database;
    const { name } = user;

    const dummySpace = useRef();

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    async function handleSubmit(e: any){
        e.preventDefault();

        const newMessageObject = {
            text: newMessage,
            createdAt: Date.now(),
            from: user.name,
            to: "someone"
        }
        
        await addDoc(collection(db, 'messages'), newMessageObject)

        setNewMessage("");
        

        // scroll down the chat
        // if(dummySpace.current !== undefined) {
        //     dummySpace.current.scrollIntoView({ behavor: "smooth" });
        // }
  };



    const q = query(collection(db, "messages"), where("to", "==", "someone"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newMessages: Array<object> = [];
        querySnapshot.forEach((doc) => {
            newMessages.push({...doc.data()});
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
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />

        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form>
    </main>
  );
}