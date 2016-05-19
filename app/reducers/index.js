import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import list from './list';
import manga from './manga';
import chapter from './chapter';

const reducers = combineReducers({
  list,
  manga,
  chapter,
  routing: routerReducer,
});

export default reducers;
