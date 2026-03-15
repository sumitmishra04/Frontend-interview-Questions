import { createContext, useReducer, useContext } from 'react';
const treeContext = createContext();

const initialState = {
  expandedIds: {},
  selectedNodeId: null,
};

const ACTIONS = {
  TOGGLE: 'TOGGLE',
  SET_SELECTED: 'SET_SELECTED',
  RESET: 'RESET',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE: {
      return {
        ...state,
        expandedIds: {
          ...state.expandedIds,
          [action.id]: !state.expandedIds[action.id],
        },
      };
    }
    case ACTIONS.SET_SELECTED: {
      return {
        ...state,
        selectedNodeId: action.id,
      };
    }
    case ACTIONS.RESET: {
      return initialState;
    }
  }
}

function TreeProvider({ children, initialSelectedId = null }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    selectedNodeId: initialSelectedId,
  });
  const toggleNode = (id) => dispatch({ type: ACTIONS.TOGGLE, id });
  const setSelectedNode = (id) => dispatch({ type: ACTIONS.SET_SELECTED, id });
  const reset = () => dispatch({ type: ACTIONS.RESET });
  const value = {
    toggleNode,
    setSelectedNode,
    reset,
    ...state,
  };
  return <treeContext.Provider value={value}>{children}</treeContext.Provider>;
}

export default TreeProvider;

export function useTreeContext() {
  return useContext(treeContext);
}
