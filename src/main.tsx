import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MotionConfig } from 'framer-motion'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Respect user OS “Reduce motion” preference across the entire app */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
)


