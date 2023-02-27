import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/styles.scss";
import { MyProjectApp } from './MyProjectApp';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyProjectApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
