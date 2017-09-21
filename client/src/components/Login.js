import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/login.css';

import * as utils from '../utils';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      redirect: false
    };
  }

  onLogin(e) {
    e.preventDefault();
    
    const data = {
      email: this.emailInput.value,
      password: this.passwordInput.value
    };

    fetch('/api/users/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(data => {
        if (data.success) {
          utils.loginUser(data.username, data.token);
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
      <form className="login sn-row card w-400" onSubmit={this.onLogin.bind(this)}>
        <h2 className="title">Login to you'r account</h2>
        <div className="errors">
          {this.state.errors.map((err, i) => <p key={i}>{err}</p>)}
        </div>
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
        <input className="btn" type="submit" value="Log in" />
      </form>
    );
  }
}

export default Login;