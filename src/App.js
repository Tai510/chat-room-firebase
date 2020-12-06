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
      <header className="App-header"><h1>Chat Room</h1></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

}

export default App;
