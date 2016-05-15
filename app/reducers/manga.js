import {
  REQUEST_MANGA, RECEIVE_MANGA,
} from '../actions'

export default function manga(state = {
  isFetching: false,
}, action) {
  switch (action.type) {

    case REQUEST_MANGA:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_MANGA:
      return Object.assign({}, state, {
        isFetching: false,
        details: action.details
      });

    default:
      return state
  }
}
