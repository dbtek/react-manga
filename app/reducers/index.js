import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import list from './list';
import manga from './manga';
import chapter from './chapter';
import favorites from './favorites';

const reducers = combineReducers({
  app,
  list,
  manga,
  chapter,
  favorites,
  routing: routerReducer,
});

export default reducers;
