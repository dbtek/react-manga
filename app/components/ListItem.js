import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';


export default (props) => (
  <Card style={{display: 'flex', width: 200, marginBottom: 10, marginLeft: 5 }}>
    <CardMedia style={{height: 300, width: 200}} overlay={<CardTitle title={props.title} subtitle={props.subtitle}/>}>
      <img style={{width: 200, maxHeight: 300}} src={props.imageUrl} />
    </CardMedia>
    <CardActions>
      <FlatButton label="Chapters" onTouchTap={props.onDetailsTap}/>
      <IconButton onTouchTap={props.onFavoriteTap}>
        <FontIcon className="material-icons">
          { props.isFavorite ? 'favorite' : 'favorite_border' }
        </FontIcon>
      </IconButton>
    </CardActions>
  </Card>
);