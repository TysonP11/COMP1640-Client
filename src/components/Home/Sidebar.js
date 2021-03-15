import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}))

export default function Sidebar({
  campaigns,
  description,
  social,
  title,
  getArtcsByCampaign,
}) {
  const classes = useStyles()

  return (
    <Grid item xs={12} md={3}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant='h6' gutterBottom className={classes.sidebarSection}>
        Campaigns
      </Typography>
      {campaigns.map((campaign, idx) => (
        <Link
          display='block'
          variant='body1'
          key={idx}
          style={{ cursor: 'pointer' }}
          onClick={(e) => getArtcsByCampaign(campaign.code)}
        >
          {campaign.code}
        </Link>
      ))}
      <Typography variant='h6' gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map((network, idx) => (
        <Link
          display='block'
          variant='body1'
          href={network.dest}
          key={idx}
          target='_blank'
        >
          <Grid container direction='row' spacing={1} alignItems='center'>
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  )
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
}
