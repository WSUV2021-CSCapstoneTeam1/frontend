import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from '../contexts/ThemeContext';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(localStorage.getItem("mode"));

  function changeTheme(theme) {
    console.log("set theme"); 

    // console.log("Prev theme = " + localStorage.getItem("mode") + " This theme = " + theme); 
    (theme === themes.light) ? localStorage.setItem("mode", themes.light): localStorage.setItem("mode", themes.dark)
    // console.log("Just put in local storage: " + localStorage.getItem("mode"))
    setTheme(theme);
    
  }

  useEffect(() => {
    console.log("Using effect")
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
      {console.log("Hello!")}
      {props.children}

    </ThemeContext.Provider>
  );
}