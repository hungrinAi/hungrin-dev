import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Promotions from './pages/Promotions';
import Insights from './pages/Insights';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import AuthPage from './pages/AuthPage';
import DemoPage from './pages/DemoPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/billing" element={<Pricing />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
