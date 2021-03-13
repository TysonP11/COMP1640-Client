import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import campaign from './campaign'
import article from './article'
import faculty from './faculty'

export default combineReducers({
  alert,
  auth,
  campaign,
  article,
  faculty
})
