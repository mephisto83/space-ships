import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ModelViewer from './ModelViewer';
import { SpaceShipProvider } from './SpaceShipContext';
import SpaceShipScene from './SpaceShipScene';
import { useSceneLoaded } from './useSceneLoaded';
import gui from './gui';

function App() {
  return (
    <SpaceShipProvider>
      <div className="App">
        <header className="App-header">
          <SpaceShipScene />
        </header>
      </div>
    </SpaceShipProvider>
  );
}

export default App;
