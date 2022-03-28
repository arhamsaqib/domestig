const INITIAL_STATE: string = '';

const rememberMereducer = (state = INITIAL_STATE, action: any) => {
  // console.log('in add counter reducer');
  switch (action.type) {
    case 'rememberMe': {
      return action.user;
    }
    default:
      return state;
  }
};

export default rememberMereducer;
