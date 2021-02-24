import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import setAuthToken from './utils/setAuthToken'
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import HomePage from './views/HomePage/HomePage'
import Alert from './components/Alert/Alert'
import PrivateRoute from './components/Routing/PrivateRoute'
import { loadUser } from './redux/actions/auth'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token)
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={LoginPage} />

          <PrivateRoute exact path='/home' component={HomePage} expectedAuthorities={['ROLE_STUDENT','ROLE_MARKETING_COORDINATOR']} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
