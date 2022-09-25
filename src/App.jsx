import React from 'react';

import Menubar from './Menubar';
import Content from './Content';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.server = 'https://localhost:3001';
    this.server = 'https://192.168.197.132:3001';

    this.state = {
      activeMenu: 'Home'
    };

    this.menuItems = ['Home', 'Attendance', 'Register'];

    this.menuStateHandler = this.menuStateHandler.bind(this);
  }

  menuStateHandler(menu) {
    this.setState({
      // activeMenu: evt.target.innerHTML
      activeMenu: menu
    });
  }

  render() {
    return (
      <div className="App">
        <h3>Face Recognition Attendance Management System</h3>
        <Menubar
          active={this.state.activeMenu}
          appMenuHandler={this.menuStateHandler}
          menuItems={this.menuItems}
        />
        <Content
          content={this.state.activeMenu}
          server={this.server}
          appMenuHandler={this.menuStateHandler}
        />
      </div>
    );
  }
}

export default App;
