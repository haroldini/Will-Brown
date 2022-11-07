import React, { useState } from 'react';
import { RecruitChart, getColor } from '../common/RecruitChart';

type TeamListProps = {
    team?: any[]
}

export const TeamList = (props: TeamListProps) => {
    let team = []
    let exists = false
    if (props.team) {
        team = props.team
        exists = true
    }

    team.forEach(function(value) {
        //console.log(value.name)
    })

    //console.log(team.map(value => (value.name)))

    
    return (
        <div>
        {(() => {
            if (team) {
                let chartIds = Array.from({ length: 10 }, (_, i) => i+1)

                return (
                    team.length >0 && team.map((value, i) => 
                        <div className="MarginVertical" key={i}>
                            <div className="Component Outline TeamListRecruitButtons" id={"button"+chartIds[i].toString()}>
                                <button className="Input InputHover Titletext " style={{"color": getColor(value.rarity)}}
                                    onClick={(e) => {
                                        let recruitChart = document.getElementById("chart"+chartIds[i].toString()) as HTMLInputElement
                                        let recruitButton = document.getElementById("button"+chartIds[i].toString()) as HTMLInputElement
                                        
                                        let recruitButtons = Array.from(document.getElementsByClassName("TeamListRecruitButtons") as HTMLCollectionOf<Element>)
                                        let recruitCharts = Array.from(document.getElementsByClassName("TeamListRecruitCharts") as HTMLCollectionOf<Element>)

                                        if (recruitChart.style.display === "none") {
                                            recruitCharts.forEach((element) => {
                                                if (!(element instanceof HTMLElement)) {
                                                    return
                                                }
                                                element.style.display = "none";
                                                element.classList.remove("NoBorderBottom")
                                                element.classList.remove("NoBorderTop")
                                            })
                                            recruitButtons.forEach((element) => {
                                                if (!(element instanceof HTMLElement)) {
                                                    return
                                                }
                                                element.style.borderBottom = "4px solid var(--white)"
                                                element.classList.remove("NoBorderBottom")
                                                element.classList.remove("NoBorderTop")
                                            })
                                            recruitChart.style.display = "inline-block";
                                            recruitButton.classList.add("NoBorderBottom")
                                            recruitChart.classList.add("NoBorderTop")
                                            
                                        } else {
                                            recruitCharts.forEach((element) => {
                                                if (!(element instanceof HTMLElement)) {
                                                    return
                                                }
                                                element.style.display = "none";
                                                element.classList.remove("NoBorderBottom")
                                                element.classList.remove("NoBorderTop")
                                            })
                                            recruitButtons.forEach((element) => {
                                                if (!(element instanceof HTMLElement)) {
                                                    return
                                                }
                                                element.style.borderBottom = "4px solid var(--white)"
                                                element.classList.remove("NoBorderBottom")
                                                element.classList.remove("NoBorderTop")
                                            })
                                            recruitChart.style.display = "none";
                                            recruitButton.classList.remove("NoBorderBottom")
                                            recruitChart.classList.remove("NoBorderTop")
                                            recruitButton.style.borderBottom = "4px solid var(--white)"


                                        
                                        } }}>{value.name}
                                </button>
                            </div>
                            <div className='Component Outline TeamListRecruitCharts' style={{"display":"none"}} id={"chart"+chartIds[i].toString()}>
                                <RecruitChart recruit={[value.name, value.stats, value.rarity]} title="" animationDuration={0} />
                            </div>
                        </div>

                    )
                )
            } else {
                return (
                    <p className="Subtext">Your team is empty.</p>
                )
            }
        })()}
        </div>
    )
}