import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../app/actions/list';
import * as types from '../../app/actions/types';
import 'whatwg-fetch';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('List actions', () => {
  it('should create an action to change active page', () => {
    const page = 1;
    const expectedAction = {
      type: types.CHANGE_PAGE,
      page
    }
    expect(actions.changePage(page)).toEqual(expectedAction)
  });

  it('should create an action to change number of items per page', () => {
    const itemsPerPage = 10;
    const expectedAction = {
      type: types.CHANGE_ITEMS_PER_PAGE,
      itemsPerPage
    }
    expect(actions.changeItemsPerPage(itemsPerPage)).toEqual(expectedAction)
  });

  afterEach(() => {
    nock.cleanAll()
  });

  it('creates RECEIVE_LIST when fetching list has been done', () => {
    const resp = {
      "page": 0,
      "start": 0,
      "end": 25,
      "total": 1000,
      "manga": [
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
      ]
    };

    nock('https://www.mangaeden.com')
      .get('/api/list/0')
      .query({ p: 0, l: 25 })
      .reply(200, resp);

    const {
      total,
      start,
      end,
      manga: list,
    } = resp;

    const expectedActions = [
      { type: types.REQUEST_LIST },
      {
        type: types.RECEIVE_LIST,
        total,
        start,
        end,
        list,
      }
    ]
    const store = mockStore({
      list: {
        items: [],
        page: 0,
        total: 0,
        start: 0,
        end: 0,
        itemsPerPage: 25
      }
    })

    return store.dispatch(actions.fetchList())
      .then(() => { // return of async actions
        let actions = store.getActions();
        expect(actions[0]).toEqual(expectedActions[0]);
        let action2 = actions[1];
        // do not assert timestamp
        delete action2.savedAt;
        expect(action2).toEqual(expectedActions[1]);
      })
  })
})