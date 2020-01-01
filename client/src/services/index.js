import axios from 'axios';

export const AuthService = {
  signUp: user => {
    return axios.post(`http://localhost:4000/auth/signup`, user);
  },
  signIn: user => {
    return axios.post(`http://localhost:4000/auth/signin`, user);
  },
  getUsers: () => {
    return axios.get('http://localhost:4000/users');
  }
};
