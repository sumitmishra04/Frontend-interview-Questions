// useEffect is not a lifecycle hook
// the mental model is synchronization
/**
    The question is not "when does this effect run", the question is "with which
    state does this effect synchronize with"

    useEffect(fn) // all state
    useEffect(fn, []) // no state
    useEffect(fn, [these state])

 */


    useEffect(() =>{
       doSomething() // Effect
    }, [dependencies]) // Dep array


    /**
       React is suppose to be a declarative framweork
       Imperative: when smth happen like form submitted, execute this effect
     */

    /**
     * effect should happen when things happen not when things change
     */

    /**
     * when to use useMemo
     * when to use useCallback
     */