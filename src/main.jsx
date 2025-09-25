import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import FeedbackPage from './pages/Feedback'
import Home from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/give-feedback' element={<FeedbackPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
