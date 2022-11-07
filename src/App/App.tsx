import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';

import './App.css';
import { auth, db } from '../firebase-config';

import { Home } from './pages/Home';
import { Recruit } from './pages/Recruit';
import { Team } from './pages/Team';
import { Options } from './pages/Options';
import { Logout } from './pages/Logout';

import { LogIn } from './components/common/LogIn'
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';


export function App() {

  let [isAuthenticating, setIsAuthenticating] = useState(true)
  let [isLoading, setIsLoading] = useState(true)
  let [loadingMsg, setLoadingMsg] = useState('Authenticating')
  let [isAuth, setIsAuth] = useState(false)
  let [remainingRecruits, setRemainingRecruits] = useState(0)
  let [remainingShuffles, setRemainingShuffles] = useState(0)
  let [currentRecruit, setCurrentRecruit] = useState<[string, number[], string] | undefined>()

  // Determine whether user is logged in.
  const authenticate = async () => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms)); 
    await onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuth(true);
      } else {
        // Set default usestates.
        setRemainingRecruits(0)
        setRemainingShuffles(0)
        setCurrentRecruit(undefined)
        setIsAuth(false);
      }
      setIsAuthenticating(false)
      setLoadingMsg("Connecting")
    })
  }
  
  // load data.
  const loadData = async () => {
    if (auth.currentUser) {
      const usersRef = collection(db, "users")
      const usersQuery = query(usersRef, where("userID", "==", auth.currentUser.uid))
      const usersSnap = await getDocs(usersQuery).then()
      const userData = usersSnap.docs.map(doc => ({ ...doc.data() }))[0]
      setRemainingRecruits(userData.remainingRecruits)
      setRemainingShuffles(userData.remainingShuffles)
  
      if (userData.currentRecruit && !currentRecruit) {
        const recruit: [string, number[], string] = [
          userData.currentRecruit[0].name, 
          userData.currentRecruit[1].stats, 
          userData.currentRecruit[2].rarity
        ]
        setCurrentRecruit(recruit)
      }
    }
    setIsLoading(false)
  }

  
  authenticate() // Authenticate.
  if (isAuth) { // If logged in, load user data from db.
    loadData()

  } else if (!isAuthenticating) { // If not logged in. Show login.
    return (
      <div className="Container">
        <LogIn setIsAuth={setIsAuth} />
        <Footer />
    </div>
    )
  } 

  if (isLoading) { // If loading, show loader.
    return (
      <div className="CenterContent">
        <div className="loader-wheel"></div>
        <p className="Subtext">{loadingMsg}</p>
      </div>
    )
  }
  
  // Determine whether user has any remaining recruits, shuffles, or a saved recruit.
  let newRecruits = false
  if (remainingRecruits != 0 || currentRecruit != null) {
    newRecruits = true
  }

  // Render page if logged in.
  return (
    <div className="Container">
      <Navbar newRecruits={newRecruits}/>
      <div className="Page">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/recruit" element={<Recruit currentRecruit={currentRecruit} setCurrentRecruit={setCurrentRecruit} remainingRecruits={remainingRecruits} remainingShuffles={remainingShuffles} setRemainingShuffles={setRemainingShuffles}/>} />
          <Route path="/team" element={<Team />} />
          <Route path="/options" element={<Options />} />
          <Route path="/logout" element={<Logout setLoggedIn={setIsAuth}/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
  
}

export default App;
