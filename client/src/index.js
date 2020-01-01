import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import App from './components/App';
import 'rsuite/lib/styles/index.less';
import { Auth } from './Auth/Auth';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Auth.isLoggedIn(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
