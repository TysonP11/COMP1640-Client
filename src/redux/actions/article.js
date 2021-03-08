import { CREATE_ARTICLE, ARTICLE_ERROR } from './types'
import axios from '../../api/axios'
import { setAlert } from './alert'

// create article
export const createArticle = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/article', formData)

    console.log(res)

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
