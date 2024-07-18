import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import NavigationBar from '../navigationBar/NavigationBar';
import Content from '../content/Content';
import './App.css'

const App = () => {

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className='app-container'>
      <Header />
      <NavigationBar setSearchQuery={setSearchQuery} />
      <Content searchQuery={searchQuery} />
      <Footer />
    </div>
  );
};

export default App;
