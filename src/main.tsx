import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <meta name="theme-color" content="#F3EEE3"></meta>
    <App />
  </StrictMode>,
)
