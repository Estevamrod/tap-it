import * as React from "react"; 
import {useEffect} from 'react';

type ScoreProps = {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  message: string;
};

const Modal: React.FC<ScoreProps> = ({
  isOpen,
  score,
}) => {
  
    useEffect(() => {
      if (score) {
        localStorage.removeItem('currentPlayername');
        localStorage.setItem('currentScore', score.toString());
      }
    }, [score]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center m-2 select-none'>
      <div className='fixed inset-0 bg-neutral-900 opacity-75'></div>
      <div className='relative bg-neutral-900 p-8 w-full max-w-sm mx-auto rounded border'>
        <div className='flex flex-col gap-4'>
          <div style={{display:'flex', justifyContent:"space-around", padding:"4px", marginTop:"6px", gap:"6px", flexDirection:"column", alignItems:"center"}}>
            <span>Sua pontuação foi:</span>
            <div>
              <p>Score:</p>
              <span className='text-4xl font-semibold'>{score}</span>
            </div>
          </div>
          <span style={{fontSize: "10px"}}>Redirecionando...</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
