// App.js
import React from 'react';
import { SettingsProvider } from './Components/Context/Settings';
import Routers from './Components/Routes';
import Headers from './Components/Header';
import Login from './Components/Login';
import AuthProvider from './Components/Context/Auth';
import Auth from './Components/Auth';

export default function App() {
  return (
    <AuthProvider>
      <Login/>
      <SettingsProvider>
        <Headers />
        <Auth><Routers /></Auth>
          
      </SettingsProvider>
    </AuthProvider>
  );
}
