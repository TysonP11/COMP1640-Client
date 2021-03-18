import {
  CREATE_ARTICLE,
  ARTICLE_ERROR,
  GET_ARTICLES,
  GET_ARTICLE,
  UPDATE_ARTICLE,
  CLEAR_ARTICLE,
  SET_ARTICLE_FILTER_PROPS,
} from './types'
import axios from '../../api/axios'
import { setAlert } from './alert'

// set filter props
export const setFilterProps = (props) => (dispatch) => {
  dispatch({
    type: SET_ARTICLE_FILTER_PROPS,
    payload: props,
  })
}

// create article
export const createArticle = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/article', formData)

    dispatch({
      type: CREATE_ARTICLE,
      payload: res.data.data,
    })

    dispatch(setAlert('Create article successfully', 'success'))
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Create campaign error', 'error'))
  }
}

// get all articles
export const getAllArticles = (page) => async (dispatch) => {
  try {
    const config = {
      params: {
        page: page,
      },
    }

    const res = await axios.get('/api/article', config)

    dispatch({
      type: GET_ARTICLES,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get campaigns error', 'error'))
  }
}

// clear article
export const clearArticle = () => (dispatch) => {
  dispatch({
    type: CLEAR_ARTICLE,
  })
}

// get article by id
export const getArticle = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/article/${id}`)

    dispatch({
      type: GET_ARTICLE,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get campaign error', 'error'))
  }
}

// update article
export const updateArticle = (formData, id, getArtcsProps) => async (
  dispatch,
) => {
  try {
    const res = await axios.put(`/api/article/update/${id}`, formData)

    dispatch({
      type: UPDATE_ARTICLE,
      payload: res.data.data,
    })

    const { props, code, page } = getArtcsProps

    dispatch(getArticlesByProps(props, code, page))

    dispatch(setAlert('Update article successfully', 'success'))
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Update campaign error', 'error'))
  }
}

// get articles by faculty
export const getArticlesByFaculty = (code, page) => async (dispatch) => {
  try {
    const config = {
      params: {
        code: code,
        page: page,
      },
    }

    const res = await axios.get('/api/article/get-by-faculty', config)

    dispatch({
      type: GET_ARTICLES,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get articles by faculty error', 'error'))
  }
}

// get articles by campaign
export const getArticlesByCampaign = (code, page) => async (dispatch) => {
  try {
    const config = {
      params: {
        code: code,
        page: page,
      },
    }

    const res = await axios.get('/api/article/get-by-campaign', config)

    dispatch({
      type: GET_ARTICLES,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get articles by campaign error', 'error'))
  }
}

// get articles by user
export const getArticlesByUser = (username, page) => async (dispatch) => {
  try {
    const config = {
      params: {
        username: username,
        page: page,
      },
    }

    const res = await axios.get('/api/article/get-by-user', config)

    dispatch({
      type: GET_ARTICLES,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get articles by user error', 'error'))
  }
}

// get articles by status
export const getArticlesByStatus = (status, page) => async (dispatch) => {
  try {
    const config = {
      params: {
        status: status,
        page: page,
      },
    }

    const res = await axios.get('/api/article/get-by-status', config)

    dispatch({
      type: GET_ARTICLES,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get articles by status error', 'error'))
  }
}

// get articles by props
export const getArticlesByProps = (props, code, page) => async (dispatch) => {
  try {
    const limit = 9

    let res

    if (props) {
      if (
        props.username.trim() !== '' &&
        props.campaignCode.trim() === '' &&
        props.status.trim() === ''
      ) {
        res = await axios.get('/api/article/get-by-faculty-user', {
          params: { faculty_code: code, username: props.username, page, limit },
        })
      }

      if (
        props.campaignCode.trim() !== '' &&
        props.username.trim() === '' &&
        props.status.trim() === ''
      ) {
        res = await axios.get('/api/article/get-by-faculty-campaign', {
          params: {
            faculty_code: code,
            campaign_code: props.campaignCode,
            page,
            limit,
          },
        })
      }

      if (
        props.status.trim() !== '' &&
        props.username.trim() === '' &&
        props.campaignCode.trim() === ''
      ) {
        res = await axios.get('/api/article/get-by-faculty-status', {
          params: { code: code, status: props.status, page, limit },
        })
      }

      if (
        props.status.trim() !== '' &&
        props.username.trim() !== '' &&
        props.campaignCode.trim() === ''
      ) {
        res = await axios.get('/api/article/get-by-faculty-status-user', {
          params: {
            faculty_code: code,
            status: props.status,
            username: props.username,
            page,
            limit,
          },
        })
      }

      if (
        props.status.trim() === '' &&
        props.username.trim() !== '' &&
        props.campaignCode.trim() !== ''
      ) {
        res = await axios.get('/api/article/get-by-faculty-campaign-user', {
          params: {
            faculty_code: code,
            campaign_code: props.campaignCode,
            username: props.username,
            page,
            limit,
          },
        })
      }

      if (
        props.status.trim() !== '' &&
        props.username.trim() === '' &&
        props.campaignCode.trim() !== ''
      ) {
        res = await axios.get('/api/article/get-by-faculty-status-campaign', {
          params: {
            faculty_code: code,
            campaign_code: props.campaignCode,
            status: props.status,
            page,
            limit,
          },
        })
      }

      if (
        props.status.trim() !== '' &&
        props.username.trim() !== '' &&
        props.campaignCode.trim() !== ''
      ) {
        res = await axios.get(
          '/api/article/get-by-faculty-campaign-user-status',
          {
            params: {
              faculty_code: code,
              campaign_code: props.campaignCode,
              username: props.username,
              status: props.status,
              page,
              limit,
            },
          },
        )
      }

      if (
        props.status.trim() === '' &&
        props.username.trim() === '' &&
        props.campaignCode.trim() === ''
      ) {
        res = await axios.get('/api/article/get-by-faculty', {
          params: { code: code, page, limit },
        })
      }
    }

    dispatch({
      type: GET_ARTICLES,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get articles by props error', 'error'))
  }
}

// get articles by faculty and status
export const getArticlesByFacultyAndStatus = (code, status, page) => async (
  dispatch,
) => {
  try {
    const config = {
      params: {
        code: code,
        status: status,
        page: page,
      },
    }

    const res = await axios.get('/api/article/get-by-faculty-status', config)

    dispatch({
      type: GET_ARTICLES,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get articles by faculty and status error', 'error'))
  }
}

// get articles by faculty and status and campaign
export const getArticlesByFacultyAndStatusAndCampaign = (
  facultyCode,
  status,
  campaignCode,
  page,
) => async (dispatch) => {
  try {
    const config = {
      params: {
        faculty_code: facultyCode,
        status: status,
        campaign_code: campaignCode,
        page: page,
      },
    }

    const res = await axios.get(
      '/api/article/get-by-faculty-status-campaign',
      config,
    )

    dispatch({
      type: GET_ARTICLES,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get articles by faculty and status error', 'error'))
  }
}
