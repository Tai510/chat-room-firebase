import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

require('dotenv').config()


const app = firebase.initializeApp({
    apiKey: `AIzaSyDTV3eQbTGtqg3IJJSXKZBCDcX5-yE4PX8`,
    authDomain: "my-chat-room-44641.firebaseapp.com",
    projectId: "my-chat-room-44641",
    storageBucket: "my-chat-room-44641.appspot.com",
    messagingSenderId: "1021091406342",
    appId: "1:1021091406342:web:0c7120802c5e10ea959987",
  });

  // const app = firebase.initializeApp({
  //   apiKey: `${process.env.API_KEY}`,
  //   authDomain: `${process.env.AUTH_DOMAIN}`,
  //   projectId: `${process.env.PROJECT_ID}`,
  //   storageBucket: `${process.env.STORAGE_BUCKET}`,
  //   messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
  //   appId: `${process.env.APP_ID}`,
  // });

  export const auth = app.auth();
  const firestore = app.firestore();
  export default app;
  export { firestore };

