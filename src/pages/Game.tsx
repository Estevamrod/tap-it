import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tiles from '../components/pages/Game/Tiles';
import ScoreBar from '../components/pages/Game/ScoreBar';
import ScoreModal from '../components/pages/Game/ScoreModal';
import TimerBar from '../components/pages/Game/Time';
import logo_vm from '../assets/vm.png';
import pixelArt from '../assets/pixelArt_logo.png';
import game from '../styles/Game.module.css';

const generateUniqueIndices = () => {
  const indices = new Set<number>();
  while (indices.size < 3) {
    indices.add(Math.floor(Math.random() * 16));
  }
  return Array.from(indices);
};

const Game: React.FC = () => {
  const [blackSquareIndices, setBlackSquareIndices] = useState<number[]>(generateUniqueIndices());
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    restartGame();
  };

  const restartGame = () => {
    setGameStart(false);
    setScore(0);
    setTimer(10);
    setBlackSquareIndices(generateUniqueIndices());
  };

  useEffect(() => {
    if (gameStart) {
      const gameTimer = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(gameTimer);
      };
    }
  }, [gameStart]);

  useEffect(() => {
    if (timer <= 0) {
      openModal();
      setGameStart(false);
    }
  }, [timer]);

  useEffect(() => {
    if (modalOpen) {
      const redirectTimer = setTimeout(() => {
        navigate('/gameover');
      }, 3500);

      return () => clearTimeout(redirectTimer);
    }
  }, [modalOpen, navigate]);

  const handleSquareClick = (index: number): void => {
    // Iniciar o jogo no primeiro clique
    if (!gameStart) {
      setGameStart(true);
    }

    // Verifica se o índice é um quadrado preto
    if (blackSquareIndices.includes(index)) {
      // Atualiza a pontuação
      setScore((prevScore) => prevScore + 1);
      
      // Gera novo índice para o quadrado preto
      const newBlackSquareIndex = generateUniqueIndex();
      setBlackSquareIndices((prevIndices) => {
        const newIndices = prevIndices.map((oldIndex) => (oldIndex === index ? newBlackSquareIndex : oldIndex));
        return newIndices;
      });
    } else {
      // Adiciona ou remove o índice selecionado
      if (selectedIndices.includes(index)) {
        setSelectedIndices((prevIndices) => prevIndices.filter((selectedIndex) => selectedIndex !== index));
      } else {
        setSelectedIndices((prevIndices) => [...prevIndices, index]);
      }
    }
  };

  const generateUniqueIndex = (): number => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * 16);
    } while (blackSquareIndices.includes(newIndex));
    return newIndex;
  };

  return (
    <div className={game.flexGrow}>
      <div className={game.img_control}>
        <img src={logo_vm} style={{ width: '60%' }} />
        <img src={pixelArt} />
      </div>
      <div className={game.barControl}>
        <ScoreBar score={score} />
        <TimerBar timer={timer} />
      </div>
      <div className='flex justify-center'>
        <div className={game.gameContainer}>
          <div className='grid grid-cols-4'>
            {Array.from(Array(16), (_, index) => (
              <Tiles
                key={index}
                isBlack={blackSquareIndices.includes(index)}
                isSelected={selectedIndices.includes(index)}
                onClick={() => handleSquareClick(index)}
                device={'computer'}
              />
            ))}
          </div>
        </div>
        <ScoreModal
          isOpen={modalOpen}
          onClose={closeModal}
          score={score}
          message ={""}
        />
      </div>
      <div className={game.yellowCircle}></div>
    </div>
  );
};

export default Game;