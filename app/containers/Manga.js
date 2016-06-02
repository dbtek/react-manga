import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MangaDetails from '../components/MangaDetails';
import ChapterListItem from '../components/ChapterListItem';

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
          <MangaDetails
            title={details.title}
            subtitle={details.categories.join(',')}
            description={details.description}
            imageUrl={`https://cdn.mangaeden.com/mangasimg/${details.image}`}
            >
            {
              details.chapters && details.chapters.map(chapter => (
                <ChapterListItem
                  key={chapter[3]}
                  title={chapter[2]}
                  releasedAt={new Date(chapter[1] * 1000).toLocaleDateString()}
                  containerElement={<Link to={`/chapter/${chapter[3]}`}/>}
                  />
              ))
            }
          </MangaDetails>
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