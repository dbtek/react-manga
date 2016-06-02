import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

import ListItem from '../components/ListItem';

import {
  fetchList,
  changePage,
  addToFavorites,
  removeFavorite
} from '../actions';

import Pagination from 'react-paginate';

export default class ListContainer extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    favorites: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    // set current page then fetch list
    dispatch(changePage(params.page - 1 || 0));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchList());
  }

  handlePageClick(data) {
    console.trace('test', data.selected)
    const { dispatch } = this.props;
    dispatch(push(`/browse/${data.selected + 1}`));
    // change current page then fetch list
    dispatch(changePage(data.selected));
    dispatch(fetchList());
  }

  handleFavoriteTap(manga) {
    const { dispatch } = this.props;
    if(this.isFavorite(manga))
      dispatch(removeFavorite(manga));
    else
      dispatch(addToFavorites(manga));
  }

  handleDetailsTap(manga) {
    const { dispatch } = this.props;
    dispatch(push(`/details/${manga.i}`));
  }

  isFavorite(manga) {
    return this.props.favorites.hasOwnProperty(manga.i);
  }

  render() {
    const { items, isFetching, lastUpdated, page, total, itemsPerPage } = this.props;
    if(page < 0)
      return <span/>;
    const that = this;
    return (
      <div className="container">
        {items.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1, flex: 1, flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {
              items && items.map(item => (
                <ListItem
                  title={item.t}
                  subtitle={item.c.join(', ')}
                  imageUrl={`https://cdn.mangaeden.com/mangasimg/${item.im}`}
                  onFavoriteTap={function(e) { that.handleFavoriteTap(item) } }
                  onDetailsTap={function(e) { that.handleDetailsTap(item) } }
                  isFavorite={this.isFavorite(item)}
                  />
              ))
            }
          </div>
        }

        {/* Pagination */}
        <Pagination previousLabel={"previous"}
          nextLabel={"next"}
          breakClassName={"page-item"}
          breakLabel={<a className="page-link">...</a>}
          pageNum={Math.ceil(total / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          clickCallback={this.handlePageClick.bind(this)}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          subContainerClassName={"pages pagination"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          initialSelected={page} />
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    items,
    page,
    itemsPerPage,
    total
  } = state.list;

  const {
    items: favorites
  } = state.favorites

  return {
    items,
    isFetching,
    lastUpdated,
    page,
    itemsPerPage,
    total,
    favorites
  };
}

export default connect(mapStateToProps)(ListContainer);