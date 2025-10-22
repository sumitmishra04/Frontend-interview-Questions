import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DashboardWrapper from './RemoteDashboard';

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div>
       <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>🏠 Host Home</h2>} />
          <Route path="/dashboard" element={<DashboardWrapper />} />
        </Routes>
      </BrowserRouter>
      <h1>React + Vite Frontend 2</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
