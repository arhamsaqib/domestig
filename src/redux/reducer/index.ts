import {combineReducers} from 'redux';
import Current from './currentUserReducer';
import RememberMe from './rememberMeReducer';

export const allReducers = combineReducers({
  currentUser: Current,
  rememberMe: RememberMe,
});
