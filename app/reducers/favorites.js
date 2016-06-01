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
  let newState = Object.assign({}, state);
  switch (action.type) {
    case ADD_TO_FAVORITE:
      let newItem = {};
      newItem[action.manga.i] = action.manga;
      newState = Object.assign({}, state, {
        items: Object.assign({}, state.items, newItem),
      });
      break;
    case REMOVE_FAVORITE:
      newState.items = Object.assign({}, state.items);
      delete newState.items[action.manga.i];
      break;
  }

  // persist state
  persist(newState);
  return newState;
}
