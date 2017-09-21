import React, { Component } from 'react';
import '../styles/photo.css';

class Photo extends Component {
  render() {
    return (
      <div className="photo card col">
        <h2 className="title">{this.props.title}</h2>
        <img className="image" src={this.props.photo} alt={this.props.title} />
      </div>
    );
  }
}

export default Photo;