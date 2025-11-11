function createStore(reducer) {
    let state
    let listeners = []
    function getState() {
        return state
    }
    function dispatch(action) {
        state = reducer(state, action)
        for (const listener of listeners) {
            listener();
        }
    }
    function subscribe(listener) {
      listeners.push(listener)
      return function unsubscribe() {
        listeners = listeners.filter(l => l !== listener);
      };
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}

function counterReducer(state=0, action) {
    switch(action.type) {
        case 'INCREMENT': {
            return state + 1
        }
        case 'DECREMENT': {
            return state - 1
        }
        default: 
            return state
    }
}

// const store = createStore(counterReducer);

// const unsubscribe = store.subscribe(() => {
//   console.log("State changed:", store.getState());
// })

// store.dispatch({ type: "INCREMENT" });
// console.log(store.getState()); // 1
// store.dispatch({ type: "INCREMENT" });
// console.log(store.getState()); // 2
// store.dispatch({ type: "DECREMENT" });
// console.log(store.getState());
// unsubscribe(); // Stop listening
// store.dispatch({ type: "INCREMENT" }); // No log now


//CODE:

import React, { useEffect, useState } from 'react';

import { createStore } from '../store/createStore';
import { reducer } from './reducer';

const store = createStore(reducer);

function Details() {
  const [_, forceRender] = useState({});

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceRender({});
    });
    return unsubscribe;
  }, []);

  const state = store.getState();

  const handleChange = ({ target }) => {
    store.dispatch({ type: 'UPDATE_NAME', data: target.value });
  };

  const handleClear = () => {
    store.dispatch({ type: 'CLEAR_NAME' });
  };
  return (
    <>
      <input value={state.name} onChange={handleChange}></input>
      <button onClick={handleClear}>Clear</button>
    </>
  );
}

export default Details;





const initialState = {
  name: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NAME': {
      return {
        ...state,
        name: action.data,
      };
    }
    case 'CLEAR_NAME': {
      return {
        ...state,
        name: '',
      };
    }
    default:
      return state;
  }
}





export function createStore(reducer) {
  let state;
  let listeners = [];
  dispatch({ type: '@@INIT' });

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}
