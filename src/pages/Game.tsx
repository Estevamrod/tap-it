import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tiles from '../components/pages/Game/Tiles';
import ScoreBar from '../components/pages/Game/ScoreBar';
import ScoreModal from '../components/pages/Game/ScoreModal';
import TimerBar from '../components/pages/Game/Time';
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
    if (!gameStart) {
      setGameStart(true);
    }

    if (selectedIndices.includes(index)) {
      setSelectedIndices((prevIndices) => prevIndices.filter((selectedIndex) => selectedIndex !== index));
    } else {
      setSelectedIndices((prevIndices) => [...prevIndices, index]);
    }

    if (blackSquareIndices.includes(index)) {
      const newIndices = blackSquareIndices.map((oldIndex) => {
        if (oldIndex === index) {
          return generateUniqueIndex();
        }
        return oldIndex;
      });
      setBlackSquareIndices(newIndices);
      setScore((prevScore) => prevScore + 1);
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
          message={""}
        />
      </div>
      <div className={game.yellowCircle}></div>
    </div>
  );
};

export default Game;