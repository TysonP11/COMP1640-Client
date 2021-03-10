import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  AUTH_ERROR,
  USER_LOADED,
} from '../actions/types'

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: {},
  error: {},
}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SIGNIN_SUCCESS:
      localStorage.setItem('token', payload.access_token)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: {},
      }
    case AUTH_ERROR:
    case SIGNIN_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {},
        error: payload,
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: {
          username: payload.username,
          details: payload.details,
          authorities: payload.authorities.map((a) => a.authority),
        },
      }

    default:
      return state
  }
}
