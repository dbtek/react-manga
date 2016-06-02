import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { push } from 'react-router-redux';

import { fetchChapter, changeChapterPage } from '../actions';

export default class ChapterContainer extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    images: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, params, page } = this.props;
    dispatch(changeChapterPage(params.page || 0));
    dispatch(fetchChapter(params.id));
  }

  handlePageChange(event, i) {
    const { dispatch, params } = this.props;
    dispatch(changeChapterPage(i));
    dispatch(push(`/chapter/${params.id}/${i}`));
  }

  handleNextPageClick() {
    const { page, images, dispatch } = this.props;
    if(page + 1 < images.length)
      this.handlePageChange(null, page + 1);
  }

  render() {
    const { images, page } = this.props;
    return (
      <div className="container">
        <DropDownMenu value={page} onChange={this.handlePageChange.bind(this)}>
          {
            images && images.map((image, i) => (
              <MenuItem key={i} value={i} primaryText={`Page ${i}`} />
            ))
          }
        </DropDownMenu>
        {
          images.length > 1 && (
            <Card>
              <CardText>
                <img src={`https://cdn.mangaeden.com/mangasimg/${images[page][1]}`} onClick={this.handleNextPageClick.bind(this)}/>
              </CardText>
            </Card>
          )
        }
      </div>
    );
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    images,
    page,
  } = state.chapter;

  return {
    isFetching,
    images,
    page,
  };
}

export default connect(mapStateToProps)(ChapterContainer);