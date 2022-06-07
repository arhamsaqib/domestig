const INITIAL_STATE: string = '';

const setCurrentBookingReducer = (state = INITIAL_STATE, action: any) => {
  // console.log('in add counter reducer');
  switch (action.type) {
    case 'updateCurrentBooking': {
      return action.user;
    }
    default:
      return state;
  }
};

export default setCurrentBookingReducer;
