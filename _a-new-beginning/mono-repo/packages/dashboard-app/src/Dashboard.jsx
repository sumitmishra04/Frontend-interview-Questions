import React, { useState, useEffect } from 'react';
import { useAuth, apiFetch } from 'shared-lib';

export default function Dashboard() {
  const { user, accessToken } = useAuth();
  const [serverUser, setServerUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const data = await apiFetch('/api/selfProfile');
        setServerUser(data.user);
      } catch (err) {
        console.log(err)
        setError('Unauthorized or expired session');
      }
    }
    fetchMe();
  }, []);

  return (
    <div>
      <h2>📊 Dashboard</h2>
      <p>Client User (from context): {user?.name || 'Guest'}</p>
      <p>Access Token: {accessToken ? '✅ Present' : '❌ Not present'}</p>
      <p>Server User (validated by backend):</p>
      {serverUser ? (
        <div>✅ Authenticated as {serverUser.name}</div>
      ) : (
        <div style={{ color: 'red' }}>{error}</div>
      )}
    </div>
  );
}
