import expect from 'expect'
import * as actions from '../../app/actions/favorites'
import * as types from '../../app/actions/types'

const manga = {
  i: 0,
  t: 'test'
};

describe('Favorite actions', () => {
  it('should create an action to add an item to favorites', () => {
    const expectedAction = {
      type: types.ADD_TO_FAVORITE,
      manga
    }
    expect(actions.addToFavorites(manga)).toEqual(expectedAction)
  });

  it('should create an action to remove an item from favorites', () => {
    const expectedAction = {
      type: types.REMOVE_FAVORITE,
      manga
    }
    expect(actions.removeFavorite(manga)).toEqual(expectedAction)
  });
})