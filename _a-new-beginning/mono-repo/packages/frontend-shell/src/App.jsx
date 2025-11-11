import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import DashboardWrapper from './RemoteDashboard';
import ProfileWrapper from './RemoteProfile';
import { useAuth } from 'shared-lib';
import AuthWrapper from './RemoteAuth';

function ProtectedRoute({ children }) {
  const { accessToken } = useAuth();
  const location = useLocation();
  return accessToken ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

function App() {
  const [message, setMessage] = useState("Loading...");
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);
    const { user, logout } = useAuth();

 useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
          return r.json();
        })
      .then(setProducts)
      .catch((e) => setErr(e.message));
}, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        {!user ? <Link to="/login">Login</Link> : <button onClick={logout}>Logout</button>}
        {user && <span style={{ marginLeft: 10 }}>Welcome, {user.name}</span>}
      </nav>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<h2>🏠 Host Home</h2>} />
          <Route path="/login" element={<AuthWrapper />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardWrapper /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileWrapper /></ProtectedRoute>} />
        </Routes>
      </React.Suspense>
      <p>Backend says: {message}</p>
      {err && <div style={{ color: 'red' }}>Fetch error: {err}</div>}
      <ul>
         {products.map((p) => (
          <li key={p.id} style={{ marginBottom: 12 }}>
            <strong>{p.title}</strong>
            <div>
            {/* If CSP blocks the third-party image, you will see a broken image and a CSP violation in browser console */}
              <img src={p.image} alt={p.title} style={{ maxWidth: 240, display: 'block', marginTop: 6 }} />
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>{p.image}</div>
          </li>
          ))}
          </ul>
      <div id="status-local"></div>
    </div>
  );
}

export default App;
