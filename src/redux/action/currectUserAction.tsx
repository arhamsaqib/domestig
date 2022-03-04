export interface User {
  id?: string;
}

const updateCurrentUserAction = (user: User) => {
  return {
    type: 'updateCurrentUser',
    user: user,
  };
};

export default updateCurrentUserAction;
