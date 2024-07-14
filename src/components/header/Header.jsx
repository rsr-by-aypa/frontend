import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import basketLogo from '../../images/warenkorbLogo.png';
import logo from '../../images/Logo2.png';

const Header = () => {

const navigate = useNavigate();    

  return (
    <div className="header-container">
      <div className="left-content">
        <img src={logo} alt="Bild links" className="home-button" id='homeHeaderButton' onClick={() => navigate('/')}/>
        <span className="header-title">Rock Solid Remedies</span> 
      </div>
      <div className="right-content">
        <img src={basketLogo} alt="Bild rechts" className="basket-button" id='basketHeaderButton' onClick={() => navigate('/basket')} />
      </div>
    </div>
  );
};

export default Header;