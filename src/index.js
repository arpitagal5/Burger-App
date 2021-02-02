import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from 'redux' ;
import { Provider } from 'react-redux' ;
import reducer from '../src/store/reducer';

const store = createStore(reducer);


const app = (
  <Provider store = {store}>
       <BrowserRouter>
       <App />
       </BrowserRouter>
  </Provider>
   
);

ReactDOM.render( app ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//thisversion is without redux


// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import {BrowserRouter} from 'react-router-dom';

// import App from './App';
// import reportWebVitals from './reportWebVitals';
// const app = (
//    <BrowserRouter>
//    <App />
//    </BrowserRouter>
// );

// ReactDOM.render( app ,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
