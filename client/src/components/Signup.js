import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import * as utils from '../utils';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      redirect: false
    };
  }

  onSignup(e) {
    e.preventDefault();
    
    const data = {
      username: this.usernameInput.value,
      email: this.emailInput.value,
      password: this.passwordInput.value
    };

    fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(data => {
        if (data.success) {
          utils.loginUser(data.username, data.token);
          this.props.login();
          this.setState({ redirect: true });
        } else {
          const errors = data.errors;
          this.setState({errors});
        }
      }).catch(err => console.log(err));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <form className="signup sn-row card w-400" onSubmit={this.onSignup.bind(this)}>
        <h2 className="title">Login to you'r account</h2>
        <div className="errors">
          {this.state.errors.map((err, i) => <p key={i}>{err}</p>)}
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          ref={(input) => this.usernameInput = input} />
        <input
          type="email"
          placeholder="Email"
          name="email"
          ref={(input) => this.emailInput = input} />
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={(input) => this.passwordInput = input} />
        <input className="btn" type="submit" value="Sign up" />
      </form>
    );
  }
}

export default Signup;