import React from 'react';
import './NavigationBar.css'; 
import { useNavigate } from 'react-router-dom';


const NavigationBar= () => {


const navigate = useNavigate();


  return (
    <div className="navContainer">
      <div className="navigationButtons">
        <button className='navButtons' id='productPageNavButton' onClick={() => navigate('/productList')}>Unser Sortiment</button>
      </div>
      <div className="search-bar" id='search-bar-Nav'>
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default NavigationBar;