import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';


import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import Footer from './components/layout/Footer';
import './App.css'
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

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
        <Route exact path='/' component={Landing}/>
        <section className="container">
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