
class Store {
  constructor(reducer, initialState) {
    this.subscribers = [];
    this.state = initialState;
    this.reducer = reducer;
  }
  getState() {
    return this.state;
  }
  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.subscribers.forEach((subscriber) => {
      subscriber();
    });
  }
  subscribe(cb) {
    this.subscribers.push(cb);
    return () => this.unsubscribe(cb)
  }
  unsubscribe(cb) {
    this.subscribers = this.subscribers.filter((item) => item !== cb);
  }
}

const initialState = {
  value: 0,
};

function counterReducer(state, action) {
  if (action.type === 'inc') {
    return {
      ...state,
      value: state.value + 1,
    };
  } else if (action.type === 'dec') {
    return {
      ...state,
      value: state.value - 1,
    };
  }
}

const subscriber = () => {
  console.log('State changed:', store.getState());
};

const store = new Store(counterReducer, initialState)
const unsubscribe = store.subscribe(subscriber);

store.dispatch({type: 'inc'})
store.dispatch({type: 'inc'})
store.dispatch({type: 'inc'})
store.dispatch({type: 'dec'})
unsubscribe()
store.getState()
store.getState()
store.getState()

///

import React, { useEffect, useState } from 'react';

import { createStore } from '../store/createStore';
import { reducer } from './reducer';

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




