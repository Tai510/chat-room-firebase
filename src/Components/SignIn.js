import React from "react";
import firebase from "firebase/app";
import { auth } from "./firebase";
import { FcGoogle } from "react-icons/fc";

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        <FcGoogle /> Sign in with Google
      </button>
      {/* <button className="sign-in" onClick={signInWithFacebook}>
        <FcGoogle /> Sign in with Facebook
      </button> */}
    </>
  );
}

export default SignIn;
