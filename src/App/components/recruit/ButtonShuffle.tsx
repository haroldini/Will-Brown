import React, { useEffect, useState } from 'react';
import { generateRecruit } from './Names';
import { addDoc, collection, where, query, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../../firebase-config";

type ButtonShuffleProps = {
    remainingShuffles: number
    remainingRecruits: number
    setRemainingShuffles: React.Dispatch<React.SetStateAction<number>>;
    setCurrentRecruit: React.Dispatch<React.SetStateAction<[string, number[], string] | undefined>>;
}

export const ButtonShuffle = (props: ButtonShuffleProps) => {

  function ButtonShuffleHandler(): void {

    if (props.remainingShuffles==0 || props.remainingRecruits==0) { // None remaining, shake button
      let shuffleButtonElement = (document.getElementById("shuffleButton") as HTMLFormElement)
      shuffleButtonElement.classList.add("wobbleOnClick")
      setTimeout(() => {
        shuffleButtonElement.classList.remove("wobbleOnClick")
      }, 200)

    } else { // At least 1 remaining, generate new user, update db, update client.

      const currentUser = auth.currentUser
      const newRecruit: [string, number[], string] = generateRecruit();
  
      const currentRecruit = [
        { name: newRecruit[0] },
        { stats: newRecruit[1] },
        { rarity: newRecruit[2] }
      ]
      const dbUpdater = async () => {
        
        // Get userdoc.
        const usersRef = await collection(db, "users")
        const usersQuery = query(usersRef, where("userID", "==", currentUser?.uid))
        const usersSnap = await getDocs(usersQuery)
        const userDocID = usersSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0].id
        
        // Update userdoc with new currentrecruit
        const userRef = doc(db, "users", userDocID)
  
        await updateDoc(userRef, {
          currentRecruit: currentRecruit,
          remainingShuffles:props.remainingShuffles-1,
          lastUpdate: serverTimestamp(),
        })
  
        // Update currentRecruit prop to update graph on screen.
        await props.setCurrentRecruit(newRecruit)
        console.log("New recruit generated, set as currentrecruit:", newRecruit)
      }
  
      dbUpdater()
    }
  }

  return (
      <div className="Component Outline ButtonHover MarginVertical" id="shuffleButton">
        <button className={ props.remainingRecruits == 0 || props.remainingShuffles == 0
          ? "Input InputHover noneLeft"
          : props.remainingShuffles == 6
          ? "Input InputHover FlashingBG"
          : "Input InputHover"} onClick={ButtonShuffleHandler}>
          
            {
              props.remainingRecruits == 0
              ? <div><p className="Titletext">Generate Recruit</p>
                <p className="Subtext">({props.remainingRecruits} Remaining)</p></div>
              : props.remainingShuffles==6
              ? <div><p className="Titletext">Generate Recruit</p>
                <p className="Subtext">({props.remainingRecruits} Remaining)</p></div>
              : <div><p className="Titletext">Shuffle Recruit</p>
                <p className="Subtext">({props.remainingShuffles} Remaining)</p></div>
            }
          
          
        </button>
      </div>
  )
}