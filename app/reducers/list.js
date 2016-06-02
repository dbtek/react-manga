import {
  REQUEST_LIST, RECEIVE_LIST,
  CHANGE_PAGE, CHANGE_ITEMS_PER_PAGE,
} from '../actions'

export default function list(state = {
  isFetching: false,
  items: [],
  page: 0,
  total: 0,
  start: 0,
  end: 0,
  itemsPerPage: 25
}, action) {
  switch (action.type) {

    case REQUEST_LIST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.list,
        start: action.start,
        end: action.end,
        total: action.total,
        lastUpdated: action.savedAt
      });

    case CHANGE_PAGE:
      return Object.assign({}, state, {
        page: action.page
      });

    case CHANGE_ITEMS_PER_PAGE:
      return Object.assign({}, state, {
        itemsPerPage: action.itemsPerPage
      });

    default:
      return state
  }
}
