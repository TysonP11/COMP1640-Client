import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

import { connect } from 'react-redux'

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  expectedAuthorities,
  ...rest
}) => {
  const [hasAccess, setHasAccess] = useState(true)
  useEffect(() => {
    if (!loading && user.authorities) {
      setHasAccess(
        user.authorities.some(
          (element) => expectedAuthorities.indexOf(element.authority) >= 0,
        ),
      )
    }
  // eslint-disable-next-line
  }, [])
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : isAuthenticated && hasAccess && !loading ? (
          <Component {...props} />
        ) : null
      }
    />
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
