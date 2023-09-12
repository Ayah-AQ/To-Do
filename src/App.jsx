import React from 'react';
import { SettingsProvider } from './Components/Context/Settings';
import Routers from './Components/Routes';
import Headers from './Components/Header';

export default class App extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <Headers />
        <Routers />
      </SettingsProvider>
    );
  }
}
