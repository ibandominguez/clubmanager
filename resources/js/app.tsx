import '../css/app.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/ErrorBoundary'

import Home from './screens/Home'
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </ErrorBoundary>
)
