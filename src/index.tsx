import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
<BrowserRouter>
    <App />
</BrowserRouter>
  
);


reportWebVitals();
