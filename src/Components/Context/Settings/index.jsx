import React, { useState, useEffect } from 'react';

export const settingsContext = React.createContext();


export function SettingsProvider({ children }) {
  const [values, setValues] = useState({});
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsInPage, setItemsInPage] = useState(3);
  const [showCompleted, setShowCompleted] = useState(true);
  

  const updateItemsInPage = (value) => {
    setItemsInPage(value);
  };

  const toggleShowCompleted = () => {
    setValues((prev) => ({ ...prev, showCompleted: !prev.showCompleted }));
  };

  const userChoice = () => {
    localStorage.setItem('userChoice', JSON.stringify(values));
  };

  const defaultSettings = {
    itemsInPage,
    setItemsInPage,

    updateItemsInPage,

    // hideCompleted: true,
    showCompleted,
    setShowCompleted,
    toggleShowCompleted,

    sort: "difficulty",

    values,
    setValues,
    
    list,
    setList,
    
    incomplete,
    setIncomplete,
    
    currentPage,
    setCurrentPage,
  };
  
  useEffect(() => {
    const savedUserChoice = JSON.parse(localStorage.getItem('userChoice'));

    if (savedUserChoice) {
      setValues(savedUserChoice);
    }
  }, []);

  useEffect(() => {
    userChoice();
  }, [values]);

  return (
    <settingsContext.Provider value={defaultSettings}>
      {children}
    </settingsContext.Provider>
  );
}

