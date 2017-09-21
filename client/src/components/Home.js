import React, { Component } from 'react';

class Home extends Component {
  componentDidMount() {
    // fetch('/api/test', {
    // }).then(resp => resp.json())
    //   .then(data => console.log(data));
  }

  render() {
    return (
      <div className="home">
        <h1>Welcome Home</h1>
      </div>
    );
  }
}

export default Home;