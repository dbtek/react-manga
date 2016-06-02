import expect from 'expect'
import * as actions from '../../app/actions/chapter'
import * as types from '../../app/actions/types'

describe('Chapter actions', () => {
  it('should create an action to change chapter page', () => {
    const page = 13;
    const expectedAction = {
      type: types.CHANGE_CHAPTER_PAGE,
      page
    }
    expect(actions.changeChapterPage(page)).toEqual(expectedAction)
  });
});