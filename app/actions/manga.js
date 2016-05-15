import { get } from '../api';
import {
  REQUEST_MANGA, RECEIVE_MANGA
} from './types';

// fetch details action
export function fetchManga(id) {
  return (dispatch, getState) => {
    dispatch({type: REQUEST_MANGA})
      get(`manga/${id}`)
      .then(json => dispatch({
        type: RECEIVE_MANGA,
        details: json,
        recievedAt: Date.now()
      }));
  }
}
