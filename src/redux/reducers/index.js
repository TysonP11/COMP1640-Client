import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import campaign from './campaign';
import article from './article';
import faculty from './faculty';
import comment from './comment';

export default combineReducers({
  alert,
  auth,
  campaign,
  article,
  faculty,
  comment,
});
