import * as React from 'react';
import { useState } from 'react';

type TileProps = {
  device: string;
  isBlack: boolean;
  isSelected: boolean;
  onClick?: () => void;
  className?: string; // Adicionando uma nova propriedade para classes personalizadas
};

const Tiles: React.FC<TileProps> = ({ device, isBlack, onClick, className }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isBlack) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 200);
    }

    if (onClick) {
      onClick();
    }
  };

  const baseClasses = `relative ${isBlack ? 'bg-cyan-950' : isClicked ? 'bg-red-500' : 'bg-white'} flex items-center justify-center cursor-crosshair select-none touch-none border duration-100 ${className}`;
  
  const tileSize = 'w-40 h-40'; // Aumentei o tamanho dos tiles para 40x40

  if (device === 'Mobile') {
    return (
      <div
        className={`${baseClasses} ${tileSize} md:w-48 md:h-48`} // Aumentei para 48 em dispositivos maiores
        onTouchStart={handleClick}
      >
        <div className='absolute w-full h-full bg-white rounded-full opacity-0 pointer-events-none'></div>
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${tileSize} md:w-48 md:h-48`} // Aumentei para 48 em dispositivos maiores
      onMouseDown={handleClick}
    >
      <div className='absolute w-full h-full bg-white rounded-full opacity-0 pointer-events-none'></div>
    </div>
  );
};

export default Tiles;