import React from "react";
import "./App.css";
import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";
import ChatRoom from "./Components/ChatRoom";

import { auth } from "./Components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {/* <header>
        <h1>Sonoma Chat 💬</h1>
        <SignOut />
      </header> */}

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
