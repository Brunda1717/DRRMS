import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Register from './pages/Register';
import NGODashboard from './pages/NGODashboard';
import DonorDashboard from './pages/DonorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DonationForm from './pages/DonationForm';
import RequestForm from './pages/RequestForm';
import MatchTracking from './pages/MatchTracking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/matches" element={<MatchTracking />} />
      </Routes>
    </Router>
  );
}

export default App;