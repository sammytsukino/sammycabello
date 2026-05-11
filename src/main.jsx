import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'lenis/dist/lenis.css'
import './index.css'
import { initLenis } from './lib/initLenis.js'
import Router from './router/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)

initLenis()
