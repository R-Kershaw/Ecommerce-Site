import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { CartContextProvider } from './contexts/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <CartContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CartContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
