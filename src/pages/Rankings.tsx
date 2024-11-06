import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css'; // Certifique-se de que a folha de estilo esteja no mesmo diretório ou ajuste o caminho conforme necessário.
import Logo1 from '../assets/logo.png';
import casa from '../assets/casa.png';
import Logo2 from '../assets/logovm.png';

interface Score {
  name: string;
  score: number;
}

const Ranking: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<{ name: string; score: number } | null>(null);
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState<number | null>(null);

  useEffect(() => {
    // Função para carregar os scores do localStorage
    const loadScores = () => {
      const storedScores = JSON.parse(localStorage.getItem('scores') || '[]') as Score[];
      const sortedScores = storedScores.sort((a, b) => b.score - a.score);
      const top10Scores = sortedScores.slice(0, 10);
      setScores(top10Scores);

      // Verifica se há um jogador atual
      const currentPlayerName = localStorage.getItem('currentPlayername');
      const currentPlayerScore = parseInt(localStorage.getItem('currentScore') || '0', 10);

      if (currentPlayerName && !isNaN(currentPlayerScore) && currentPlayerScore > 0) {
        setCurrentPlayer({ name: currentPlayerName, score: currentPlayerScore });

        // Verifica a posição do jogador atual no ranking completo
        const playerIndex = sortedScores.findIndex(score => score.name === currentPlayerName && score.score === currentPlayerScore);
        setCurrentPlayerPosition(playerIndex + 1); // Adiciona 1 para converter de índice para posição
      }
    };

    // Função para adicionar o jogador ao ranking
    const addPlayerToRanking = () => {
      const playerName = localStorage.getItem('currentPlayername');
      const playerScore = parseInt(localStorage.getItem('currentScore') || '0', 10);

      if (playerName && !isNaN(playerScore) && playerScore > 0) {
        const storedScores = JSON.parse(localStorage.getItem('scores') || '[]') as Score[];

        // Verifica se o jogador já está no ranking para evitar duplicatas
        const playerIndex = storedScores.findIndex(score => score.name === playerName && score.score === playerScore);
        if (playerIndex === -1) {
          storedScores.push({ name: playerName, score: playerScore });
          const sortedScores = storedScores.sort((a, b) => b.score - a.score);
          localStorage.setItem('scores', JSON.stringify(sortedScores));
        }
      }
    };

    // Adiciona o jogador ao ranking e carrega os scores
    addPlayerToRanking();
    loadScores();

    // Limpa os dados do jogador atual
    localStorage.removeItem('currentPlayername');
    localStorage.removeItem('currentScore');
  }, []);

  return (
    <div className="container">
      <div className="text-circle">
        <p>JOGO DA<br />MEMÓRIA</p>
      </div>

      <div className="logo">
        <img className="logo1" src={Logo1} alt="Logo 1" />
        <img className="logo2" src={Logo2} alt="Logo 2" />
      </div>

      <h1 className="titulo">CLASSIFICAÇÃO</h1>

      <div className="table">
        {scores.map((score, index) => (
          <div className="row" key={index}>
            <div className="cell">{index + 1}º</div>
            <div className="cell">{score.name}</div>
            <div className="cell">{score.score}</div>
          </div>
        ))}
      </div>

      {/* Se o jogador atual estiver acima do 10º lugar, exiba-o separadamente */}
      {currentPlayer && currentPlayerPosition && currentPlayerPosition > 10 && (
        <div className="current-player-section">
          <h2>Sua posição:</h2>
          <div className="row">
            <div className="cell">{currentPlayerPosition}º</div>
            <div className="cell">{currentPlayer.name}</div>
            <div className="cell">{currentPlayer.score }</div>
          </div>
        </div>
      )}

      <button className="return-button">
        <Link to="/">
          <img src={casa} alt="Ícone de casa" />
        </Link>
      </button>
    </div>
  );
};

export default Ranking;