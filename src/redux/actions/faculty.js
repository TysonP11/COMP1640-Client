
import { GET_FACULTY, FACULTY_ERROR } from './types'
import axios from '../../api/axios'

export const getFaculty = (code) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/faculty/${code}`)
  
      const payload = res.data.data
  
      dispatch({
        type: GET_FACULTY,
        payload: payload,
      })
  
    } catch (err) {
      console.error(err)
  
      dispatch({
        type: FACULTY_ERROR,
        payload: { msg: err.message },
      })
    }
  }