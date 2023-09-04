import React, { useState } from 'react';

export const settingsContext = React.createContext();


export function SettingsProvider({ children }) {
  const [values, setValues] = useState({});
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  
  const defaultSettings = {
    ItemsInPage: 3,
    hideCompleted: true,
    sort: "difficulty",
    values,
    setValues,
    list,
    setList,
    incomplete,
    setIncomplete,
    currentPage,
    setCurrentPage

  };
  
  return (
    <settingsContext.Provider value={defaultSettings}>
      {children}
    </settingsContext.Provider>
  );
}

