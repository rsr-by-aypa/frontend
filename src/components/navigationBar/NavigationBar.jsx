import React, { useState } from 'react';
import './NavigationBar.css'; 
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setSearchQuery(event.target.value);
  };

  return (
    <div className="navContainer">
      <div className="navigationButtons">
        <button className='navButtons' id='productPageNavButton' onClick={() => navigate('/productList')}>Unser Sortiment</button>
      </div>
      <div className="search-bar" id='search-bar-Nav'>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
