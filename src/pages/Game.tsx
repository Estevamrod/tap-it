import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import Tiles from '../components/pages/Game/Tiles';
import ScoreBar from '../components/pages/Game/ScoreBar';
import ScoreModal from '../components/pages/Game/ScoreModal';
import * as React from 'react';

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
  const [combo, setCombo] = useState(0);
  const [multiPts, setMultiPts] = useState(5);
  const [timer, setTimer] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [device, setDevice] = useState('');
  const navigate = useNavigate(); // Inicializando o useNavigate

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
    setCombo(0);
    setMultiPts(5);
    setTimer(10);
    setBlackSquareIndices(generateUniqueIndices());
  };

  // Start the timer when a tile is clicked
  useEffect(() => {
    if (gameStart) {
      // Identify user device
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        setDevice('Mobile');
      } else {
        setDevice('PC');
      }

      // Setup game timer
      const gameTimer = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      const multiplierTimer = setInterval(() => {
        setMultiPts((prevMultiPts) => {
          if (prevMultiPts > 5) {
            return prevMultiPts - 1;
          }
          return prevMultiPts;
        });
      }, 350);

      return () => {
        clearInterval(gameTimer);
        clearInterval(multiplierTimer);
      };
    }
  }, [gameStart]);

  // Handle game over when timer reaches 0
  useEffect(() => {
    if (timer <= 0) {
      openModal();
      setGameStart(false);
    }
  }, [timer]);

  // Redirecionar após 3 segundos se o modal estiver aberto
  useEffect(() => {
    if (modalOpen) {
      const redirectTimer = setTimeout(() => {
        navigate('/rankings'); // Substitua '/outra-pagina' pela rota desejada
      }, 3500); // 3000 milissegundos = 3 segundos

      return () => clearTimeout(redirectTimer); // Limpar o timer ao desmontar
    }
  }, [modalOpen, navigate]);

  const handleSquareClick = (index: number): void => {
    if (gameStart === false) {
      setGameStart(true);
    }

    // Toggle the selection state of the clicked tile based on its index
    if (selectedIndices.includes(index)) {
      setSelectedIndices((prevIndices) =>
        prevIndices.filter((selectedIndex) => selectedIndex !== index)
      );
    } else {
      setSelectedIndices((prevIndices) => [...prevIndices, index]);
    }

    // Black tile clicked
    if (blackSquareIndices.includes(index)) {
      const newIndices = blackSquareIndices.map((oldIndex) => {
        if (oldIndex === index) {
          return generateUniqueIndex();
        }
        return oldIndex;
      });
      setBlackSquareIndices(newIndices);
      setCombo((prevCombo) => prevCombo + 1);
      setScore((prevScore) => prevScore + 1);
    } else {
      setCombo(0);
      setMultiPts(5);
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
    <div className='flex-grow container mx-auto'>
      <div className='flex justify-center'>
        <div className='flex flex-col max-w-lg bg-gray-100 border text-gray-800 select-none'>
          <ScoreBar
            score={score}
          />
          <div className='grid grid-cols-4'>
            {Array.from(Array(16), (_, index) => (
              <Tiles
                key={index}
                device={device}
                isBlack={blackSquareIndices.includes(index)}
                isSelected={selectedIndices.includes(index)}
                onClick={() => handleSquareClick(index)}
              />
            ))}
          </div>
          <div className='p-2 text-center text-lg'>
            {gameStart ? (
              <div>Timer: {timer} sec</div>
            ) : (
              <div>Boa Sorte!</div>
            )}
          </div>
        </div>
        <ScoreModal
          isOpen={modalOpen}
          onClose={closeModal}
          score={score}
          message={""}
          />
      </div>
    </div>
  );
};

export default Game;