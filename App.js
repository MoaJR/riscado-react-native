import React from 'react'
import DataContextProvider from './src/context/DataContext';
import Home from './src/pages/Home';

export default function App() {

  return (
    <DataContextProvider>
      <Home />
    </DataContextProvider>
  );
}
