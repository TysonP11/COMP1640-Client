import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import HomePage from './views/HomePage/HomePage';
import CampaignPage from './views/CampaignPage/CampaignPage';
import CreateArticlePage from './views/ArticlePage/CreateArticlePage';
import AllArticlesPage from './views/ArticlePage/AllArticlesPage';

import Alert from './components/Alert/Alert';
import PrivateRoute from './components/Routing/PrivateRoute';
import { loadUser } from './redux/actions/auth';
import MenuAppBar from './components/Common/MenuAppBar';
import UnauthorizationPage from './components/Common/UnauthorizationPage';
import { Container } from '@material-ui/core';
import ArticleDetailPage from './views/ArticlePage/ArticleDetailPage';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  sidebarSpace: {
    width: 260,
  },
  '@media (max-width: 1280px)': {
    sidebarSpace: {
      width: 0,
    },
  },
}));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const classes = useStyles();

  return (
    <Provider store={store}>
      <Router>
        <MenuAppBar />
        <Alert />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={LoginPage} />
        <div className={classes.appContainer}>
          <div className={classes.sidebarSpace}></div>

          <Container maxWidth='lg' style={{ marginTop: 70 }}>
            <PrivateRoute
              exact
              path='/403error'
              component={UnauthorizationPage}
              expectedAuthorities={[
                'ROLE_GUEST',
                'ROLE_STUDENT',
                'ROLE_MARKETING_COORDINATOR',
                'ROLE_MARKETING_MANAGER',
              ]}
            />
            <Switch>
              <PrivateRoute
                exact
                path='/home'
                component={HomePage}
                expectedAuthorities={[
                  'ROLE_GUEST',
                  'ROLE_STUDENT',
                  'ROLE_MARKETING_COORDINATOR',
                ]}
              />
              <PrivateRoute
                exact
                path='/campaign'
                component={CampaignPage}
                expectedAuthorities={['ROLE_MARKETING_MANAGER']}
              />
              <PrivateRoute
                exact
                path='/article/create'
                component={CreateArticlePage}
                expectedAuthorities={['ROLE_STUDENT']}
              />
              <PrivateRoute
                exact
                path='/article'
                component={AllArticlesPage}
                expectedAuthorities={[
                  'ROLE_STUDENT',
                  'ROLE_MARKETING_COORDINATOR',
                ]}
              />
              <PrivateRoute
                exact
                path='/article/:id'
                component={ArticleDetailPage}
                expectedAuthorities={[
                  'ROLE_STUDENT',
                  'ROLE_MARKETING_COORDINATOR',
                  'ROLE_MARKETING_MANAGER',
                  'ROLE_GUEST',
                ]}
              />
            </Switch>
          </Container>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
