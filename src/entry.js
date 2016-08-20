import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import React from 'react';
import { App, ListPage, UploadPage } from './components';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as actions from './actions';
import store from './store';

const history = syncHistoryWithStore(hashHistory, store);

store.dispatch(actions.loadList());

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={ListPage} />
        <Route path="upload" component={UploadPage} />
      </Route>
    </Router>
  </Provider>
), document.querySelector('.main'));
