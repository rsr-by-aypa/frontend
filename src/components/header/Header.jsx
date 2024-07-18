import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import basketLogo from '../../images/warenkorbLogo.png';
import logoutIcon from '../../images/logoutIcon.png';
import logo from '../../images/Logo2.png';
import keycloak from '../content/keycloak';

const Header = () => {

  const navigate = useNavigate();


  const handleLogout = () => {
      keycloak.logout({
        redirectUri: 'http://localhost'
      }).then(() => {
        console.log('Logged out successfully');
      }).catch(error => {
        console.error('Failed to log out:', error);
      }); 
  };

  return (
    <div className="header-container">
      <div className="left-content">
        <img src={logo} alt="Bild links" className="home-button" id='homeHeaderButton' onClick={() => navigate('/')}/>
        <span className="header-title">Rock Solid Remedies</span> 
      </div>
      <div className="right-content">
        <img src={basketLogo} alt="Bild rechts" className="basket-button" id='basketHeaderButton' onClick={() => navigate('/basket')} />
        <img src={logoutIcon} alt="Logout Icon" className="logout-button" id="headerLogoutButton" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Header;