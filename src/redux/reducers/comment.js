import {
  ADD_COMMENT,
  COMMENT_COUNT,
  COMMENT_ERROR,
  GET_COMMENTS,
} from '../actions/types'

const initialState = {
  comments: [],
  loading: true,
  commentCount: null,
  error: {},
}

export default function articleReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
        loading: false,
        error: {},
      }
    case COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case COMMENT_COUNT:
      return {
        ...state,
        loading: false,
        commentCount: payload,
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: payload,
        loading: false,
        error: {},
      }
    default:
      return state
  }
}
