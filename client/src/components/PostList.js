import React, { Component } from 'react';
import '../styles/post-list.css';

import Post from './Post';
import PostForm from './PostForm';

import * as utils from '../utils';

class PostList extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('/api/posts/' + utils.getUser())
      .then(resp => resp.json())
      .then(posts => {
        if (posts) {
          this.setState({posts: posts.posts});
        } else {
          console.log('fail', posts);
        }
      }).catch(err => console.log(err));
  }

  renderPosts() {
    if (this.state.posts.length !== 0) {
      return this.state.posts.map((p, i) => <Post key={i} title={p.title} content={p.content} />);
    }
    return '';
  }

  updatePostList(post) {
    const posts = this.state.posts;
    posts.push(post);
    this.setState({posts});
  }

  render() {
    return (
      <div className="post-list">
        <PostForm updatePostList={this.updatePostList.bind(this)} />
        {this.renderPosts()}
      </div>
    );
  }
}

export default PostList;