import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export const HomePage = ({ auth }) => {
  return auth.loading ||
    !auth.user ||
    !auth.user.authorities ? null : auth.user.authorities
      .map((authority) => authority.authority)
      .indexOf('ROLE_MARKETING_MANAGER') >= 0 ? (
    <Redirect to='/dashboard' />
  ) : auth.user.authorities
      .map((authority) => authority.authority)
      .indexOf('ROLE_MARKETING_COORDINATOR') >= 0 ? (
    <Redirect to='/marketing-coordinator-home' />
  ) : auth.user.authorities
      .map((authority) => authority.authority)
      .indexOf('ROLE_STUDENT') >= 0 ? (
    <Redirect to='/student-home' />
  ) : auth.user.authorities
      .map((authority) => authority.authority)
      .indexOf('ROLE_GUEST') >= 0 ? (
    <Redirect to='/guest-home' />
  ) : null
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
