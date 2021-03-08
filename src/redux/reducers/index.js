import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import campaign from './campaign'
import article from './article'

export default combineReducers({
  alert,
  auth,
  campaign,
  article,
})
