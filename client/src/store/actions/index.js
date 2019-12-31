import { SET_USER, SET_USER_NULL } from '../constants';

export const loginAction = user => ({
  type: SET_USER,
  payload: user
});

export const logoutAction = () => ({
  type: SET_USER_NULL
});
