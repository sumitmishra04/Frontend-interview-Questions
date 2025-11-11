import { getAuthState } from './authContext.js';

let onUnauthorizedCallback = null;

/**
 * Set a global callback for when session becomes invalid.
 * This allows the host to control logout + redirect behavior.
 */
export function setUnauthorizedHandler(callback) {
  onUnauthorizedCallback = callback;
}

/**
 * 🔧 Helper function to attach access token to fetch request
 */
async function fetchWithAuth(url, options = {}) {
  const { accessToken } = getAuthState();
  const headers = options.headers || {};

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return fetch(`http://localhost:5000${url}`, {
    ...options,
    headers,
    credentials: 'include', // ✅ enables sending refreshToken cookie
  });
}

/**
 * 🌍 Main API Fetch Function (with auto-refresh logic)
 */
export async function apiFetch(url, options = {}) {
  // 1️⃣ Try with current access token
  let response = await fetchWithAuth(url, options);

  // 2️⃣ If unauthorized, attempt refresh
  if (response.status === 401) {
    console.warn('Access token expired. Attempting refresh...');

    try {
      const refreshResponse = await fetch(`http://localhost:5000/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // ✅ send refresh cookie
      });

      if (!refreshResponse.ok) {
        throw new Error('Refresh token invalid or expired');
      }

      const data = await refreshResponse.json();
      const { login } = getAuthState();

      // ✅ Update auth state with new access token
      if (login) {
        login(data.user, data.accessToken);
      }

      console.log('✅ Access token refreshed. Retrying original request...');
      response = await fetchWithAuth(url, options);
    } catch (err) {
      console.error('❌ Refresh failed:', err.message);

      if (onUnauthorizedCallback) {
        // ✅ Logout & redirect
        onUnauthorizedCallback();
      }

      throw new Error('Session expired. Please log in again.');
    }
  }

  // 3️⃣ Final check: if still not ok, throw error
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}
