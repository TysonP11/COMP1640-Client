import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  SIGNOUT,
  GET_USERS,
  USER_ERROR,
} from '../actions/types'
import axios from '../../api/axios'
import setAuthToken from '../../utils/setAuthToken'
import { setAlert } from './alert'

// login
export const signin = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', formData)

    const payload = res.data.data

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: payload,
    })

    dispatch(loadUser())
  } catch (err) {
    console.error(err)

    dispatch({
      type: SIGNIN_ERROR,
      payload: { msg: err.message },
    })

    dispatch(setAlert('Authentication error!', 'error'))
  }
}

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/auth/load-user')

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err)
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// get user by faculty and role
export const getUsersByRole = (roleId) => async (dispatch) => {
  try {
    const config = {
      params: {
        role_id: roleId,
      },
    }

    const res = await axios.get('/api/auth/get-user-by-role', config)

    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err)
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message },
    })
  }
}

export const createUser = (formData, history) => async (dispatch) => {
  try {
    await axios.post('/api/auth/signup', formData)

    dispatch(setAlert('Create user successfully', 'success'))

    history.push('/home')
  } catch (err) {
    console.error(err)
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Create user error', 'error'))
  }
}

// sign out
export const signout = () => (dispatch) => {
  dispatch({
    type: SIGNOUT,
  })
}
