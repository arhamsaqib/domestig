const INITIAL_STATE: string = '';

const setCurrentUserReducer = (state = INITIAL_STATE, action: any) => {
  // console.log('in add counter reducer');
  switch (action.type) {
    case 'updateCurrentUser': {
      return action.user;
    }
    default:
      return state;
  }
};

export default setCurrentUserReducer;
