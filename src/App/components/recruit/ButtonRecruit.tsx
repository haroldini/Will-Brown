import React from "react";
import { addDoc, collection, where, query, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../../firebase-config";
import { generateRecruit } from './Names';

type ButtonRecruitProps = {
    remainingRecruits: number
    remainingShuffles: number
    currentRecruit?: [string, number[], string]
    setCurrentRecruit: React.Dispatch<React.SetStateAction<[string, number[], string] | undefined>>;
}

export const ButtonRecruit = (props: ButtonRecruitProps) => {

    function ButtonRecruitHandler(): void {

        // Shake button if no recruits remaining or currentrecruit does not exist.
        if (props.remainingRecruits==0 || props.currentRecruit==null) {
            let recruitButtonElement = (document.getElementById("recruitButton") as HTMLFormElement)
            recruitButtonElement.classList.add("wobbleOnClick")
            setTimeout(() => {
                recruitButtonElement.classList.remove("wobbleOnClick")
            }, 200)
        }

        const dbUpdater = async () => {

            // If current recruit exists, and user is authenticated.
            const currentUser = auth.currentUser
            if (props.currentRecruit && currentUser) {

                // Reduce remainingrecruits in userdoc by 1 and replace currentrecruit.
                const usersRef = await collection(db, "users")
                const usersQuery = query(usersRef, where("userID", "==", currentUser.uid))
                const usersSnap = await getDocs(usersQuery)
                const userDocID = usersSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0].id
                const userRef = doc(db, "users", userDocID)
                await updateDoc(userRef, {
                    remainingRecruits: props.remainingRecruits-1,
                    remainingShuffles: 6,
                    currentRecruit: null,
                    lastUpdate: serverTimestamp(),
                })

                // Add new recruit to recruits collection.
                const recruitsRef = await collection(db, "recruits")
                await addDoc(recruitsRef, {
                    name: props.currentRecruit[0],
                    stats: props.currentRecruit[1],
                    rarity: props.currentRecruit[2],
                    ownerUserID: currentUser.uid,
                    createdAt: serverTimestamp(),
                    lastUpdate: serverTimestamp(),
                })          

                // Reset currentrecruit.
                await props.setCurrentRecruit(undefined)
                console.log("New recruit generated, set as currentrecruit:")
            }
        }
        dbUpdater()
    }

    return (
        <div className="Component Outline ButtonHover MarginVertical"  id="recruitButton">
            <button className={ props.remainingRecruits == 0 || props.currentRecruit == null
                ? "Input InputHover noneLeft"
                : props.remainingShuffles > 0 
                ? "Input InputHover" 
                : "Input InputHover FlashingBG"} onClick={ButtonRecruitHandler}>
                <p className="Titletext">Claim Recruit</p>
                <p className="Subtext">({props.remainingRecruits} Remaining)</p>
            </button>
        </div>
    )
}