import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Rankings from './pages/Rankings';
import GameOver from './pages/GameOver';
import Credit from './pages/Credit';

const App = () => {

  return (
    <div className='flex flex-col'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/credit' element={<Credit/>}/>
        <Route path='/gameover' element={<GameOver />} />
        <Route path='/rankings' element={<Rankings />} />
        <Route path='/play' element={<Game/>} />
      </Routes>
    </div>
  );
};

export default App;