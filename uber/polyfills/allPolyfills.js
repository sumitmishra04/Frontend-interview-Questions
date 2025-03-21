/** OBJECT POLYFILLS */
const myInstanceOf = function (obj, constructorFn) {
    const proto = Object.getPrototypeOf(obj)
    while (proto) {
        if (proto === constructorFn.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
    return false
}
console.log(myInstanceOf([], Array));  // true
console.log(myInstanceOf({}, Object));  // true
console.log(myInstanceOf(new Date(), Date));  // true
console.log(myInstanceOf(new Date(), Array));  // false

const myNew = function (constrcutorfn, ...args) {
    const mythis = {}
    Object.setPrototypeOf(mythis, constrcutorfn.prototype)
    const result = constrcutorfn.apply(mythis, args)
    return (typeof result === 'object' && result !== null) ? result : mythis
}
function Person(name) {
    this.name = name;
}
const p = myNew(Person, "John");
console.log(p.name);  // John
console.log(p instanceof Person);  // true

const myCreate = function (proto) {
    if (proto !== 'null' || typeof proto !== 'object') {
        throw new TypeError("Prototype must of object type or null")
    }
    function F() { }
    F.prototype = proto
    return new F()
}
const obj = { a: 10 };
const newObj = myCreate(obj);
console.log(newObj.__proto__ === obj);  // true
console.log(newObj.a);  // 10



/** REACT POLYFILLS */
// USEEFFECT Rules:
// if there is no deps Array, it will run everytime
// if there is a deps Array but empty, then it will run only once
// if there are states inside the deps Array, then it will run everytime the deps array change
// if there is a cleanup function, then it will run everytime the deps array change or on unmount. Wont run if there is no deps array

const useMyEffect = function (cb, deps) {
    const isFirstRender = useRef(true)
    const prevDeps = useRef([])

    // First render
    if (isFirstRender.current) {
        isFirstRender.current = false
        const cleanup = cb()
        return () => {
            if (cleanup && typeof cleanup === 'function') {
                cleanup()
            }
        }
    }
    // dependency change and no deps array
    const haveDepsChanged = () => {
        if (!deps || deps.length !== prevDeps.current.length) return true
        // return JSON.stringify(prevDeps.current) !== JSON.stringify(deps)
        return !deps.every((dep, index) => Object.is(dep, prevDeps.current[index]));
    }

    if (haveDepsChanged()) {
        const cleanup = cb()
        if (cleanup && typeof cleanup === 'function' && deps) {
            cleanup()
        }
    }
    prevDeps.current = deps || []
    // cleanup
}

// USEMEMO 
// Rules: 
// returns the previously calculated value if deps donyt change
// cleansup on unmount
// runs straightaway

function useMyMemo(cb, deps = []) {
    // variable or state to store the last computed cached value
    const memoisedRef = useRef(null)
    const prevDeps = useRef([])

    // changes in deps
    const haveDepsChanged = () => {
        if (!deps || deps.length !== prevDeps.current.length) return true
        // return JSON.stringify(prevDeps.current) !== JSON.stringify(deps)
        return !deps.every((dep, index) => Object.is(dep, prevDeps.current[index]));
    }

    if (haveDepsChanged()) {
        memoisedRef.current = cb()
        prevDeps.current = deps
    }
    //cleanup logic on unmounting
    useEffect(() => {
        return () => {
            memoisedRef.current = null
        }
    }, [])
    // return the memoised value
    return memoisedRef.current
}



// USESTATE
import { useReducer, useRef } from 'react'

const useMyState = function (initialValue) {
    // forcing rerendering
    const reducerInitialValue = 0
    const reducer = state => {
        return state + 1
    }
    const [, dispatch] = useReducer(reducer, reducerInitialValue)

    // set initial value
    const stateRef = useRef(initialValue)

    // handle cb and values for setState and rerender
    function setState(newValue) {
        if (typeof newValue === 'function') {
            stateRef.current = newValue(stateRef.current)
        } else {
            stateRef.current = newValue
        }
        dispatch()
    }
    return [stateRef.current, setState]
}

// USE REDUCER
import { useState, useRef } from "react";

function useMyReducer(reducer, initialState) {
    const [_, forceRender] = useState(0); // Triggers re-render
    const stateRef = useRef(initialState); // Stores state persistently

    function dispatch(action) {
        stateRef.current = reducer(stateRef.current, action);
        forceRender((x) => x + 1); // Force component re-render
    }

    return [stateRef.current, dispatch];
}

import React from "react";
import useMyReducer from "./useMyReducer";

function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        case "DECREMENT":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useMyReducer(reducer, { count: 0 });

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
            <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        </div>
    );
}

export default Counter;



