import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import FeedbackPage from './pages/FeedbackPage'
import Home from './pages/Home'
import FeedbackHistory from './pages/FeedbackHistory'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/give-feedback' element={<FeedbackPage/>}/>
        <Route path='/feedback-history' element={<FeedbackHistory/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
