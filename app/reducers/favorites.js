import store from 'store';
import {
  ADD_TO_FAVORITE,
  REMOVE_FAVORITE,
} from '../actions'

let initialState = {
  items: {}
}

/**
 * Persists state to local storage.
 * @param  {Object} state State.
 */
function persist(state) {
  store.set('favorites', state);
}

/**
 * Loads state from local storage.
 * @return {Object} State.
 */
function load() {
  let state = store.get('favorites');
  if(!state) {
    return initialState;
  }
  return state;
}

export default function favorites(state = load(), action) {
  let newState;
  switch (action.type) {
    case ADD_TO_FAVORITE:
      newState = Object.assign({}, state);
      newState.items[action.manga.i] = action.manga;
      break;
    case REMOVE_FAVORITE:
      delete newState.items[action.manga.i];
      break;
    default:
      newState = state;
  }

  // persist state
  persist(newState);
  return newState;
}
