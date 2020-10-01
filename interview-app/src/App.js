import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileSelection from './FileSelection.js'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <label>
          <FileSelection />
          </label>
        </form>
      </header>
    </div>
  );
}

export default App;
