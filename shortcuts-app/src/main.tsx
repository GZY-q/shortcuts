import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ExportProvider } from './context/ExportContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExportProvider>
      <App />
    </ExportProvider>
  </StrictMode>,
)
