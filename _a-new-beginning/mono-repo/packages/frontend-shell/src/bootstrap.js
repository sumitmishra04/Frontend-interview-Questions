import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from 'shared-lib';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { setUnauthorizedHandler } from 'shared-lib';
import App from './App.jsx';

function GlobalWrapper() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // 🔐 Auto redirect on expired refresh token
    setUnauthorizedHandler(() => {
      logout();         // clear auth state
      navigate('/login');
    });
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <GlobalWrapper />
    </BrowserRouter>
  </AuthProvider>
);
