import React, { Component } from 'react';
import '../styles/home.css';
import Signup from './Signup';
import nodeLogo from '../images/node_logo.png';
import ui from '../images/ui.png';
import { isLoggedIn } from '../utils';

class Home extends Component {
  render() {
    if (!isLoggedIn()) {
      return (
        <div className="home">
          <div className="banner cf">
            <div className="text">
              <h1 className="title">Welcome To Platform</h1>
              <h2 className="sub">Share Your Favorite Music, Videos, Audio, Movies, Shows, Documents, Photos, Firmwares, Scripts and much more...</h2>
            </div>
            <div className="forms">
              <Signup login={this.props.login.bind(this)} />
            </div>
          </div>
          <div className="main">
            <div className="wrapper">
              <div className="pref desc">
                <h1 className="title">Platform is fast</h1>
                <p className="sub">Platform is build on top of JavaScript/Node technology which guarantees great performance</p>
                <img src={nodeLogo} width="30%"/>
              </div>
              <div className="ui desc">
                <h1 className="title">Simple User Interface</h1>
                <p className="sub">Platform has Simple user friendly easy to use user interface</p>
                <img src={ui} width="60%"/>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="home">
          Platform
        </div>
      );
    }
  }
}

export default Home;
