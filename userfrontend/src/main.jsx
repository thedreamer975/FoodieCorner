import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContentProvider from './Context/StoreContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContentProvider>
      <App/>
    </StoreContentProvider>
  </BrowserRouter>,
)
