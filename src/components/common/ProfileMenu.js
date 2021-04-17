import React from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Typography,
  Avatar,
  Menu,
  withStyles,
} from '@material-ui/core'
import ProfileAvatar from './ProfileAvatar.jpg'
import moment from 'moment'
import Spinner from './Spinner'

const useStyles = makeStyles((theme) => ({
  profileCard: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    zIndex: 1,
  },
  profileAvt: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    margin: '10px auto',
  },
  centerItems: {
    textAlign: 'center',
  },
}))

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

function ProfileMenu({ user, anchorEl2, handleClose2 }) {
  const classes = useStyles()

  return !user.details ? (
    <Spinner />
  ) : (
    <StyledMenu
      id='profile-menu'
      anchorEl={anchorEl2}
      keepMounted
      open={Boolean(anchorEl2)}
      onClose={handleClose2}
    >
      <div className={classes.profileCard}>
        <div className={classes.centerItems}>
          <Avatar
            alt='Profile Avt'
            src={ProfileAvatar}
            className={classes.profileAvt}
          />
        </div>
        <Typography style={{ fontWeight: '700' }}>First Name:</Typography>{' '}
        <Typography>{user.details.first_name}</Typography>
        <Typography style={{ fontWeight: '700' }}>Last Name:</Typography>{' '}
        <Typography>{user.details.last_name}</Typography>
        <Typography style={{ fontWeight: '700' }}>
          Date of Birth:
        </Typography>{' '}
        <Typography>
          {moment.unix(user.details.date_of_birth).format('yyyy/MM/DD')}
        </Typography>
        <Typography style={{ fontWeight: '700' }}>Roles:</Typography>{' '}
        {user.authorities &&
          user.authorities.length > 0 &&
          user.authorities.map((role, idx) => {
            if (idx !== user.authorities.length - 1)
              return <Typography key={idx}>{role}, </Typography>
            else return <Typography key={idx}>{role}</Typography>
          })}
        <Typography style={{ fontWeight: '700' }}>Email:</Typography>{' '}
        <Typography>{user.details.email}</Typography>
        <Typography style={{ fontWeight: '700' }}>Faculty:</Typography>{' '}
        <Typography>{user.details.faculty_code}</Typography>
      </div>
    </StyledMenu>
  )
}

ProfileMenu.propTypes = {
  user: PropTypes.object.isRequired,
}

export default ProfileMenu
