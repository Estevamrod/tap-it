import * as React from "react";
import './style/style.css'

type LoadingProps = {
  isOpen: boolean;
};

const Loading: React.FC<LoadingProps> = ({ isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center m-0 select-none bg-gray-800 bg-opacity-75'>
      <div className='flex flex-col items-center p-4 h-32 overflow-visible'> {/* Aumentando a altura */}
        <div className='flex space-x-2'>
          <div className='w-6 h-6 rounded-full bg-white animate-custom-bounce'></div>
          <div className='w-6 h-6 rounded-full bg-white animate-custom-bounce delay-200'></div>
          <div className='w-6 h-6 rounded-full bg-white animate-custom-bounce delay-400'></div>
        </div>
        <span className='text-white mt-2 p-2' style={{ fontSize: "10px" }}>Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;