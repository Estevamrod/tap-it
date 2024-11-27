import * as React from "react";
import { Link } from 'react-router-dom';
import pixelLogo from '../assets/visualTap.png';
import excel from '../assets/excel.svg'
import word from '../assets/word.svg'
import powerpoint from '../assets/powerpoint.svg'
import photoshop from '../assets/photoshop.svg'
import illustrator from '../assets/illustrator.svg'
import csharp from '../assets/csharp.svg'
import Logo2 from '../assets/vm_branca.png';
import guyPointing from '../assets/Professor.png'
import '../styles/Homepage.css'

const Home = () => {
  return (
    <div className='flex flex-grow flex-col justify-center items-center gap-5 container mx-auto'>

      <div className="pixelart_container">
        <img src={pixelLogo} className="pixelLogo"/>
      </div>
      <Link to={`/play`}>
        <div className="button-play">  
          <button>JOGAR</button>
        </div>
      </Link>
      <Link to={`/rankings`}>
        <div className="button-ranking">  
          <button>RANKING</button>
        </div>
      </Link>
      <div className="cursos-about">
        <p>CONHEÇA NOSSOS CURSOS</p>
        <div className="image-grid">
          <img src={excel} alt="Imagem 1"/>
          <img src={word} alt="Imagem 2"/>
          <img src={powerpoint} alt="Imagem 3"/>
          <img src={photoshop} alt="Imagem 4"/>
          <img src={illustrator} alt="Imagem 5"/>
          <img src={csharp} alt="Imagem 6"/>
        </div>
      </div>
      <div className="yellow-circle"></div>
      <div className="logo-vm">
        <img className="logo2" src={Logo2}/>
      </div>
      <div className="guy-container">
        <img src={guyPointing} className="guy"/>
      </div>
    </div>
  );
};

export default Home;