import expect from 'expect';
import reducer from '../../app/reducers/app';
import * as types from '../../app/actions/types';

describe('App reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      drawerOpened: false
    });
  });

  it('should handle OPEN_DRAWER', () => {
    expect(
      reducer([], {
        type: types.OPEN_DRAWER
      })
    ).toEqual({
      drawerOpened: true
    });
  });

  it('should handle CLOSE_DRAWER', () => {
    expect(
      reducer([], {
        type: types.CLOSE_DRAWER
      })
    ).toEqual({
      drawerOpened: false
    });
  });
});