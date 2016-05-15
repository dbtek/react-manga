import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import list from './list';

const reducers = combineReducers({
  list,
  routing: routerReducer,
});

export default reducers;
