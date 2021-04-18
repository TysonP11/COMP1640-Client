import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
// import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
// import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import { createUser } from '../../redux/actions/auth'
import { setAlert } from '../../redux/actions/alert'
import PropTypes from 'prop-types'

// function Copyright() {
//   return (
//     <Typography variant='body2' color='textSecondary' align='center'>
//       {'Copyright © '}
//       <Link color='inherit' href='https://material-ui.com/'>
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function Signup({ createUser, history, setAlert }) {
  const classes = useStyles()

  const [dateOfBirth, setDateOfBirth] = useState(moment())
  const [dateOfBirthInputValue, setDateOfBirthInputValue] = useState(
    moment().format('yyyy-MM-DD'),
  )

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    confirmPassword: '',
    facultyCode: 'COMP',
    authority: '2',
  })

  const [usernameErr, setUsernameErr] = useState(false)
  const [passwordErr, sePasswordErr] = useState(false)
  const [firstNameErr, setFirstNameErr] = useState(false)
  const [lastNameErr, setLastNameErr] = useState(false)
  const [phoneNumberErr, setPhoneNumberErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false)
  const [facultyCodeErr, setFacultyCodeErr] = useState(false)
  const [authorityErr, setAuthorityErr] = useState(false)

  const {
    username,
    password,
    firstName,
    lastName,
    phoneNumber,
    email,
    confirmPassword,
    facultyCode,
    authority,
  } = formData

  useEffect(() => {
    if (username.trim() !== '') {
      setUsernameErr(false)
    }

    if (password.trim() !== '') {
      sePasswordErr(false)
    }

    if (firstName.trim() !== '') {
      setFirstNameErr(false)
    }

    if (lastName.trim() !== '') {
      setLastNameErr(false)
    }

    if (phoneNumber.trim() !== '') {
      setPhoneNumberErr(false)
    }

    if (email.trim() !== '') {
      setEmailErr(false)
    }

    if (confirmPassword.trim() !== '') {
      setConfirmPasswordErr(false)
    }

    if (confirmPassword !== password) {
      setConfirmPasswordErr(true)
    }

    if (facultyCode.trim() !== '') {
      setFacultyCodeErr(false)
    }

    if (authority.trim() !== '') {
      setAuthorityErr(false)
    }
  }, [
    username,
    password,
    firstName,
    lastName,
    phoneNumber,
    email,
    confirmPassword,
    facultyCode,
    authority,
  ])

  const handleSubmit = (e) => {
    e.preventDefault()

    let hasErr = false

    if (username.trim() === '') {
      setUsernameErr(true)
      hasErr = true
    }

    if (password.trim() === '') {
      sePasswordErr(true)
      hasErr = true
    }

    if (firstName.trim() === '') {
      setFirstNameErr(true)
      hasErr = true
    }

    if (lastName.trim() === '') {
      setLastNameErr(true)
      hasErr = true
    }

    if (phoneNumber.trim() === '') {
      setPhoneNumberErr(true)
      hasErr = true
    }

    if (email.trim() === '') {
      setEmailErr(true)
      hasErr = true
    }

    if (confirmPassword.trim() === '' || confirmPassword !== password) {
      setConfirmPasswordErr(true)
      hasErr = true
    }

    if (facultyCode.trim() === '') {
      setFacultyCodeErr(true)
      hasErr = true
    }

    if (authority.trim() === '') {
      setAuthorityErr(true)
      hasErr = true
    }

    if (!hasErr) {
      const data = {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        faculty_code: facultyCode,
        roles: [authority],
        date_of_birth: dateOfBirthInputValue,
      }

      createUser(data, history)
    } else {
      setAlert('Create user error', 'error')
    }
  }

  const handleOnChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleOnChangeSubmitDeadline = (date, value) => {
    setDateOfBirth(date)
    setDateOfBirthInputValue(value)
  }

  const dateFormatter = (str) => str

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2} justify='center' alignItems='center'>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                value={firstName}
                onChange={handleOnChangeText}
                error={firstNameErr}
                helperText={firstNameErr ? 'Invalid value!' : ''}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                value={lastName}
                error={lastNameErr}
                helperText={lastNameErr ? 'Invalid value!' : ''}
                onChange={handleOnChangeText}
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='username'
                label='Username'
                type='username'
                value={username}
                error={usernameErr}
                helperText={usernameErr ? 'Invalid value!' : ''}
                onChange={handleOnChangeText}
                id='username'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                value={password}
                error={passwordErr}
                helperText={passwordErr ? 'Invalid value!' : ''}
                onChange={handleOnChangeText}
                id='password'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                value={confirmPassword}
                error={confirmPasswordErr}
                helperText={confirmPasswordErr ? 'Invalid value!' : ''}
                onChange={handleOnChangeText}
                id='confirmPassword'
              />
            </Grid>

            <Grid item sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='phoneNumber'
                label='Phone Number'
                type='phoneNumber'
                value={phoneNumber}
                error={phoneNumberErr}
                helperText={phoneNumberErr ? 'Invalid value!' : ''}
                onChange={handleOnChangeText}
                id='phoneNumber'
              />
            </Grid>

            <Grid item sm={6}>
              <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
                <KeyboardDatePicker
                  name='dateOfBirth'
                  disableToolbar
                  variant='outlined'
                  format='yyyy-MM-DD'
                  margin='normal'
                  id='date-picker-date-of-birth'
                  label='Date of Birth'
                  value={dateOfBirth}
                  inputValue={dateOfBirthInputValue}
                  onChange={handleOnChangeSubmitDeadline}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  rifmFormatter={dateFormatter}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={email}
                error={emailErr}
                helperText={emailErr ? 'Invalid value!' : ''}
                onChange={handleOnChangeText}
                autoComplete='email'
              />
            </Grid>

            <Grid item sm={6}>
              <FormControl
                className={classes.formControl}
                fullWidth
                error={facultyCodeErr}
              >
                <NativeSelect
                  className={classes.selectInput}
                  name='facultyCode'
                  value={facultyCode}
                  onChange={handleOnChangeText}
                >
                  <option value='COMP'>Computer Science and Technology</option>
                  <option value='BUSI'>Business</option>
                  <option value='DESI'>Design</option>
                </NativeSelect>
              </FormControl>
            </Grid>

            <Grid item sm={6}>
              <FormControl
                className={classes.formControl}
                error={authorityErr}
                fullWidth
              >
                <NativeSelect
                  className={classes.selectInput}
                  name='authority'
                  value={authority}
                  onChange={handleOnChangeText}
                >
                  <option value='1'>ROLE_GUEST</option>
                  <option value='2'>ROLE_STUDENT</option>
                  <option value='3'>ROLE_MARKETING_COORDINATOR</option>
                  <option value='4'>ROLE_MARKETING_MANAGER</option>
                </NativeSelect>
              </FormControl>
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  )
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired,
}

export default connect(null, { createUser, setAlert })(Signup)
