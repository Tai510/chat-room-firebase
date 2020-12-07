import React, { useRef, useState } from 'react';
import { firestore, auth } from '../Components/firebase';
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from './ChatMessage';


function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);
  
    const [messages] = useCollectionData(query, { idField: "id" });
  
    const [formValue, setFormValue] = useState("");
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: auth.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });
  
      setFormValue("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
    };
  
    return (
      <div>
        <div className='chat-header'>
        <h1>Sonoma Chat 💬</h1>
        {/* <SignOut /> */}
        </div>
        <main>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
  
          <span ref={dummy}></span>
        </main>
  
        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Enter your message..."
          />
  
          <button type="submit" disabled={!formValue}>
            🦁
          </button>
        </form>
      </div>
    );
  }

export default ChatRoom;
