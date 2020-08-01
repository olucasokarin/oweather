import React from 'react';
// import dotenv from 'dotenv';
import Dashboard from './pages/Dashboard';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  // dotenv.config();

  return (
    <>
      <Dashboard />
      <GlobalStyle />
    </>
  );
};

export default App;
