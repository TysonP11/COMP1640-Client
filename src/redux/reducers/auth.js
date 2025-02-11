import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  AUTH_ERROR,
  USER_LOADED,
  SIGNOUT,
  GET_USERS,
  USER_ERROR,
} from '../actions/types'

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: {},
  users: [],
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

    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }

    case GET_USERS: {
      return {
        ...state,
        loading: false,
        users: payload,
        error: {},
      }
    }

    case SIGNOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {},
        error: {},
      }

    default:
      return state
  }
}
