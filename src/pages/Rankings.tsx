import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import vm from '../assets/vm.png';
import vmPixel from '../assets/pixelArt_logo.png';
import homeicon from '../assets/casa.png';
import game from '../styles/Game.module.css'
import ranking from '../styles/Ranking.module.css'

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
    <div>
      <div className='text-center absolute top-1/4' style={{left:'27%'}}>
        <h1 className="text-5xl font-bold text-cyan-800 py-2.5 px-4">Classificação Geral</h1>
      </div>

      <div className="grid grid-cols-2 items-center justify-items-center absolute top-20 left-0">
        <img src={vm} style={{width:'70%'}}/>
        <img src={vmPixel} style={{width:'60%'}}/>
      </div>
      <div className={`${ranking.table} absolute flex flex-col justify-center items-center`} style={{left:"11%"}}>
        <div className={`${ranking.container} ${ranking.podium} mb-10 gap-2.5`}>
          {/* Verifica se há pelo menos 2 jogadores para exibir o pódio */}
          {scores.length > 1 && (
            <div className={ranking.podium__item}>
              <p className={ranking.podium__city}>{scores[1].name}</p>
              <div className={`${ranking.podium__rank} ${ranking.second} rounded-t-3xl text-center p-2.5`}>
                2° Lugar
              </div>
            </div>
          )}
          {scores.length > 0 && (
            <div className={ranking.podium__item}>
              <p className={ranking.podium__city}>{scores[0].name}</p>
              <div className={`${ranking.podium__rank} ${ranking.first} rounded-t-3xl	text-center p-2.5`}>
                1° Lugar
              </div>
            </div>
          )}
          {scores.length > 2 && (
            <div className={`${ranking.podium__item}`}>
              <p className={ranking.podium__city}>{scores[2].name}</p>
              <div className={`${ranking.podium__rank} ${ranking.third} rounded-t-3xl	text-center p-2.5`}>
                3° Lugar
              </div>
            </div>
          )}
        </div>
        {/* Renderizando os jogadores fora do top 3 */}
        {scores.slice(3).map((score, index) => (
          <div className={`${ranking.row} flex justify-between w-full mt-10 text-4xl`} key={index + 3}>
            <div className={ranking.cell}>{index + 4}º</div>
            <div className={ranking.cell}>{score.name}</div>
            <div className={ranking.cell}>{score.score}</div>
          </div>
        ))}
      </div>

      {/* Se o jogador atual estiver acima do 10º lugar, exiba-o separadamente */}
      {currentPlayer && currentPlayerPosition && currentPlayerPosition > 10 && (
        <div className={ranking.currentPlayerSection}>
          <h2>Sua posição:</h2>
          <div className={ranking.row}>
            <div className={ranking.cell}>{currentPlayerPosition}º</div>
            <div className={ranking.cell}>{currentPlayer.name}</div>
            <div className={ranking.cell}>{currentPlayer.score }</div>
          </div>
        </div>
      )}
      <div className='absolute w-24 bg-white py-4 px-4 rounded-3xl items-center hover:bg-slate-50	' style={{bottom:'2%', left:'86%'}}>
        <Link to="/">
          <button>
              <img src={homeicon} alt="Ícone de casa" className='w-full'/>
          </button>
        </Link>
      </div>
    <div className={game.yellowCircle}></div>
    </div>
  );
};

export default Ranking;