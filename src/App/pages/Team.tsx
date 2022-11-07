import React, { useState } from 'react';
import { TeamList } from '../components/team/TeamList';
import { auth, db } from '../../firebase-config'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import '../App.css';


export function Team() {

  let [team, setTeam] = useState<[]>()

  const fetchTeam = async () => {
      if (auth.currentUser) {
          const recruitsRef = collection(db, "recruits")
          const recruitsQuery = query(recruitsRef, where("ownerUserID", "==", auth.currentUser.uid))
          const recruitsSnap = await getDocs(recruitsQuery).then()
          const recruitsData = recruitsSnap.docs.map(recruit => recruit.data()) as []
          if (!team) {
              setTeam(recruitsData)
          }

      }
  }

  fetchTeam()

  // Render page.
  return (
    <div className="CenterContent">
      <div className="Component  MarginVertical">
        <p className="Titletext">
            Your Team
        </p>
        <p className="Subtext">You have {team?.length} recruits</p>
      </div>
      {
        team==undefined
        ? <></>
        : <TeamList team={team}/>
      }
    </div>
  );
}

export default Team;
