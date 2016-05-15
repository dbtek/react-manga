import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import list from './list';
import manga from './manga';

const reducers = combineReducers({
  list,
  manga,
  routing: routerReducer,
});

export default reducers;
