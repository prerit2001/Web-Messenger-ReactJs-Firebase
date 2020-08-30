import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux'
import store from './store'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGJBtkcACt0aOgmvIdibf52H7oLHiNTA8",
    authDomain: "web-messanger-381d9.firebaseapp.com",
    databaseURL: "https://web-messanger-381d9.firebaseio.com",
    projectId: "web-messanger-381d9",
    storageBucket: "web-messanger-381d9.appspot.com",
    messagingSenderId: "432040194338",
    appId: "1:432040194338:web:55df77c4b1dfcfb0abb57b",
    measurementId: "G-9Q6KYGPB43"
};

firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
