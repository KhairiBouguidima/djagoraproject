import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth & Contexts
import { AuthProvider } from '../src/components/contexts/authContexts';
import ProtectedRoute from '../src/components/Protect/ProtectedRoute';

// Layout Components
import Navbar from './components/navbar/Navbar'; // Adjust path based on where you saved it

// Page Components
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';    
import NotFound from './components/auth/NotFound/NotFound'; 
import AccountSettings from './components/auth/AccountSettings/AccountSettings';
import Home from './components/Home/HomePage/Home';
import PredictModel from './components/Home/PredictModel/PredictModel';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        {/* The Navbar stays outside Routes so it appears on all pages */}
        
                <ProtectedRoute>
                  <Navbar /> 
                </ProtectedRoute>
        <main className="app-main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes - Only accessible if logged in */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/predict" 
              element={
                <ProtectedRoute>
                  <PredictModel />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
    <Footer />
    </>
  );
}

export default App;