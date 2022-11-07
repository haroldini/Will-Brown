
import '../App.css';

import { ButtonShuffle } from '../components/recruit/ButtonShuffle'
import { Stats } from '../components/recruit/Stats'
import { ButtonRecruit } from '../components/recruit/ButtonRecruit'

type RecruitProps = {
  remainingRecruits: number
  remainingShuffles: number
  currentRecruit?: [string, number[], string]
  setRemainingShuffles: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRecruit: React.Dispatch<React.SetStateAction<[string, number[], string] | undefined>>;
}

export function Recruit(props: RecruitProps) {

  let currentRecruit = props.currentRecruit
  let remainingRecruits = props.remainingRecruits
  let remainingShuffles = props.remainingShuffles
  
  // Render page.
  return (
    <div className="CenterContent">
      <ButtonShuffle setRemainingShuffles={props.setRemainingShuffles} setCurrentRecruit={props.setCurrentRecruit} remainingRecruits={remainingRecruits} remainingShuffles={remainingShuffles}/>
      { remainingRecruits != 0 && currentRecruit ? // If current recruit exists, pass to components.
      <div>
        <Stats recruit={currentRecruit} remainingRecruits={remainingRecruits}/>
        <ButtonRecruit currentRecruit={currentRecruit} setCurrentRecruit={props.setCurrentRecruit} remainingRecruits={remainingRecruits} remainingShuffles={remainingShuffles}/>
      </div>
      : // Otherwise dont pass current recruit.
      <div>
        <Stats remainingRecruits={remainingRecruits}/>
        <ButtonRecruit remainingRecruits={remainingRecruits} setCurrentRecruit={props.setCurrentRecruit} remainingShuffles={remainingShuffles}/>
      </div>
      }    
    </div> 
  );
}

export default Recruit;
