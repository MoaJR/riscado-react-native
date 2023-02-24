import React from 'react'
import Home from './src/components/Home';
import DataContextProvider from './src/context/DataContext';

export default function App() {

  return (
    <DataContextProvider>
      <Home />
    </DataContextProvider>
  );
}
