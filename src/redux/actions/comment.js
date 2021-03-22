import axios from '../../api/axios'
import { COMMENT_ERROR, GET_COMMENTS } from './types'
import { setAlert } from './alert'

export const getComments = (articleId) => async (dispatch) => {
  try {
    const config = {
      params: {
        article_id: articleId,
      },
    }

    const res = await axios.get('/api/comment/get-by-article', config)

    dispatch({
      type: GET_COMMENTS,
      payload: res.data.data,
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Get comments error', 'error'))
  }
}

export const postComment = (formData) => async (dispatch) => {
  try {
    const add = await axios.post('/api/comment', formData)

    console.log(add.data.data)

    const config = {
      params: {
        article_id: add.data.data.article_id,
      },
    }

    const res = await axios.get('/api/comment/get-by-article', config)

    dispatch({
      type: GET_COMMENTS,
      payload: res.data.data,
    })

    dispatch(setAlert('Add comment successfully', 'success'))
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: err.message },
    })
    dispatch(setAlert('Post comment error', 'error'))
  }
}
