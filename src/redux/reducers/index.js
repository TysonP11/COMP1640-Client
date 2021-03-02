import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import campaign from './campaign'

export default combineReducers({
  alert,
  auth,
  campaign,
})
