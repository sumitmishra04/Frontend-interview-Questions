// 🎯 Create Redux Polyfill using Observer Pattern
function createStore(reducer, initialState) {
    let state = initialState; // Holds the current state
    let listeners = []; // List of subscribers

    return {
        // 🔥 Returns the current state
        getState() {
            return state;
        },

        // 🔥 Dispatch supports both normal actions & async functions
        dispatch(action) {
            if (typeof action === "function") {
                return action(this.dispatch.bind(this), this.getState.bind(this)); // Async Thunk-like behavior
            }
            state = reducer(state, action); // Update state using reducer
            listeners.forEach(listener => listener()); // Notify all subscribers
        },

        // 🔥 Subscribe to state changes
        subscribe(listener) {
            listeners.push(listener); // Add subscriber
            return () => {
                listeners = listeners.filter(l => l !== listener); // Unsubscribe
            };
        }
    };
}

// 🎯 Reducer Function
function counterReducer(state = { count: 0 }, action) {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        case "DECREMENT":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

// ✅ Create Store
const store = createStore(counterReducer, { count: 0 });

// ✅ Subscribe to state changes
const unsubscribe = store.subscribe(() => {
    console.log("State changed:", store.getState());
});

// ✅ Dispatch Actions
store.dispatch({ type: "INCREMENT" }); // State changed: { count: 1 }
store.dispatch({ type: "INCREMENT" }); // State changed: { count: 2 }
store.dispatch({ type: "DECREMENT" }); // State changed: { count: 1 }

// ✅ Unsubscribe
unsubscribe();

store.dispatch({ type: "INCREMENT" }); // No log (unsubscribed)



// ✅ Dispatch Async Action (Thunk-like)
function asyncIncrement() {
    return (dispatch, getState) => {
        console.log("Fetching data...");
        setTimeout(() => {
            console.log("Async operation done!");
            dispatch({ type: "INCREMENT" }); // Dispatch actual action after async
        }, 2000);
    };
}

store.dispatch(asyncIncrement()); // Fetching data... (waits 2s) → Async operation done! → State changed: { count: 2 }
