import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AlertMui from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  alert: {
    zIndex: 999,
    position: 'fixed',
    bottom: '2%',
    right: '2%',
    width: '30%',
    '@media (max-width: 768px)': {
      position: 'fixed',
      bottom: '2%',
      width: '90%',
      left: '50%',
      transform: 'translateX(-50%)'
      
    },
  },
}))

const Alert = ({ alerts }) => {
  const classes = useStyles()

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <AlertMui
        key={alert.id}
        severity={alert.alertType}
        className={classes.alert}
      >
        <AlertTitle>{alert.alertType.toUpperCase()}</AlertTitle>
        {alert.msg}
      </AlertMui>
    ))
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export default connect(mapStateToProps)(Alert)
