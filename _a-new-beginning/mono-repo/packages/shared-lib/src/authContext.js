import React, { createContext, useReducer, useContext } from 'react';

/** -----------------------
 *  🔐 INITIAL AUTH STATE
 * ------------------------
 */
const initialState = {
  user: null,
  accessToken: null,
};

/** -----------------------
 *  🔁 REDUCER FOR ACTIONS
 * ------------------------
 */
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, accessToken: action.payload.accessToken };
    case 'LOGOUT':
      return { user: null, accessToken: null };
    default:
      return state;
  }
}

/** --------------------------------
 *  🌍 GLOBAL AUTH CONTEXT (React)
 * ---------------------------------
 */
const AuthContext = createContext();

/**
 * We maintain a separate global variable to allow non-React code
 * (like fetchClient.js) to access the most recent auth state.
 */
let _currentAuthState = {
  ...initialState,
  login: () => {},
  logout: () => {}
};

/** --------------------------------
 *  🔧 AUTH PROVIDER COMPONENT
 * ---------------------------------
 */
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ✅ Functions for login and logout
  const login = (user, accessToken) => {
    dispatch({ type: 'LOGIN', payload: { user, accessToken } });
  };

  const logout = async () => {
    try {
      // ✅ Call backend to clear refresh cookie (future-safe)
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.warn('Logout API failed (possibly already expired token):', err);
    }

    // ✅ Clear client state
    dispatch({ type: 'LOGOUT' });
  };

  // 🔄 Keep latest state & actions available globally
  _currentAuthState = { ...state, login, logout };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** --------------------------------
 *  🎯 HOOK: USE AUTH IN COMPONENTS
 * ---------------------------------
 * - This is used inside React components only
 */
export function useAuth() {
  return useContext(AuthContext);
}

/** --------------------------------
 *  🛠 FUNCTION FOR GLOBAL ACCESS
 * ---------------------------------
 * - This is used outside React (like in fetchClient.js)
 * - It does NOT break hook rules
 */
export function getAuthState() {
  return _currentAuthState;
}
