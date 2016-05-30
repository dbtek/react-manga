/**
 * Actions creators related to favorites.
 */

import {
  ADD_TO_FAVORITE,
  REMOVE_FAVORITE
} from './types';

/**
 * Action to add a manga to favorites
 * @param {Object} manga Manga object.
 * @return {Object}       Action details.
 */
export function addToFavorites(manga) {
  return {
    type: ADD_TO_FAVORITE,
    manga: manga
  }
}
/**
 * Action to remove a manga from favorites
 * @param  {Number} index Favorite index.
 * @param  {Object} manga Manga object.
 * @return {Object}       Action details.
 */
export function removeFavorite(index, manga) {
  return {
    type: REMOVE_FAVORITE,
    manga: manga,
    index: index
  }
}