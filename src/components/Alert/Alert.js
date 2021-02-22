import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AlertMui from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  alert: {
    position: 'absolute',
    bottom: '2%',
    right: '0%',
    width: '30%',
    '@media (max-width: 768px)': {
      position: 'absolute',
      bottom: '2%',
      width: '100%',
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
