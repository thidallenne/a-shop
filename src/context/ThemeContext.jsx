import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  useEffect(() => {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-dark-mode','dark');
    } else {
        document.documentElement.setAttribute('data-dark-mode','light');
    }
  }, [isDarkMode]); 

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};