import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LangProvider } from './hooks/useLang'
import { ToastProvider } from './components/ui/Toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </LangProvider>
  </StrictMode>,
)
