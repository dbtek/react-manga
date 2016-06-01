import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

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

  componentDidMount() {
    const { dispatch, params } = this.props;
    // set current page then fetch list
    dispatch(changePage(params.page - 1 || 1));
    dispatch(fetchList());
  }

  handlePageClick(data) {
    const { dispatch } = this.props;
    dispatch(push(`/browse/${data.selected + 1}`));
    // change current page then fetch list
    dispatch(changePage(data.selected));
    dispatch(fetchList());
  }

  handleFavoriteClick(manga) {
    const { dispatch } = this.props;
    if(this.isFavorite(manga))
      dispatch(removeFavorite(manga));
    else
      dispatch(addToFavorites(manga));
  }

  isFavorite(manga) {
    return this.props.favorites.hasOwnProperty(manga.i);
  }

  render() {
    const { items, isFetching, lastUpdated, page, total, itemsPerPage } = this.props;
    const that = this;
    return (
      <div>
        {items.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1, flex: 1, flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {
              items && items.map(item => (
                <Card style={{display: 'flex', width: 200, marginBottom: 10 }}>
                  <CardMedia style={{height: 300, width: 200}} overlay={<CardTitle title={item.t} subtitle={item.c.join(', ')}/>}>
                    <img style={{width: 200, maxHeight: 300}} src={`https://cdn.mangaeden.com/mangasimg/${item.im}`} />
                  </CardMedia>
                  <CardActions>
                    <Link to={`/details/${item.i}`}>
                      <FlatButton label="Chapters" />
                    </Link>
                    <IconButton onTouchTap={function(e) { that.handleFavoriteClick(item) }}>
                      <FontIcon className="material-icons">
                        { this.isFavorite(item) ? 'favorite' : 'favorite_border' }
                      </FontIcon>
                    </IconButton>
                  </CardActions>
                </Card>
              ))
            }
          </div>
        }

        {/* Pagination */}
        <Pagination previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          pageNum={Math.ceil(total / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          clickCallback={this.handlePageClick.bind(this)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
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