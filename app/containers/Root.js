import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import configureStore from '../configureStore';

const store = configureStore()
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

import App from './App';
import List from './List';
import Manga from './Manga';
import Chapter from './Chapter';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="/list" component={List}/>
            <Route path="/list/:page" component={List}/>
            <Route path="/details/:id" component={Manga}/>
            <Route path="/chapter/:id" component={Chapter}/>
            <Route path="/chapter/:id/:page" component={Chapter}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}
