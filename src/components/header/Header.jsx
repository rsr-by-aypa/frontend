import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import basketLogo from '../../images/warenkorbLogo.png'

const Header = () => {

const navigate = useNavigate();    

  return (
    <div className="header-container">
      <div className="left-content">
        <img src="" alt="Bild links" className="home-button" onClick={() => navigate('/')}/>
        <span className="header-title">Rock Solid Remedies</span>
      </div>
      <div className="right-content">
        <img src={basketLogo} alt="Bild rechts" className="basket-button" onClick={() => navigate('/basket')} />
      </div>
    </div>
  );
};

export default Header;