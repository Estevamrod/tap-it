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
        <p>Score:</p> <span className='text-lg font-semibold'>{score}</span>
      </div>
    </div>
  );
};

export default ScoreBar;
