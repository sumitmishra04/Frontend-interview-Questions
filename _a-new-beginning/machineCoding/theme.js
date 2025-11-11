import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  theme: "light",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "toggleTheme": {
      return {
        ...state,
        theme: action.data === "dark" ? "light" : "dark",
      };
    }
    default: {
      return state;
    }
  }
};

const ThemeContext = createContext();

export const ThemeProvider = function ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme() {
  return useContext(ThemeContext);
}

export const Home = () => {
  const {
    state: { theme },
    dispatch,
  } = useTheme();

  const handleChangeTheme = () => {
    dispatch({ type: "toggleTheme", data: theme });
  };

  return (
    <div style={{ height: "100vh" }} className={theme}>
      Home
      <button onClick={handleChangeTheme}>Change theme</button>
    </div>
  );
};
