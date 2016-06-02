import expect from 'expect'
import * as actions from '../../app/actions/app'
import * as types from '../../app/actions/types'

describe('App actions', () => {
  it('should create an action to open drawer', () => {
    const expectedAction = {
      type: types.OPEN_DRAWER,
    }
    expect(actions.openDrawer()).toEqual(expectedAction)
  });

  it('should create an action to close drawer', () => {
    const expectedAction = {
      type: types.CLOSE_DRAWER,
    }
    expect(actions.closeDrawer()).toEqual(expectedAction)
  });
})