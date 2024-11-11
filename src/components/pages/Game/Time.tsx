import * as React from 'react'

type TimerProps = {
    timer: number;
}

const TimerBar: React.FC<TimerProps> = ({timer}) => {
    return(
    <div style={{display:"flex", alignItems:"center", justifyContent: "center", padding: "6px"}}>
        <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <p style={{color:"#9B9B9B", fontSize:'40px'}}>TEMPO</p> <span className='text-lg font-semibold' style={{color:"#E64A33", fontSize:"89px", padding:"22px"}}>{timer}</span>
        </div>
    </div>
    )
} 

export default TimerBar;