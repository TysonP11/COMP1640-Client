import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import HomeIcon from '@material-ui/icons/Home'
import GrainIcon from '@material-ui/icons/Grain'
import PostAddIcon from '@material-ui/icons/PostAdd'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

function ArticleBreadcrumbs() {
  const classes = useStyles()

  return (
    <Breadcrumbs aria-label='breadcrumb' className={classes.root}>
      <Link color='inherit' href='/' className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      <Link color='inherit' href='/article' className={classes.link}>
        <PostAddIcon className={classes.icon} />
        Article
      </Link>
      <Typography color='textPrimary' className={classes.link}>
        <GrainIcon className={classes.icon} />
        All Articles
      </Typography>
    </Breadcrumbs>
  )
}

export default ArticleBreadcrumbs
