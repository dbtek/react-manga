import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';

export default (props) => (
  <ListItem
    primaryText={props.title}
    leftIcon={<FontIcon className='material-icons'>bookmark</FontIcon>}
    secondaryText={props.releasedAt}
    containerElement={props.containerElement}/>
)