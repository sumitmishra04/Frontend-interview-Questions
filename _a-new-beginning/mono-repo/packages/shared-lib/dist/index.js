import { jsx as _jsx } from "react/jsx-runtime";
// Example utility
export var formatName = function formatName(name) {
  return name.toUpperCase();
};

// Example shared React component
export var SharedHeader = function SharedHeader() {
  return /*#__PURE__*/_jsx("h1", {
    style: {
      color: "purple"
    },
    children: "\uD83C\uDF10 Welcome from Shared Library"
  });
};
export { useGlobalStore } from './store.js';
export { AuthProvider, useAuth, getAuthState } from './authContext.js';
export { apiFetch, setUnauthorizedHandler } from './fetchClient.js';