import React, { useState } from 'react'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import { signout } from '../../redux/actions/auth'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PostAddIcon from '@material-ui/icons/PostAdd'
import GrainIcon from '@material-ui/icons/Grain'
import Tooltip from '@material-ui/core/Tooltip'
import ControlPointIcon from '@material-ui/icons/ControlPoint'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideBar from './SideBar'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#eeeeee',
    color: '#333',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}))

export const PrimarySearchAppBar = ({
  auth: { isAuthenticated, loading, user },
  signout,
}) => {
  const classes = useStyles()

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSideBarToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignout = () => {
    signout()
  }

  return (
    <div className={classes.grow}>
      {!loading && isAuthenticated && user && user.details && (
        <SideBar
          mobileOpen={mobileOpen}
          handleSideBarToggle={handleSideBarToggle}
          user={user}
          handleSignout={handleSignout}
        />
      )}

      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          {loading || !isAuthenticated || !user ? (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={handleSideBarToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography className={classes.title} variant='h6' noWrap>
            <Link href='/home' underline='none' color='inherit'>
              G - Mag
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {loading || !isAuthenticated || !user ? (
              <Tooltip title='Signin'>
                <IconButton color='inherit' href='/login'>
                  <ExitToAppOutlinedIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Tooltip title='Article'>
                  <IconButton color='inherit' onClick={handleClick}>
                    <PostAddIcon />
                  </IconButton>
                </Tooltip>
                <StyledMenu
                  id='customized-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <GrainIcon fontSize='small' />
                    </ListItemIcon>
                    <Link href='/article' color='inherit'>
                      <ListItemText primary='All Articles' />
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ControlPointIcon fontSize='small' />
                    </ListItemIcon>
                    <Link href='/campaign' color='inherit'>
                      <ListItemText primary='Create Article' />
                    </Link>
                  </MenuItem>
                </StyledMenu>
                <Tooltip title='Campaign'>
                  <IconButton color='inherit' href='/campaign'>
                    <DashboardIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Signout'>
                  <IconButton color='inherit' onClick={(e) => handleSignout()}>
                    <ExitToAppOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

PrimarySearchAppBar.propTypes = {
  auth: PropTypes.object.isRequired,
  signout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { signout })(PrimarySearchAppBar)
