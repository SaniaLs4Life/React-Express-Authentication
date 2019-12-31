import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import App from './components/App';
import { SET_USER } from './store/constants';
import 'rsuite/lib/styles/index.less';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({
    type: SET_USER,
    payload: { success: true, error: null, token: token }
  });
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
