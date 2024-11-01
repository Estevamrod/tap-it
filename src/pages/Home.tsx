import * as React from "react";
import { Link } from 'react-router-dom';
import '../styles/index.css';
import Women from '../assets/Mulher.png';
import Logo1 from '../assets/logo.png';
import Logo2 from '../assets/logovm.png';

const Home = () => {
  return (
    <div className='flex flex-grow flex-col justify-center items-center gap-5 container mx-auto'>
      <div className="orange-semi-circle"></div>
      <div className="yellow-circle"></div>

      <div className="image-container">
        <img src={Women} alt="Mulher"/>
      </div>

      <div className="text-circle">
        <p>TESTE DE<br/>REFLEXO!</p>
      </div>

      <div className="info-text">
        <p><span>Exercite sua memória</span> com diversão garantida! O <span>Jogo da Memória Visual Mídia</span> está aqui
          para desafiar
          sua mente</p>
      </div>

      <Link to={`/play`}>
        <div className="button-play">  
          <button>TOQUE PARA JOGAR</button>
        </div>
      </Link>

      <img className="logo1" src={Logo1} alt=""/>
      <img className=" logo2" src={Logo2} alt=""/>
    </div>
  );
};

export default Home;