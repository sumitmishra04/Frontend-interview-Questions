import { useReducer } from "react"

const hooks = []
const currIdx = 0

const [,rerender] = useReducer(() => ({}))
function forceUpdate() {
  rerender()
}
function useState(initialValue) {
  const hookIdx = currIdx
  hooks[hookIdx] = hookIdx ?? initialValue
  function setState(nextValue) {
    hooks[hookIdx] = nextValue
    forceUpdate()
  }
  currIdx++
  return [hooks[hookIdx], setState]
}

// https://rahuulmiishra.medium.com/creating-a-polyfill-for-usestate-in-reactjs-a-step-by-step-guide-20dcee6cef74

function useEffect(cb,deps) {
  const hookIdx = currIdx
  const oldHook = hooks[hookIdx]
  let shouldRun = true
  if(oldHook) {
    shouldRun = deps.some((dep,i) => {
      !Object.is(deps, hooks[hookIdx].deps[i])
    })
  }
  if(shouldRun) {
    oldHook?.cleanup?.()
    const cleanup = cb()
    hooks[hookIdx] = {deps, cleanup}
  }
  currIdx++
}

function useMemo(cb,deps) {
  const hookIdx = currIdx
  const oldHook = hooks[hookIdx]
  let shouldRun = true
  if(oldHook) {
    shouldRun = deps.some((dep,i) => !Object.is(dep, oldHook.deps[i]))
  }
  if(shouldRun || !oldHook) {
    const result = oldHook()
    hooks[hookIdx] = {result,deps}
  }
  currIdx++
  return hooks[hookIdx].result
}