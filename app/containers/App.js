import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar } from 'material-ui';
import Nav from '../components/Nav';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar title='RManga'/>
          <Nav items={[{
              label: 'List',
              url: '/list',
              icon: 'list'
            }]} />
          <div style={{marginLeft: 256, paddingTop: 5, paddingLeft: 24, paddingRight: 24}}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
