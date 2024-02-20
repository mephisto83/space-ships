import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useSceneLoaded } from './useSceneLoaded';
import gui from './gui';

// Create the context with a default value
const SpaceShipContext = createContext<SpaceShipContextType | undefined>(undefined);

// Define the type for a single space ship
interface SpaceShip {
  id: number;
  name: string;
  type: string;
  maxSpeed: number;
}

// Define the type for the context value
interface SpaceShipContextType {
}

// Create a provider component
interface SpaceShipProviderProps {
  children: ReactNode;
}

export const SpaceShipProvider: React.FC<SpaceShipProviderProps> = ({ children }) => {
  const [painterLoaded, setPainterLoaded] = useState(false);

  useEffect(() => {
    let camera: any = document.getElementById('acamera');
    if (camera) {
      camera.setAttribute('orbit-controls', 'initialPosition: -1 1.6 5');
    }
  }, [painterLoaded])

  useSceneLoaded(() => {
    gui().then(() => {
      setPainterLoaded(true);
    });
  });

  return (
    <SpaceShipContext.Provider value={{}}>
      {children}
    </SpaceShipContext.Provider>
  );
};

// Custom hook to use the context
export const useSpaceShips = () => {
  const context = useContext(SpaceShipContext);
  if (context === undefined) {
    throw new Error('useSpaceShips must be used within a SpaceShipProvider');
  }
  return context;
};

