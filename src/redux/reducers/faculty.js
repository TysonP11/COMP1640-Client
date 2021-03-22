import {GET_FACULTY, FACULTY_ERROR} from '../actions/types'

const initialState = {
  loading: true,
  faculty: {},
  error: {},
}

export default function facultyReducer(state = initialState, action) {
    const { type, payload } = action
  
    switch (type) {
      case GET_FACULTY:
        return {
          ...state,
          loading: false,
          faculty: payload,
          error: {},
        }
      case FACULTY_ERROR:
        
        return {
          ...state,
          loading: false,
          faculty: {},
          error: payload,
        }
      default:
        return state
    }
  }