import React, { Component } from 'react';
import '../styles/post-form.css';

import * as utils from '../utils';

class PostForm extends Component {
  onPost(e) {
    e.preventDefault();
    const data = {
      title: this.titleInput.value,
      content: this.contentInput.value,
      user: utils.getUser()
    };

    fetch('/api/posts', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(data => {
        if (data.success) {
          const newPost = data.post;
          this.props.updatePostList(newPost);
          this.titleInput.value = '';
          this.contentInput.value = '';
        } else {
          console.log('fail', data);
        }
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <form className="post-form sn-row card" onSubmit={this.onPost.bind(this)}>
        <h1 className="title">Create new post</h1>
        <input
          type="text"
          placeholder="Title..."
          ref={input => this.titleInput = input} />
        <textarea
          placeholder="Content..."
          rows="6"
          ref={input => this.contentInput = input} />
        <input className="btn" type="submit" value="Post" />
      </form>
    );
  }
}

export default PostForm;
