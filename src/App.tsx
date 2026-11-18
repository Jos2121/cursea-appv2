import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import CreaTuCancion from './pages/CreaTuCancion';
import MediosPago from './pages/MediosPago';
import MainLayout from './layouts/MainLayout';
import { Toaster } from "@/components/ui/sonner"; // Assuming sonner is available or will create

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  return token ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Swapped Routes */}
        <Route path="/crea-tu-cancion" element={<Landing />} />
        <Route path="/landing" element={<CreaTuCancion />} />
        <Route path="/medios-pago" element={<MediosPago />} />

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
