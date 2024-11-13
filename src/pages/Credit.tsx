import * as React from 'react';
import {Link} from 'react-router-dom';
import vmLogo from '../assets/vm.png';
import instagram from '../assets/instagram.svg';
import pixelGuy from '../assets/teste.png';
import creditCss from '../styles/Credit.module.css';

const Credit = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className="mb-10 text-center mb-4 justify-items-center items-center">
                <img src={vmLogo} alt="VM Logo" className="mb-10" style={{width:"65%"}}/>
                <p className="text-4xl font-bold text-cyan-800 mb-2">Nos siga no instagram para prosseguir!</p>
                <div className="flex mt-10 mb-10 items-center">
                    <img src={instagram} alt="Instagram Logo" className="w-12 mr-2 rounded-sm"/>
                    <span className="text-2xl font-normal text-cyan-800">@visualmidialeme</span>
                </div>
            </div>
            <Link to={'/rankings'}>
                <button className="mt-10 mb-10 rounded-full items-center text-center text-3xl py-5 px-16 bg-cyan-950 text-white hover:bg-cyan-800">ESTOU SEGUINDO</button>
            </Link>
            <div className="guyControl mt-10 z-10">
                <img src={pixelGuy} alt="Pixel Guy"/>
            </div>
            <div className={creditCss.yellowCircle}></div>
        </div>
    );
}

export default Credit;