import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Route, Routes } from 'react-router'
import AuthLayout from './containers/AuthLayout'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import MainLayout from './containers/MainLayout'
import Homepage from './components/Homepage'
import AdminLayout from './containers/AdminLayout'
import OwnerLayout from './containers/OwnerLayout'
import Signup from './components/Auth/Signup'

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />}/>
        <Route path="logout" element={<Logout />}/>
        <Route path="signup" element={<Signup />}/>
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />}/>
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        
      </Route>

      <Route path="/owner" element={<OwnerLayout />}>
        
      </Route>
    </Routes>
  )
}

export default App
