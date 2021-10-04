import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory, createBrowserHistory } from 'history';
import store from './store';

const history = createBrowserHistory({forceRefresh:true});

ReactDOM.render(
  (
    <BrowserRouter  history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  ),
  document.getElementById('root')
);
