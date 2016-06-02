import expect from 'expect';
import reducer from '../../app/reducers/list';
import * as types from '../../app/actions/types';

const initialState = {
  isFetching: false,
  items: [],
  page: 0,
  total: 0,
  start: 0,
  end: 0,
  itemsPerPage: 25
};

describe('List reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REQUEST_LIST', () => {
    expect(
      reducer([], {
        type: types.REQUEST_LIST
      })
    ).toEqual({isFetching: true});
  });

  it('should handle RECEIVE_LIST', () => {
    const mockAction = {
      "type": types.RECEIVE_LIST,
      "page": 0,
      "start": 0,
      "end": 25,
      "total": 1000,
      "list": [
        {
          "a": "flower-dream",
          "c": [
            "Action",
            "Adventure",
            "Drama",
            "Sci-fi",
            "Supernatural"
          ],
          "h": 1118,
          "i": "5372389645b9ef5a0b1d20d8",
          "im": "ad/ad8dbe2c909de99899f1015a360f75e3ced31023672d6ff0d2b7547c.jpg",
          "ld": 1416420134.0,
          "s": 2,
          "t": "Flower Dream"
        }
      ],
      savedAt: 1223334444
    };

    expect(
      reducer([], mockAction)
    ).toEqual({
      isFetching: false,
      items: mockAction.list,
      total: mockAction.total,
      start: mockAction.start,
      end: mockAction.end,
      lastUpdated: mockAction.savedAt
    });
  });

  it('should handle CHANGE_PAGE', () => {
    expect(
      reducer([], {
        type: types.CHANGE_PAGE,
        page: 3
      })
    ).toEqual({
      page: 3
    });
  });

  it('should handle CHANGE_ITEMS_PER_PAGE', () => {
    expect(
      reducer([], {
        type: types.CHANGE_ITEMS_PER_PAGE,
        itemsPerPage: 3
      })
    ).toEqual({
      itemsPerPage: 3
    });
  });
});