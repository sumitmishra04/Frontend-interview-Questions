import React, { useState, useRef, useEffect, useCallback } from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

const useDebounce = (fn, delay, option = { leading: true, trailing: true}) => {
  let timeout = useRef(null);
  let isLeadingInvoked = useRef(false);
  
  let debounce = useCallback(function(){
    const context = this;
    const args = arguments;
    
    if(timeout.current){
      clearTimeout(timeout.current);
    }
    
    if(option.leading && !timeout.current){
      fn.apply(context, args);
      isLeadingInvoked.current = true;
    }else{
      isLeadingInvoked.current = false;
    }
    
    timeout.current = setTimeout(() => {
      if(option.trailing && !isLeadingInvoked.current){
        fn.apply(context, args);
      }
      
      timeout.current = null;
    }, delay);
  }, [fn, delay, option]);
  
  return debounce;
};

const App = () => {
  const onChange = (e) => {
    console.log(e.target.value);
  }
  
  const debouncedSearch = useDebounce(onChange, 1000);
  
  return <input type="search" onChange={debouncedSearch} placeholder="Enter your query" />
};

ReactDOM.render(<App />, document.getElementById('root'));