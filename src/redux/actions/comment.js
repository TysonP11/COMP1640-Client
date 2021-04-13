import axios from '../../api/axios'
import { COMMENT_ERROR, GET_COMMENTS, COMMENT_COUNT } from './types'
import { setAlert } from './alert'

export const getAllCommentsByFaculty = (articles) => async (dispatch) => {
  try {
    let compCmts = 0
    let busiCmts = 0
    let desiCmts = 0

    await asyncForEach(articles, async (artcl) => {
      if (artcl.faculty_code && artcl.faculty_code === 'COMP') {
        const res = await axios.get('/api/comment/get-by-article', {
          params: { article_id: artcl.id },
        })

        compCmts = compCmts + res.data.data.length
      }

      if (artcl.faculty_code && artcl.faculty_code === 'BUSI') {
        const res = await axios.get('/api/comment/get-by-article', {
          params: { article_id: artcl.id },
        })

        busiCmts = busiCmts + res.data.data.length
      }

      if (artcl.faculty_code && artcl.faculty_code === 'DESI') {
        const res = await axios.get('/api/comment/get-by-article', {
          params: { article_id: artcl.id },
        })

        desiCmts = desiCmts + res.data.data.length
      }
    })

    const totalCmts = compCmts + busiCmts + desiCmts

    const compCmtsPer = Math.round((compCmts / totalCmts) * 100)
    const busiCmtsPer = Math.round((busiCmts / totalCmts) * 100)
    const desiCmtsPer = 100 - compCmtsPer - busiCmtsPer

    dispatch({
      type: COMMENT_COUNT,
      payload: {
        compCmtsPer,
        busiCmtsPer,
        desiCmtsPer,
      },
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

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
