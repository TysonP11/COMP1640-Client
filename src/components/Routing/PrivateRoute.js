import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import Spinner from '../common/Spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  expectedAuthorities,
  ...rest
}) => {
  return loading ? (
    <Spinner />
  ) : (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to='/login' />
        ) : user &&
          user.authorities &&
          expectedAuthorities.filter((exptAuth) =>
            user.authorities.includes(exptAuth)
          ).length === 0 ? (
          <Redirect to='/403error' />
        ) : (
          user && user.authorities && user.details && <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
