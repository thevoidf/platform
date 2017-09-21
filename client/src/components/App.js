import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import logo from '../images/logo.svg';
import '../styles/App.css';

import Home from './Home';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import PostList from './PostList';

import Photos from './Photos';

import * as utils from '../utils';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header title="Platform" logo={logo} />
          <div className="wrapper">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/posts" render={() => (
              utils.isLoggedIn() ? (
                <PostList />
              ) : (
                <Redirect to="/" />
              )
            )} />
            <Route path="/photos" render={() => (
              utils.isLoggedIn() ? (
                <Photos />
              ) : (
                <Redirect to="/" />
              )
            )} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
