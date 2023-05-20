import React from 'react';
import ReactDOM from 'react-dom/client';
import { BlogApp } from './BlogApp';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <BlogApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  
)
