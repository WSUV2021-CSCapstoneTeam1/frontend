import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from '../contexts/ThemeContext';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(localStorage.getItem("mode"));

  function changeTheme(theme) {
    (theme === themes.light) ? localStorage.setItem("mode", themes.light): localStorage.setItem("mode", themes.dark)
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.dark:
        document.body.classList.add('dark-content');
        break;
      case themes.light:
        document.body.classList.remove('dark-content');
        break; 
      default:
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}