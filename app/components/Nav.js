import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

export default (props) => (
  <Drawer
    open={props.open}
    docked={true}
    containerStyle={{top: 64, paddingTop: 30}}>
    {
      props.items.map(item => {
        if(item.icon)
          return (<MenuItem key={item.url} containerElement={<Link to={item.url} />} leftIcon={<FontIcon className='material-icons'>{item.icon}</FontIcon>}>{item.label}</MenuItem>);
        return (<MenuItem key={item.url} containerElement={<Link to={item.url} />}>{item.label}</MenuItem>);
      })
    }
  </Drawer>
);
