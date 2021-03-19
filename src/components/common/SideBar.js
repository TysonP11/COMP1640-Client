import {
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  Typography,
  useTheme,
  MenuItem,
  Avatar,
} from '@material-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppsIcon from '@material-ui/icons/Apps'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ProfileAvatar from './ProfileAvatar.jpg'
import ProfileBackground from './ProfileBackground.jpg'
import HomeIcon from '@material-ui/icons/Home'
import LineStyleIcon from '@material-ui/icons/LineStyle'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'

const sideBarWidth = '13vw'
const appBarHeight = 64
const useStyles = makeStyles((theme) => ({
  sidebar: {
    [theme.breakpoints.up('sm')]: {
      width: sideBarWidth,
      flexShrink: 1,
    },
  },
  toolbar: theme.mixins.toolbar,
  sideBarPaper: {
    width: sideBarWidth,
    marginTop: appBarHeight,
    backgroundColor: '#eeeeee',
  },
  sideBarPaperDrawer: {
    width: 260,
  },
  profileCard: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    background: `url(${ProfileBackground}) no-repeat center center/cover`,
    zIndex: 1,
    boxShadow: 'inset 20px 16px 150px #000000, inset -20px -16px 150px #000000',
  },
  profileAvt: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: '10px auto',
  },
  centerItems: {
    textAlign: 'center',
  },
}))

const SideBar = ({
  window,
  mobileOpen,
  handleSideBarToggle,
  user,
  handleSignout,
}) => {
  const classes = useStyles()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  const guestMenu = (
    <>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>
          <Link href='/home' color='inherit'>
            Home
          </Link>
        </ListItemText>
      </ListItem>
      <Divider />
    </>
  )

  const managerMenu = (
    <>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>
          <Link href='/home' color='inherit'>
            Home
          </Link>
        </ListItemText>
      </ListItem>
      <Divider />

      <ListItem button>
        <ListItemIcon>
          <LineStyleIcon />
        </ListItemIcon>
        <ListItemText>
          <Link href='/dashboard' color='inherit'>
            Dashboard
          </Link>
        </ListItemText>
      </ListItem>
      <Divider />

      <ListItem button>
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText>
          <Link href='/campaign' color='inherit'>
            Campaign
          </Link>
        </ListItemText>
      </ListItem>
      <Divider />
    </>
  )

  const articleMenu = (
    <Menu
      id='simple-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <Typography>
          <Link href='/article/create' color='inherit'>
            Create Article
          </Link>
        </Typography>
      </MenuItem>
      {user.authorities.includes('ROLE_MARKETING_COORDINATOR') ? (
        <MenuItem onClick={handleClose}>
          <Typography>
            <Link href='/article' color='inherit'>
              All Articles
            </Link>
          </Typography>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleClose}>
          <Typography>
            <Link href='/article' color='inherit'>
              Submitted Articles
            </Link>
          </Typography>
        </MenuItem>
      )}
    </Menu>
  )

  const stucoorMenu = (
    <>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>
          <Link href='/home' color='inherit'>
            Home
          </Link>
        </ListItemText>
      </ListItem>
      <Divider />

      <ListItem button>
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary={'Article'} onClick={handleClick} />
        {articleMenu}
      </ListItem>
      <Divider />
    </>
  )

  const sideBar = (
    <div>
      <div className={classes.toolbar}>
        <List>
          {user.authorities.includes('ROLE_MARKETING_MANAGER') && (
            <>{managerMenu}</>
          )}

          {user.authorities.includes('ROLE_GUEST') && <>{guestMenu}</>}

          {user.authorities.includes('ROLE_MARKETING_COORDINATOR') && (
            <>{stucoorMenu}</>
          )}

          {user.authorities.includes('ROLE_STUDENT') && <>{stucoorMenu}</>}

          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItem>

          <ListItem button onClick={(e) => handleSignout()}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Signout'} />
          </ListItem>
        </List>
      </div>
    </div>
  )

  const profile = (
    <div>
      <div className={classes.profileCard}>
        <div className={classes.centerItems}>
          <Avatar
            alt='Profile Avt'
            src={ProfileAvatar}
            className={classes.profileAvt}
          />
          <Typography variant='h4' style={{ color: '#fff' }}>
            {user.details.first_name} {user.details.last_name}
          </Typography>
        </div>
        {/* <Typography style={{ color: '#fff' }}>Role:</Typography>
        {user.authorities.map((a, idx) => (
          <Typography key={idx} style={{ color: '#fff' }}>- {a.slice(5)}</Typography>
        ))}
        <Typography style={{ color: '#fff' }}>
          Date of Birth:{' '}
          {moment.unix(user.details.date_of_birth).format('yyyy-MM-DD')}
        </Typography>
        <Typography style={{ color: '#fff' }}>
          Faculty: {user.details.faculty_code}
        </Typography> */}
      </div>
    </div>
  )

  return (
    <nav className={classes.sidebar}>
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleSideBarToggle}
          classes={{
            paper: classes.sideBarPaperDrawer,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {profile}
          {sideBar}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation='css'>
        <Drawer
          classes={{ paper: classes.sideBarPaper }}
          variant='permanent'
          open
        >
          {profile}
          {sideBar}
        </Drawer>
      </Hidden>
    </nav>
  )
}

SideBar.propTypes = {
  window: PropTypes.func,
  handleSignout: PropTypes.func.isRequired,
  handleSideBarToggle: PropTypes.func,
  user: PropTypes.object.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
}

export default SideBar
