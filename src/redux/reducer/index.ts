import {combineReducers} from 'redux';
import setCurrentBookingReducer from './currentBookingReducer';
import Current from './currentUserReducer';
import RememberMe from './rememberMeReducer';

export const allReducers = combineReducers({
  currentUser: Current,
  rememberMe: RememberMe,
  currentBooking: setCurrentBookingReducer,
});
