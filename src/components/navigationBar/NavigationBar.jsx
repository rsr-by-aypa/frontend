import React from 'react';
import './NavigationBar.css'; 
import { useNavigate } from 'react-router-dom';


const NavigationBar= () => {


const navigate = useNavigate();


  return (
    <div className="navContainer">
      <div className="navigationButtons">
        <button className='navButtons' id='productPageNavButton' onClick={() => navigate('/productList')}>Unser Sortiment</button>
        <button className='navButtons' id='kategorie1NavButton'>Kategorie 1</button>
        <button className='navButtons' id='kategorie2NavButton'>Kategorie 2</button>
        <button className='navButtons' id='kategorie3NavButton'>Kategorie 3</button>
      </div>
      <div className="search-bar" id='search-bar-Nav'>
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default NavigationBar;