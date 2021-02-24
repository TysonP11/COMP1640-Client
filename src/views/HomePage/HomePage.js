import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export const HomePage = ({auth}) => {
    useEffect(()=>{
        console.log(auth)
    },[auth])

    // if(!auth.isAuthenticated || !auth.loading || !auth.user) {
    //     console.log('here')
    //     return null
    // } else {
    //     console.log('other')
    // }
    if(auth.user.authorities.map(authority => authority.authority).indexOf('ROLE_MARKETING_MANAGER') >= 0) {
        console.log('manager')
        return <Redirect to="/marketing-manager-home" />
    } else if (auth.user.authorities.map(authority => authority.authority).indexOf('ROLE_MARKETING_COORDINATOR') >= 0) {
        return <Redirect to="/marketing-coordinator-home" />
    } else if (auth.user.authorities.map(authority => authority.authority).indexOf('ROLE_STUDENT') >= 0) {
        return <Redirect to="/student-home" />
    } else if (auth.user.authorities.map(authority => authority.authority).indexOf('ROLE_GUEST') >= 0) {
        return <Redirect to="/guest-home" />
    } else {
        return null
    }
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
