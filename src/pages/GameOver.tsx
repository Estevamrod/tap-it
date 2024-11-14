import * as React from 'react';
import  { useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import vm from '../assets/vm.png'
import over from '../styles/GameOver.module.css';
import vmPixel from '../assets/pixelArt_logo.png';
import guy from '../assets/teste.png'

const GameOver: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar dados do localStorage
    const storedScore = parseInt(localStorage.getItem('currentScore') || '0');    
    setScore(storedScore);
    
    // Chamar a função para exibir a mensagem de resultado
  }, []);

  const submitScore = () => {
    if (playerName) {
      // Aqui você pode implementar a lógica para submeter a pontuação
      console.log(`Nome do jogador: ${playerName}`);
      console.log(`Pontuação: ${score}`);
      localStorage.setItem('currentPlayername', playerName);
      navigate('/rankings');
      // Redirecionar ou fazer outra ação após enviar a pontuação
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  return (
      <div className="flex justify-center flex-col items-center">
        <div className="absolute flex justify-center" style={{top:'10%'}}>
          <img className="w-3/6" src={vm} alt="vm" />
        </div>
        <div className={over.yellowCircle}></div>
        <div className="absolute flex justify-center flex-col items-center" style={{}}>
          <p className="text-5xl font-bold mb-2.5 pb-2.5 text-white">Foi bom jogar com você!</p>
          <p className='text-xl font-thin text-white text-start'>Insira seu nome para saber sua posição no ranking.</p>
          <br />
          <div className="container">
            <div className="flex flex-col justify-center mb-10 mt-10">
              <input
                className='rounded-full py-3 px-6 outline-0'
                type="text"
                id="player-name"
                placeholder="Insira seu nome"
                maxLength={14}
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <div className="flex justify-center mt-10">
                <Link to={'/rankings'}>
                  <button 
                  onClick={submitScore}
                  className='mb-10 mb-10 rounded-full items-center text-center text-3xl py-5 px-16 bg-cyan-950 text-white hover:bg-cyan-800'
                  >ENVIAR
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-items-center absolute bottom-40 w-96' style={{right:'57%'}}>
          <img src={vmPixel} className='w-full'/>
        </div>
        <div className="absolute top-2/3" style={{width:'800px', left:'40%'}}>
          <img src={guy} className='w-full -rotate-12'/>
        </div>
      </div> 
  );
}

export default GameOver;