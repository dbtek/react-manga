import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {List} from 'material-ui/List';


export default (props) => (
  <Card>
    <CardMedia overlay={<CardTitle title={props.title} subtitle={props.subtitle}/>}>
      <div style={{
        background: `url(${props.imageUrl}) no-repeat center center`,
        backgroundSize: 'cover',
        height: 300,
        width: '100%',
        textAlign: 'center'
      }}>
        <img src={props.imageUrl} style={{height: 300}} />
      </div>
    </CardMedia>
    <CardText>
      <p>{props.description}</p>
    </CardText>
    <CardTitle title="Chapters"/>
    <CardText>
      <List>
        { props.children }
      </List>
    </CardText>
  </Card>
);