import { SET_USER, SET_USER_NULL } from '../constants';

const initialState = {
  isAuthenticated: false,
  user: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case SET_USER_NULL:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default userReducer;
