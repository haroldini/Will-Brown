import React from "react"
import { Bar, Bubble } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);
Chart.register(CategoryScale);


type ChartProps = {
    recruit?: [string, number[], string]
    title? : string
    showTitle?: boolean
    animationDuration: number
}

export function getColor (rarity: string): string {
    const colors = ['#f3f3f3', '#82ff75', '#6ddeff', '#7a5bff', '#ff7777'];
    switch (rarity) {
        case "common":
            return colors[0];
        case "uncommon":
            return colors[1];
        case "rare":
            return colors[2];
        case "epic":
            return colors[3];
        case "legendary":
            return colors[4];
        default:
            return colors[5]
    }
};


export function RecruitChart (props: ChartProps) {

    // Default no data.
    let stats = [0, 0, 0, 0, 0, 0]
    let rarity = "common"

    let name = "No Current Recruit"
    let showTitle = true
    if (props.showTitle!=undefined) {
        console.log("showtitle is defined")
        showTitle = props.showTitle
    }
    if (showTitle) {
        if (props.title) {
            name = props.title
        } else if (props.recruit) {
            name = props.recruit[0]
        }
    }

    if (props.recruit) {
        stats = props.recruit[1]
        rarity = props.recruit[2]
    }


    const chartData = {
        labels: ['Strength', 'Dexterity', 'Intelligence', 'Constitution', 'Wisdom', 'Charisma'],
        datasets: [
            {
                label: '',
                data: stats,
                backgroundColor: ['#ff7777', '#ffde77', '#6ddeff', '#82ff75', '#7a5bff', '#d276ff'],
                borderRadius: 5,
                borderWidth: 0,
                datalabels: {
                    color: '#ffffff',
                    
                }
            }
        ]
    }
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: props.animationDuration,
        },
        
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                anchor: "end" as "end",
                align: "top" as "top",
                display: 'auto',
                clamp: true,
                font: {
                    size: 18,
                    family: 'Sniglet',
                    weight: 'bold',
                } as object
            },
            tooltip: {
                enabled: true,
                displayColors: false,
                displayBody: false,
                backgroundColor: '#ffffff',
                cornerRadius: 10,
                caretSize: 0,
                titleAlign: 'center' as 'center',
                titleColor: '#262626',
                titleFont: {
                    size: 18,
                    weight: 'bold',
                    family: 'Sniglet'
                },
                bodyAlign: 'center' as 'center',
                bodyColor: '#262626',
                bodyFont: {
                    size: 16,
                    weight: 'bold',
                    family: 'Sniglet'
                },
            },
    },
        scales: {
            y: {
                min: 0,
                max: 45,
                grid: {
                    drawBorder: false,
                    display: false,
                    color: "#474747"
                },
                ticks: {
                    display: false,
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false,
                }
            }
        },       
    }
    return (
        <div className="PadVertical PadHorizontal" style={{'paddingRight': '1.3rem'}}>
            {
                showTitle
                    ? <h1 className="Titletext" id="statsName" style={{color: `${getColor(rarity)}`}}>{name}</h1>
                    : <></>
            }
            <div className="Chart">
                <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="Icons">
                <img className="Icon" src="/images/icostr.png" />
                <img className="Icon" src="/images/icodex.png" />
                <img className="Icon" src="/images/icoint.png" />
                <img className="Icon" src="/images/icocon.png" />
                <img className="Icon" src="/images/icowis.png" />
                <img className="Icon" src="/images/icocha.png" />
            </div>
        </div>
    )
}