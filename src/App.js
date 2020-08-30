import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { isLoggedInUser } from './actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!auth.authenticated){
      dispatch(isLoggedInUser());
    }
   }, []);  

  return (
    <div className="App">
        <Router>
          {/* For Logged in user */}
          <PrivateRoute path="/" exact component={HomePage}/>

          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={RegisterPage}/>
        </Router>
    </div>
  );
}

export default App;
