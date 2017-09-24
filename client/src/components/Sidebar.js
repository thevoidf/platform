import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

import { logoutUser } from '../utils';

class Sidebar extends Component {
  onItemClicked(e) {
    if (e.target.href.endsWith('logout')) {
      e.preventDefault();
      logoutUser();
      this.props.logout();
    }
  }

  render() {
    return (
      <div className="sidebar">
        <header className="header">
          <div className="content">
            <img className="pic" src={this.props.pic} alt="header pic" />
            <h2 className="title">{this.props.title}</h2>
          </div>
        </header>
        <div className="menu">
          <div className="content">
            {this.props.items ?
              this.props.items.map((item, i) =>
              <Link key={i} className="item" to={item.href} onClick={this.onItemClicked.bind(this)}>{item.text}</Link>) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;