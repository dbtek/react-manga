import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import ListItem from '../components/ListItem';

import { removeFavorite } from '../actions'

let that;
export default class FavoritesContainer extends Component {
  constructor(props) {
    super(props);
    that = this;
  }

  static propTypes = {
    items: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleFavoriteTap(manga) {
    const { dispatch } = this.props;
    dispatch(removeFavorite(manga));
  }

  handleDetailsTap(manga) {
    const { dispatch } = this.props;
    dispatch(push(`/details/${manga.i}`));
  }

  renderItem(item) {
    return (
      <ListItem
        title={item.t}
        subtitle={item.c.join(', ')}
        imageUrl={`https://cdn.mangaeden.com/mangasimg/${item.im}`}
        onFavoriteTap={function(e) { that.handleFavoriteTap(item) } }
        onDetailsTap={function(e) { that.handleDetailsTap(item) } }
        isFavorite={true}
        />
    )
  }

  renderItems(items) {
    let itemsComps = []
    for(let key of Object.keys(items)) {
      itemsComps.push(this.renderItem(items[key]));
    }
    return itemsComps;
  }

  render() {
    const { items } = this.props;

    return (
      <div className="container">
        {
          <div style={{ flex: 1, flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {this.renderItems(items)}
          </div>
        }
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const {
    items,
  } = state.favorites;

  return {
    items,
  };
}

export default connect(mapStateToProps)(FavoritesContainer);