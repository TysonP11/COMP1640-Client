import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css'
import { Provider } from 'react-redux';
import store from './store';


import setAuthToken from './utils/setAuthToken';


import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';



if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    setAuthToken(localStorage.token);
    //store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      
      <Router>
        <Fragment>
        <Navbar />
        <Route exact path='/'>
          <Redirect to="/register" />
        </Route>
        <section className="container">
          <Alert></Alert>
        
          <Switch>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
          </Switch>
        
        </section>
        </Fragment>
      </Router>
    </Provider>
);
};

export default App;