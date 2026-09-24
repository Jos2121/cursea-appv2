import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import LandingRetry from './pages/LandingRetry';
import MainLayout from './layouts/MainLayout';
import { Toaster } from "@/components/ui/sonner"; // Assuming sonner is available or will create

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  return token ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Landing Page Route */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/segundo-intento" element={<LandingRetry />} />

        {/* Private Routes wrapped in MainLayout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
