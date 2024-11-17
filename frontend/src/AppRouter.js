import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import App from './App';
import ComparePage from './ComparePage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/all-data" element={<App />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
