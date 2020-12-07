import React from "react";
import { auth } from "./firebase";

function ChatMessage(props) {
  const { text, uid, photoURL, user } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <div className="user-div">
          <img
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
          />
        </div>
        <div className='message-div'>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
