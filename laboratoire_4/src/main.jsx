import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PopupProvider } from "./context/PopupContext";
import './index.css'
import App from './App.jsx'
import Voila from "./voila.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <PopupProvider>
          <Voila/>
      </PopupProvider>
  </StrictMode>,
)
