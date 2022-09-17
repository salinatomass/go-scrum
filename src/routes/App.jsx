import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import '../styles/App.css'
import { Tasks } from '../components/views/Tasks'
import { Login } from '../components/views/Login'
import { Register } from '../components/views/Register'

const NotFound = lazy(() => import('../components/views/NotFound'))

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem('logged'))
    return <Navigate to="/login" replace={true} />

  return children
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Tasks />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<>...</>}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
