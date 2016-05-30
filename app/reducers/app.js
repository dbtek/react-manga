import {
  OPEN_DRAWER, CLOSE_DRAWER,
} from '../actions'

export default function app(state = {
  drawerOpened: false
}, action) {
  switch (action.type) {

    case OPEN_DRAWER:
      return Object.assign({}, state, {
        drawerOpened: true
      });

    case CLOSE_DRAWER:
      return Object.assign({}, state, {
        drawerOpened: false
      });

    default:
      return state
  }
}
