export interface User {
  email?: any;
  password?: any;
  rememberMe?: boolean;
}

const rememberMeAction = (user: User) => {
  return {
    type: 'rememberMe',
    user: user,
  };
};

export default rememberMeAction;
