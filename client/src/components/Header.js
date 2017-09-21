import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

import * as utils from '../utils';

class Header extends Component {
  onLogOut(e) {
    utils.logoutUser();
  }

  renderOptions() {
    try {
      let username = utils.getUser();
      username = utils.capitalize(utils.getUser());
      return (
        <div className="menu">
          <Link className="option" to="/">Home</Link>
          <Link className="option" to="/profile">{username}</Link>
          <Link className="option" to="/posts">Posts</Link>
          <Link className="option" to="/photos">Photos</Link>
          <a className="option" href="/" onClick={this.onLogOut}>Log out</a>
        </div>
      );
    } catch(e) {
      return (
        <div className="menu cf">
          <Link className="option" to="/">Home</Link>
          <Link className="option" to="/signup">Sign up</Link>
          <Link className="option" to="/login">Log in</Link>
        </div>
      );  
    }
  }

  render() {
    return (
      <div className="header">
        <div className="wrapper cf">
          <div className="logo">
            <img className="image" src={this.props.logo} alt="logo" />
            <h2 className="title">{this.props.title}</h2>
          </div>
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}

export default Header;