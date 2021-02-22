import { SIGNIN_SUCCESS, SIGNIN_ERROR } from '../actions/types'

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

    case SIGNIN_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {},
        error: payload,
      }

    default:
      return state
  }
}
