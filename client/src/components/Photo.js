import React, { Component } from 'react';
import fileDownload from 'js-file-download';
import '../styles/photo.css';

class Photo extends Component {
  onDownload(e) {
    const photoId = e.target.parentNode.id;
    fetch('/api/photos/download/' + photoId)
      .then(resp => resp.blob())
      .then(data => fileDownload(data, 'image.jpg'));
  }

  render() {
    return (
      <div id={this.props.id} className="photo card col">
        <h2 className="title">{this.props.title}</h2>
        <img className="image" src={this.props.photo} alt={this.props.title} />
        <button className="btn" onClick={this.onDownload}>Download</button>
      </div>
    );
  }
}

export default Photo;