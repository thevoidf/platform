import React, { Component } from 'react';
import '../styles/profile.css';
import { getUser } from '../utils';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: ''
    };
  }

  componentDidMount() {
    fetch("/api/profile/" + getUser())
      .then(resp => resp.json())
      .then(data => this.setState({username: data.username}));
  }

  render() {
    return (
      <div className="profile">
        <div className="basic-info card">
          <h2>Basic Info</h2>
          <p>Username: {this.state.username}</p>
          <p>Email: {this.state.username}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
