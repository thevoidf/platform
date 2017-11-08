import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import logo from '../images/logo.svg';
import '../styles/App.css';

import Home from './Home';
import Header from './Header';
import Sidebar from './Sidebar';
import Login from './Login';
import Signup from './Signup';
import PostList from './PostList';
import Photos from './Photos';
import Music from './Music';
import Profile from './Profile';

import { isLoggedIn, getUser } from '../utils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: isLoggedIn()
    };
  }

  logout() {
    this.setState({
      loggedIn: false
    });
  }

  login() {
    this.setState({
      loggedIn: true
    });
  }

  render() {
    const loggedIn = this.state.loggedIn;
    return (
      <BrowserRouter>
        <div className="app">
          {loggedIn ?
            <Sidebar title={getUser()} pic={logo} items={[
              { text: 'Posts', href: '/posts' },
              { text: 'Photos', href: '/photos' },
              { text: 'Play Music', href: '/music' },
              { text: 'Log out', href: '/logout' }
            ]} logout={this.logout.bind(this)} /> :
            <Header title="Platform" logo={logo} logout={this.logout.bind(this)} />}
          <div className={"content" + (isLoggedIn() ? " mv" : "")}>
            <Route exact path="/" component={() => <Home login={this.login.bind(this)} />} />
            <Route exact path="/user/:username" render={(props) => {
              return (
                <p>{props.params.username}</p>
              );
            }} />
            <Route path="/login" render={() => <Login login={this.login.bind(this)} classes={['mart']} />} />
            <Route path="/signup" render={() => <Signup login={this.login.bind(this)} classes={['mart']} />} />
            <Route path="/posts" render={() => (
              loggedIn ? (
                <PostList />
              ) : (
                <Redirect to="/" />
              )
            )} />
            <Route path="/photos" render={() => (
              loggedIn ? (
                <Photos />
              ) : (
                <Redirect to="/" />
              )
            )} />
            <Route path="/music" render={() => (
              loggedIn ? (
                <Music />
              ) : (
                <Redirect to="/" />
              )
            )} />
            <Route path="/profile" render={() => (
              loggedIn ? (
                <Profile />
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
