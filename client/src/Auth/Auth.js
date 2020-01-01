import { SET_USER } from '../store/constants';

export const Auth = {
  isLoggedIn: store => {
    const token = localStorage.getItem('token');

    if (token) {
      store.dispatch({
        type: SET_USER,
        payload: { success: true, error: null, token: token }
      });
    }
  },
  getToken: () => {
    return localStorage.getItem('token');
  }
};
