import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar } from 'material-ui';
import Nav from '../components/Nav';
import {
  openDrawer, closeDrawer
} from '../actions';

export class AppContainer extends Component {

  static propTypes = {
    drawerOpened: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleNavMenuTap() {
    let { dispatch, drawerOpened } = this.props
    if(drawerOpened)
      dispatch(closeDrawer());
    else
      dispatch(openDrawer());
  }

  handleNavItemTap(e) {
    console.log(e);
  }

  render() {
    let { drawerOpened } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar title='RManga'
            onLeftIconButtonTouchTap={this.handleNavMenuTap.bind(this)}/>
          <Nav open={drawerOpened} items={[{
              label: 'Browse',
              url: '/browse',
              icon: 'search'
            }, {
              label: 'Favorites',
              url: '/favorites',
              icon: 'favorite'
            }]}
            onItemTap={this.handleNavItemTap}/>
          <div style={{paddingTop: 5, paddingLeft: 24, paddingRight: 24}}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const {
    drawerOpened
  } = state.app;

  return {
    drawerOpened
  };
}

export default connect(mapStateToProps)(AppContainer);
