import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './test.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

ReactDOM.render(
  <SignIn/>,
  document.body
);
