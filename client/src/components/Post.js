import React, { Component } from 'react';
import '../styles/post.css';

class Post extends Component {
  render() {
    return (
      <div className="post card">
        <h2 className="title">{this.props.title}</h2>
        <p className="content">{this.props.content}</p>
      </div>
    );
  }
}

export default Post;
