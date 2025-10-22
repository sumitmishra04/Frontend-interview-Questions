import React, { useState } from 'react';
import { useAuth } from 'shared-lib';

export default function Auth() {
  const [username, setUsername] = useState('sumit');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState(null);
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      login(data.user, data.accessToken); // from shared context
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
