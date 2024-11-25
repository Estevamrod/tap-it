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
      <div className='text-center absolute' style={{left:'27%', top:'15%'}}>
        <h1 className="text-5xl font-bold text-cyan-800 py-2.5 px-4">Classificação Geral</h1>
      </div>

      <div className="grid grid-cols-2 items-center justify-items-center absolute top-0 left-0">
        <img src={vm} style={{width:'70%'}}/>
        <img src={vmPixel} style={{width:'60%'}}/>
      </div>
      <div className={`${ranking.table} absolute flex flex-col justify-center items-center`} style={{left:"11%",top:"16%"}}>
        <div className={`${ranking.container} ${ranking.podium} mb-10 gap-2.5`}>
          {/* Verifica se há pelo menos 2 jogadores para exibir o pódio */}
          {scores.length > 1 && (
            <div className={ranking.podium__item}>
              <p className={`${ranking.podium__city} text-4xl`}>{scores[1].name}</p>
              <div className={`${ranking.podium__rank} ${ranking.second} rounded-t-3xl text-center p-2.5 flex justify-center items-center flex-col`}>
                2° Lugar
                <p className='text-4xl mt-10'>Pts - {scores[1].score}</p>
              </div>
            </div>
          )}
          {scores.length > 0 && (
            <div className={ranking.podium__item}>
              <p className={`${ranking.podium__city} text-4xl`}>{scores[0].name}</p>
              <div className={`${ranking.podium__rank} ${ranking.first} rounded-t-3xl	text-center p-2.5 flex justify-between items-center flex-col`}>
                1° Lugar
                <p className='text-4xl mt-14'>Pts - {scores[0].score}</p>
              </div>
            </div>
          )}
          {scores.length > 2 && (
            <div className={`${ranking.podium__item}`}>
              <p className={`${ranking.podium__city} text-4xl`}>{scores[2].name}</p>
              <div className={`${ranking.podium__rank} ${ranking.third} rounded-t-3xl	text-center p-2.5 flex justify-center items-center flex-col`}>
                3° Lugar
                <p className='text-4xl mt-5'>Pts - {scores[2].score}</p>
              </div>
            </div>
          )}
        </div>
        <div className="h-auto p-10" style={{width:'90%', backgroundColor:"#0087DA", zIndex:'2', borderRadius:'20px', boxShadow: "29px 0px 0px 0px rgb(0 77 125)"}}>
        {/* Renderizando os jogadores fora do top 3 */}
        {scores.slice(3).map((score, index) => (
          <div className={`${ranking.row} flex justify-between w-full mt-10 mb-10 text-4xl`} key={index + 3} style={{borderBottom:'2px solid black'}}>
            <div className={ranking.cell}>
              <p className='text-white'>{index + 4}º</p>
            </div>
            <div className={ranking.cell}>
              <p className='text-white'>{score.name}</p>
            </div>
            <div className={ranking.cell}>
              <p className='text-white'>{score.score}</p>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Se o jogador atual estiver acima do 10º lugar, exiba-o separadamente */}
      {currentPlayer && currentPlayerPosition && currentPlayerPosition > 10 && (
        <div className={`${ranking.currentPlayerSection} text-4xl`} style={{backgroundColor:"#0087DA", padding:'20px', borderRadius:"23px", width:"69%", boxShadow: "rgb(0, 77, 125) 20px 0px 0px 0px", position:"absolute", left:'14%'}}>
          <div className='flex justify-center' style={{fontSize:'40px', marginBottom:'10px'}}>
            <h2 className='text-white'>Sua posição</h2>
          </div>
          <div className={`${ranking.row} w-full flex justify-between`}>
            <div className={ranking.cell}>
              <p className='text-white'>{currentPlayerPosition}º</p>
            </div>
            <div className={ranking.cell}>
              <p className='text-white'>{currentPlayer.name}</p>
            </div>
            <div className={ranking.cell}>
              <p className='text-white'>{currentPlayer.score}</p>
            </div>
          </div>
        </div>
      )}
      <div className='absolute w-24 bg-white py-4 px-4 rounded-3xl items-center hover:bg-slate-50	' style={{bottom:'6%', left:'86%'}}>
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