import React from "react"
import { RecruitChart } from '../common/RecruitChart'


type StatsProps = {
    recruit?: [string, number[], string],
    remainingRecruits: number
}


export function Stats (props: StatsProps) {
    if (props.remainingRecruits==0)
    {
        return (<div className="Component Outline MarginVertical">
                    <RecruitChart recruit={props.recruit} title={"0 Recruits Remaining."} animationDuration={750} />
                </div>)
    } else {
        return (<div className="Component Outline MarginVertical">
                    <RecruitChart recruit={props.recruit} animationDuration={750} />
                </div>)
    }
}
