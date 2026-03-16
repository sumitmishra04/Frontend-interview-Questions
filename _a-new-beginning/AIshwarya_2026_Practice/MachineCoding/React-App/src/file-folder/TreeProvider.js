import React, { useContext, useReducer, createContext } from 'react';
const TreeContext = createContext();
const initialState = {
  expandedIds: {},
};

const ACTIONS = {
  TOGGLE: 'TOGGLE',
  SEARCH: 'SEARCH'
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE: {
      return {
      ...state,
      expandedIds: {...state.expandedIds, [action.data.id]: !state.expandedIds[action.data.id] }
      }
      // add later
    }
    case ACTIONS.SEARCH: {
      return {
        ...state,
        expandedIds: action.data.expandedIds
      }
    }
    default:
      return state; // <-- Add this line
  }
}

function TreeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setToggle = (id) => dispatch({ type: ACTIONS.TOGGLE, data: {id} })
  const searchTree = (data, query) => {
    const expanded = {}
    function dfs(nodes, parents = []) {
      for(let node of nodes) {
        if(node.name.toLowerCase().includes(query.toLowerCase())){
          parents.forEach(id => {
            expanded[id] = true
          })
        }
          if(node.children) {
            dfs(node.children, [...parents, node.id])
          }
        }
      }
    console.log('expanded', expanded)
    dfs(data)
    dispatch({ type: ACTIONS.SEARCH, data: {
    expandedIds: expanded
  }})
  }
  return <TreeContext.Provider value={{...state, setToggle, searchTree}}>{children}</TreeContext.Provider>;
}

export default TreeProvider;

export function useTreeContext() {
  return useContext(TreeContext);
}
