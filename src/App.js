import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import setAuthToken from './utils/setAuthToken'
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import HomePage from './views/HomePage/HomePage'
import CampaignPage from './views/CampaignPage/CampaignPage'
import CreateArticlePage from './views/ArticlePage/CreateArticlePage'

import Alert from './components/Alert/Alert'
import PrivateRoute from './components/Routing/PrivateRoute'
import { loadUser } from './redux/actions/auth'
import MenuAppBar from './components/Common/MenuAppBar'
import { Container } from '@material-ui/core'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <MenuAppBar />
        <Alert />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={LoginPage} />
        <Container maxWidth='lg' style={{ marginTop: 70 }}>
          <Switch>
            <PrivateRoute
              exact
              path='/home'
              component={HomePage}
              expectedAuthorities={[
                'ROLE_STUDENT',
                'ROLE_MARKETING_COORDINATOR',
              ]}
            />
            <PrivateRoute
              exact
              path='/campaign'
              component={CampaignPage}
              expectedAuthorities={['ROLE_ADMIN']}
            />
            <PrivateRoute
              exact
              path='/article/create'
              component={CreateArticlePage}
              expectedAuthorities={['ROLE_STUDENT']}
            />
          </Switch>
        </Container>
      </Router>
    </Provider>
  )
}

export default App
