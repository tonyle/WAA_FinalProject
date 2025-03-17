import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
// admin
import ApproveOwners from './components/Admin/ApproveOwners.jsx';
import ManageOwners from './components/Admin/ManageOwners.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';

// owner 
import OwnerDashboard from './components/Owner/OwnerDashboard.jsx';
import PropertyManagement from './components/Owner/PropertyManagement.tsx';
import Offers from './components/Owner/Offers.tsx';
import Messages from './components/Owner/Messages.tsx';
import { Route, Routes } from 'react-router'
import AuthLayout from './containers/AuthLayout'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import MainLayout from './containers/MainLayout'
import Homepage from './components/Homepage'
import AdminLayout from './containers/AdminLayout'
import OwnerLayout from './containers/OwnerLayout'
import Signup from './components/Auth/Signup'
import CustomerLayout from './containers/CustomerLayout.jsx';
import CustomerDashboard from './components/Customer/CustomerDashboard.jsx';
import CurrentOffers from './components/Customer/CurrentOffers.jsx';
import OfferHistory from './components/Customer/OfferHistory.jsx';
import SavedProperties from './components/Customer/SavedProperties.jsx';

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
          <Route index element={<AdminDashboard />} /> {/* Default page for /admin */}
          <Route path="approve-owners" element={<ApproveOwners />} />
          <Route path="manage-owners" element={<ManageOwners />} />
      </Route>

      <Route path="/owner" element={<OwnerLayout />}>
        <Route index element={<OwnerDashboard />} />
        
        <Route path="property-management" element={<PropertyManagement/>} />
        <Route path="offers" element={<Offers/>} />
        <Route path="messages" element={<Messages/>} />
      </Route>

      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboard />} />
        
        <Route path="current-offers" element={<CurrentOffers/>} />
        <Route path="offer-history" element={<OfferHistory/>} />
        <Route path="saved-properties" element={<SavedProperties/>} />
      </Route>

      
    </Routes>
  )
}

export default App
