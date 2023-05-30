// ARIA ->  Accessible Rich Internet Applications 
// Note that all aria-* HTML attributes are fully supported in JSX
// in react these aria attributes should be hyphen-cased

<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>

// Semantic HTML is the foundation of accessibility in a web application.
// Every HTML form control, such as <input> and <textarea>, needs to be labeled accessibly. 
// Ensure that your web application can be fully operated with the keyboard only
// Also use landmark elements and roles, such as <main> and <aside>, 
// to demarcate page regions as assistive technology allow the user to quickly navigate to these sections.
