// const debounce = (fn, delay) => {
//   let timeout;
  
//   return function(...args){
//     const context = this;
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fn.apply(this, args);
//     }, delay);
//   }
// }

const debounce = (fn, delay, option = { leading: true, trailing: true}) => {
    let timeout;
    let isLeadingInvoked = false;
    
    return function (...args) {
      const context = this;
      
      if(timeout){
        clearTimeout(timeout);
      }
      
      if(option.leading && !timeout){
        fn.apply(context, args);
        isLeadingInvoked = true;
      }else{
        isLeadingInvoked = false;
      }
      
      timeout = setTimeout(() => {
        if(option.trailing && !isLeadingInvoked){
          fn.apply(context, args);
        }
        
        timeout = null;
      }, delay);
    }
  }
  
  const onChange = (e) => {
    console.log(e.target.value);
  }
  
  const debouncedSearch = debounce(onChange, 1000);
  
  const input = document.getElementById("search");
  input.addEventListener('keyup', debouncedSearch);