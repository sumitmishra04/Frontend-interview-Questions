
// Example utility
export const formatName = (name) => name.toUpperCase();

// Example shared React component
export const SharedHeader = () => {
  return <h1 style={{ color: "purple" }}>🌐 Welcome from Shared Library</h1>;
};

export { useGlobalStore } from './store.js';

export { AuthProvider, useAuth, getAuthState  } from './authContext.js';
export { apiFetch, setUnauthorizedHandler } from './fetchClient.js';
