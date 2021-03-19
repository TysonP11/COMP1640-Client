import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'

const useStyle = makeStyles(() => ({
  root: {
    textAlign: 'center',
    border: '2px solid #333',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f44336',
  },
}))

function UnauthorizationPage() {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <ReportProblemOutlinedIcon
        fontSize='large'
        style={{ color: '#000', fontSize: 72 }}
      />
      <Typography variant='h4'>
        Oops! You do not have permission to access this page
      </Typography>
      <Button
        style={{ marginTop: 15 }}
        variant='contained'
        href='/home'
      >
        Back Home
      </Button>
    </div>
  )
}
export default UnauthorizationPage
