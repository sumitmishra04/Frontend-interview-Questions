// Using fragment, the semantic is not broken. else we would have used div and 
// it would have broken dl> dt/dd semantic flow

import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}


// Fragments can have key prop
{props.items.map(item => (
    <Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  ))}

  // use short syntax when you dont need any props
  function ListItem({ item }) {
    return (
      <>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </>
    );
  }
  
