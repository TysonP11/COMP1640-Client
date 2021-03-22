import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  SIGNOUT,
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
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// sign out
export const signout = () => (dispatch) => {
  dispatch({
    type: SIGNOUT,
  })
}
