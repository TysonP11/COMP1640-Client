import {
  CREATE_ARTICLE,
  ARTICLE_ERROR,
  GET_ARTICLES,
  GET_ARTICLE,
  UPDATE_ARTICLE,
} from './types'
import axios from '../../api/axios'
import { setAlert } from './alert'

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
export const getAllArticles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/article')

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
export const updateArticle = (formData, id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/article/update/${id}`, formData)

    dispatch({
      type: UPDATE_ARTICLE,
      payload: res.data.data,
    })

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
export const getArticlesByFaculty = (code) => async (dispatch) => {
  try {
    const config = {
      params: {
        code: code,
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
export const getArticlesByCampaign = (code) => async (dispatch) => {
  try {
    const config = {
      params: {
        code: code,
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
export const getArticlesByUser = (username) => async (dispatch) => {
  try {
    const config = {
      params: {
        username: username,
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
export const getArticlesByStatus = (status) => async (dispatch) => {
  try {
    const config = {
      params: {
        status: status,
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
export const getArticlesByProps = (props, code) => async (dispatch) => {
  try {
    const config = {
      params: {
        code: code,
      },
    }

    const res = await axios.get('/api/article/get-by-faculty', config)

    const articles = res.data.data

    let filteredArticles = [...articles]

    if (props) {
      if (props.username && props.username.trim() !== '') {
        filteredArticles = filteredArticles.filter(
          (art) => art.user_username === props.username,
        )
      }
      if (props.campaignCode && props.campaignCode.trim() !== '') {
        filteredArticles = filteredArticles.filter(
          (art) => art.campaign_code === props.campaignCode,
        )
      }
      if (props.status && props.status.trim() !== '') {
        filteredArticles = filteredArticles.filter(
          (art) => art.status === props.status,
        )
      }
    }

    dispatch({
      type: GET_ARTICLES,
      payload: filteredArticles,
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
