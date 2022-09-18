import React from 'react';
import "./App.css";
import Header from './components/Header/Header';
import TopFold from './components/TopFold/TopFold';

function App() {
  return (
    <div className='max-width'>
      <Header />
      <TopFold />
    </div>
  );
}

export default App;
