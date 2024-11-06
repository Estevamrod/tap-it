import * as React from 'react';
import  { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Logo1 from '../assets/logo.png'
import Logo2 from '../assets/logovm.png'

const GameOver: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [gameOverText, setGameOverText] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar dados do localStorage
    const storedScore = parseInt(localStorage.getItem('currentScore') || '0');    
    setScore(storedScore);
    
    // Chamar a função para exibir a mensagem de resultado
    displayGameResult();
  }, []);

  const displayGameResult = () => {
      setGameOverText("Foi muito bom jogar com você!!!");
  };

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
    <div>
      <div className="text-circle">
        <p>JOGO DA<br />MEMÓRIA</p>
      </div>

      <div className="logo">
        <img className="logo1" src={Logo1} alt="Logo 1" />
        <img className="logo2" src={Logo2} alt="Logo 2" />
      </div>

      <div className="game-over-screen">
        <h1 id="game-over-text">{gameOverText}</h1>
        <h1 id="sub-text">Foi bom jogar com você!</h1>
        <p id="orientation-text">Insira seu nome para saber sua posição no ranking.</p>
        <br />
        <div className="container">
          <div className="input-nome">
            <input
              type="text"
              id="player-name"
              placeholder="Insira seu nome"
              maxLength={14}
              required
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={submitScore}>ENVIAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameOver;