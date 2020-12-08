import React, { useRef, useState } from 'react';
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDTV3eQbTGtqg3IJJSXKZBCDcX5-yE4PX8",
  authDomain: "my-chat-room-44641.firebaseapp.com",
  projectId: "my-chat-room-44641",
  storageBucket: "my-chat-room-44641.appspot.com",
  messagingSenderId: "1021091406342",
  appId: "1:1021091406342:web:0c7120802c5e10ea959987",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Sonoma Chat Room 💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

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
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Write somthing..."
        />

        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

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
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;










// import React from "react";
// import "./App.css";
// import SignIn from "./Components/SignIn";
// import SignOut from "./Components/SignOut";
// import ChatRoom from "./Components/ChatRoom";

// import { auth } from "./Components/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// function App() {
//   const [user] = useAuthState(auth);

//   return (
//     <div className="App">
//       {/* <header>
//         <SignOut />
//       </header> */}
//       <section>{user ? <ChatRoom /> : <SignIn />}</section>
//     </div>
//   );
// }

// export default App;
