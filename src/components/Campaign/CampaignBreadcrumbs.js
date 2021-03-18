import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import HomeIcon from '@material-ui/icons/Home'
import GrainIcon from '@material-ui/icons/Grain'
import AppsIcon from '@material-ui/icons/Apps'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}))

function CampaignBreadcrumbs() {
  const classes = useStyles()

  return (
    <Breadcrumbs aria-label='breadcrumb' className={classes.root}>
      <Link color='inherit' href='/home' className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      <Link color='inherit' href='/campaign' className={classes.link}>
        <AppsIcon className={classes.icon} />
        Campaign
      </Link>
      <Typography color='textPrimary' className={classes.link}>
        <GrainIcon className={classes.icon} />
        All Campaigns
      </Typography>
    </Breadcrumbs>
  )
}

export default CampaignBreadcrumbs
