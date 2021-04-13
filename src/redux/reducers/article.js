import {
  CREATE_ARTICLE,
  ARTICLE_ERROR,
  GET_ARTICLES,
  GET_ARTICLE,
  UPDATE_ARTICLE,
  CLEAR_ARTICLE,
  SET_ARTICLE_FILTER_PROPS
} from '../actions/types'

const initialState = {
  filterProps: {},
  article: null,
  pagination: null,
  articles: [],
  loading: true,
  error: {},
}

export default function articleReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_ARTICLE_FILTER_PROPS:
      return {
        ...state,
        filterProps: payload,
        loading: false,
        error: {}
      }

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
        pagination: payload.pagination,
        articles: payload.page_data,
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

    case CLEAR_ARTICLE: {
      return {
        ...state,
        article: {},
        loading: false,
        error: {},
      }
    }

    default:
      return state
  }
}
