import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../Common/Spinner'
import { Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  elPiece: {
    padding: theme.spacing(2),
  },
}))

function Glossary({ elements }) {
  const classes = useStyles()

  return elements && elements.length > 0 ? (
    elements.map((el, idx) => (
      <Grid container spacing={1} key={idx} >
        <Grid item xs={3}>
          <div
            className={classes.elPiece}
            style={{ backgroundColor: `${el.color}` }}
          ></div>
        </Grid>

        <Grid item xs={9}>
          <Typography>{el.text}</Typography>
        </Grid>
      </Grid>
    ))
  ) : (
    <Spinner />
  )
}

Glossary.propTypes = {
  elements: PropTypes.array.isRequired,
}

export default Glossary
