import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/index.jsx'
import './global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
