import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';
import { addToFavorites } from '../actions'

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

  handleFavoriteClick(manga) {
    const { dispatch } = this.props;
    dispatch(addToFavorites(manga));
  }

  renderItem(item) {
    return (
      <Card key={item.i} style={{display: 'flex', width: 200, marginBottom: 10 }}>
        <CardMedia style={{height: 300, width: 200}} overlay={<CardTitle title={item.t} subtitle={item.c.join(', ')}/>}
        >
          <img style={{width: 200, maxHeight: 300}} src={`https://cdn.mangaeden.com/mangasimg/${item.im}`} />
        </CardMedia>
        <CardActions>
          <Link to={`/details/${item.i}`}>
            <FlatButton label="Chapters" />
          </Link>
          <IconButton onTouchTap={function(e) { that.handleFavoriteClick(item) }}>
            <FontIcon className="material-icons">favorite</FontIcon>
          </IconButton>
        </CardActions>
      </Card>
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
      <div>
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