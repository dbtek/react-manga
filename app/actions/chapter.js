import { get } from '../api';
import {
  REQUEST_CHAPTER, RECEIVE_CHAPTER, CHANGE_CHAPTER_PAGE
} from './types';

// fetch details action
export function fetchChapter(id) {
  return async (dispatch, getState) => {
    dispatch({type: REQUEST_CHAPTER})
    const json = await get(`chapter/${id}`)
    dispatch({
      type: RECEIVE_CHAPTER,
      images: json.images,
      recievedAt: Date.now()
    });
  }
}

export function changeChapterPage(page) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_CHAPTER_PAGE,
      page: page
    });
  }
}
