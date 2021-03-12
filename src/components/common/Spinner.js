import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    width: '100%'
  },
}))

const Spinner = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress color='secondary' size={100} />
    </div>
  )
}

export default Spinner
