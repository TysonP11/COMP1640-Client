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
} from '@material-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppsIcon from '@material-ui/icons/Apps'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

const sideBarWidth = 240
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
  },
  sideBarPaperDrawer: {
    width: sideBarWidth,
  },
}))

const SideBar = ({ window, mobileOpen, handleSideBarToggle }) => {
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
      <MenuItem onClick={handleClose}>
        <Typography>All Articles</Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Typography>Submitted Articles</Typography>
      </MenuItem>
    </Menu>
  )

  const sideBar = (
    <div>
      <div className={classes.toolbar}>
        <List>
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

          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={'Faculty'} />
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

          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItem>
        </List>
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
          {sideBar}
        </Drawer>
      </Hidden>
      <Hidden lgDown implementation='css'>
        <Drawer
          classes={{ paper: classes.sideBarPaper }}
          variant='permanent'
          open
        >
          {sideBar}
        </Drawer>
      </Hidden>
    </nav>
  )
}

SideBar.propTypes = {
  window: PropTypes.func,
}

export default SideBar
