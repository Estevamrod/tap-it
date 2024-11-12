import * as React from 'react';

type ScoreBarProps = {
  score: number;
};

const ScoreBar: React.FC<ScoreBarProps> = ({
  score
}) => {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent: "center", padding: "6px"}}>
      <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
        <p style={{color:"#9B9B9B", fontSize:'40px'}}>SCORE</p> <span className='text-lg font-semibold' style={{color:"#28BA99", fontSize:"89px", padding:"22px"}}>{score}</span>
      </div>
    </div>
  );
};

export default ScoreBar;
