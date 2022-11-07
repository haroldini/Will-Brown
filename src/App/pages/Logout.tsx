import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

import '../App.css';

type LogoutProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Logout(props: LogoutProps) {
  
  let navigate = useNavigate()

  // Logout function.
  const logoutHandler = () => {
    console.log("logging out")
    signOut(auth).then(() => {
      navigate("/")
      console.log("logged out")
      props.setLoggedIn(false);
    }).catch((error) => {
      console.log(error)
    });
   };

  // Render page.
  return (
    <div className="CenterContent">
      <p className="Component Titletext MarginVertical">Logged in as {auth.currentUser?.displayName}.</p>
      <div className="Component Outline ButtonHover">
        <button className="Input InputHover Titletext"
        onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
}

export default Logout;
