import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Rankings from './pages/Rankings';

const App = () => {

  return (
    <div className='flex flex-col bg-neutral-900 text-neutral-300'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rankings' element={<Rankings />} />
        <Route path='/play' element={<Game/>} />
      </Routes>
    </div>
  );
};

export default App;