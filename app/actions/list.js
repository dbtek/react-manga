import { get, save, update, remove } from '../api';
import {
  REQUEST_LIST, RECEIVE_LIST,
  CHANGE_PAGE, CHANGE_ITEMS_PER_PAGE,
} from './types';

// fetch action
export function fetchList({ langId } = {
  langId: 0
}) {
  return async (dispatch, getState) => {
    dispatch({type: REQUEST_LIST});
    let state = getState();
    const json = await get(`lsst/${langId}`, {
      p: state.list.page,
      l: state.list.itemsPerPage
    });
    dispatch({
      type: RECEIVE_LIST,
      list: json.manga,
      total: json.total,
      start: json.start,
      end: json.end,
      savedAt: Date.now()
    });
  }
}

// change current page
export function changePage(page) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_PAGE,
      page: page
    });
  };
}

// change number of items per page
export function changeItemsPerPage(items) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_ITEMS_PER_PAGE,
      iemsPerPage: items
    });
  };
}