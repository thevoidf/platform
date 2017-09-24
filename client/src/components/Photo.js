import React, { Component } from 'react';
import '../styles/photo.css';

import fileDownload from 'js-file-download';

class Photo extends Component {
  onDownload(e) {
    const photoId = e.target.parentNode.id;
    fetch('/api/photos/download/' + photoId)
      .then(resp => resp.blob())
      .then(data => fileDownload(data, 'image.jpg'));
  }

  onOpen(e) {
    const image = {
      src: this.photo.getAttribute('src'),
      title: this.photo.getAttribute('alt')
    };
    this.props.open(image);
  }

  render() {
    return (
      <div id={this.props.id} className="photo card col">
        <h2 className="title">{this.props.title}</h2>
        <img className="image" src={this.props.photo} alt={this.props.title} ref={(image) => { this.photo = image} } />
        <button className="btn download" onClick={this.onDownload}>Download</button>
        <button className="btn open" onClick={this.onOpen.bind(this)}>Open</button>
      </div>
    );
  }
}

export default Photo;