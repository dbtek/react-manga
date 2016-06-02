import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';

import { fetchManga } from '../actions';

export default class MangaContainer extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    details: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    console.log(params);
    dispatch(fetchManga(params.id));
  }

  render() {
    const { details } = this.props;
    return (
      <div className="container">
        { details && (
          <Card>
            <CardMedia overlay={<CardTitle title={details.title} subtitle={details.categories.join(', ')}/>}>
              <div style={{
                background: `url(https://cdn.mangaeden.com/mangasimg/${details.image}) no-repeat center center`,
                backgroundSize: 'cover',
                height: 300,
                width: '100%',
                textAlign: 'center'
              }}>
                <img src={`https://cdn.mangaeden.com/mangasimg/${details.image}`} style={{height: 300}} />
              </div>
            </CardMedia>
            <CardText>
              <p>{details.description}</p>
            </CardText>
            <CardTitle title="Chapters"/>
            <CardText>
              <List>
                {
                  details.chapters && details.chapters.map(chapter => (
                    <ListItem
                      key={chapter[3]}
                      primaryText={chapter[2]}
                      leftIcon={<FontIcon className='material-icons'>bookmark</FontIcon>}
                      secondaryText={new Date(chapter[1] * 1000).toLocaleDateString()}
                      containerElement={<Link to={`/chapter/${chapter[3]}`}/>}
                      />
                  ))
                }
              </List>
            </CardText>
          </Card>
        )}
      </div>
    );
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    details
  } = state.manga;

  return {
    isFetching,
    details
  };
}

export default connect(mapStateToProps)(MangaContainer);