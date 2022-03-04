import {combineReducers} from 'redux';
import Current from './currentUserReducer';

export const allReducers = combineReducers({
  currentUser: Current,
});
