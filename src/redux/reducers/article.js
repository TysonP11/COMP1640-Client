import {
  CREATE_ARTICLE,
  ARTICLE_ERROR,
  GET_ARTICLES,
  GET_ARTICLE,
  UPDATE_ARTICLE,
} from '../actions/types'

const initialState = {
  article: {},
  articles: [],
  loading: true,
  error: {},
}

export default function articleReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false,
        error: {},
      }

    case GET_ARTICLES:
      return {
        ...state,
        articles: payload,
        loading: false,
        error: {},
      }

    case GET_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false,
        error: {},
      }

    case UPDATE_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false,
        error: {},
      }

    case ARTICLE_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      }
    }

    default:
      return state
  }
}
