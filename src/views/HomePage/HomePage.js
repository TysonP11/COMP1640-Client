import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export const HomePage = ({auth}) => {

    // if(!auth.isAuthenticated || !auth.loading || !auth.user) {
    //     console.log('here')
    //     return null
    // } else {
    //     console.log('other')
    // }
    return auth.loading || !auth.user || !auth.user.authorities ? null : (
        auth.user.authorities.map(authority => authority.authority).indexOf('ROLE_MARKETING_MANAGER') >= 0 ?               
            <Redirect to="/marketing-manager-home" />
        : auth.user.authorities.map(authority => authority.authority).indexOf('ROLE_MARKETING_COORDINATOR') >= 0 ?
            <Redirect to="/marketing-coordinator-home" />
        : auth.user.authorities.map(authority => authority.authority).indexOf('ROLE_STUDENT') >= 0 ?
            <Redirect to="/student-home" />
        : auth.user.authorities.map(authority => authority.authority).indexOf('ROLE_GUEST') >= 0 ?
            <Redirect to="/guest-home" />
        : null
    )  
}

HomePage.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
