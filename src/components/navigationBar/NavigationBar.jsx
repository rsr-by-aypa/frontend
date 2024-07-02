import React from 'react';
import './NavigationBar.css'; 
import { useNavigate } from 'react-router-dom';


const NavigationBar= () => {


const navigate = useNavigate();


  return (
    <div className="navContainer">
      <div className="navigationButtons">
        <button className='navButtons' id='productPageNavButton' onClick={() => navigate('/productpage')}>Unser Sortiment</button>
        <button className='navButtons' id='kategorie1NavButton'>Kategorie 1</button>
        <button className='navButtons' id='kategorie2NavButton'>Kategorie 2</button>
        <button className='navButtons' id='kategorie3NavButton'>Kategorie 3</button>
        <button className='navButtons' id='checkoutNavButton' onClick={() => navigate('/checkout')}>Checkout</button>
        <button className='navButtons' id='productDetailsNavButton' onClick={() => navigate('/productdetails')}>ProductDetails</button>
      </div>
      <div className="search-bar" id='search-bar-Nav'>
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default NavigationBar;