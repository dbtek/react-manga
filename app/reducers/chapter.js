import {
  REQUEST_CHAPTER, RECEIVE_CHAPTER, CHANGE_CHAPTER_PAGE
} from '../actions'

export default function chapter(state = {
  isFetching: false,
  images: [],
  page: 0,
}, action) {
  switch (action.type) {

    case REQUEST_CHAPTER:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_CHAPTER:
      return Object.assign({}, state, {
        isFetching: false,
        images: action.images
      });

    case CHANGE_CHAPTER_PAGE:
      return Object.assign({}, state, {
        isFetching: false,
        page: action.page
      });

    default:
      return state
  }
}
