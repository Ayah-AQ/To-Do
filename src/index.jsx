import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SettingsProvider } from './Components/Context/Settings';
import AuthProvider from './Components/Context/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <AuthProvider>
    <SettingsProvider>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </SettingsProvider>
  </AuthProvider>
  </React.StrictMode>
);