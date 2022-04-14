import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import reportWebVitals from './utils/reportWebVitals';
import ThemeContextWrapper from './containers/contexts/ThemeContextWrapper';

ReactDOM.render(
  <ThemeContextWrapper>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </ThemeContextWrapper>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
