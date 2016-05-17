import { get } from '../api';
import {
  REQUEST_MANGA, RECEIVE_MANGA
} from './types';

// fetch details action
export function fetchManga(id) {
  return async (dispatch, getState) => {
    dispatch({type: REQUEST_MANGA})
    const json = await get(`manga/${id}`)
    dispatch({
      type: RECEIVE_MANGA,
      details: json,
      recievedAt: Date.now()
    });
  }
}
