import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  ToastContainer
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

/* PAGES */

import LandingPage from './pages/LandingPage';

import Login from './pages/Login';

import Register from './pages/Register';

import NGODashboard from './pages/NGODashboard';

import DonorDashboard from './pages/DonorDashboard';

import AdminDashboard from './pages/AdminDashboard';

import DonationForm from './pages/DonationForm';

import RequestForm from './pages/RequestForm';

import MatchTracking from './pages/MatchTracking';

import MapDashboard from './pages/MapDashboard';

function App() {

  return (

    <Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      <Routes>

        {/* LANDING PAGE */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARDS */}

        <Route
          path="/ngo-dashboard"
          element={<NGODashboard />}
        />

        <Route
          path="/donor-dashboard"
          element={<DonorDashboard />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        {/* FORMS */}

        <Route
          path="/donate"
          element={<DonationForm />}
        />

        <Route
          path="/request"
          element={<RequestForm />}
        />

        {/* TRACKING */}

        <Route
          path="/matches"
          element={<MatchTracking />}
        />

        <Route
          path="/map"
          element={<MapDashboard />}
        />

      </Routes>

    </Router>

  );

}

export default App;