import React, { Component } from 'react';
import '../styles/photos.css';
import Photo from './Photo';
import Popup from './Popup';

import * as utils from '../utils';

class Photos extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      uploadPopup: false,
      imagePopup: {
        src: '',
        isVisible: false,
        alt: ''
      }
    };
  }

  componentDidMount() {
    fetch('/api/photos/' + utils.getUser())
      .then(resp => resp.json())
      .then(photos => {
        const photoRows = this.formatData(photos);
        this.setState({photos: photoRows});
      });
  }

  formatData(photos) {
    let col = [];
    return photos.reduce((r, c, i) => {
      if (i % 3 === 0) {
        col = [];
        col.push(c);
        r.push(col);
        return r;
      } else {
        col.push(c);
        return r;
      }
    }, []);
  }

  addPhoto(photos, photo) {
    if (photos.length === 0) {
      const row = [];
      photos.push(row);
      row.push(photo);
    } else {
      const latestIndex = photos.length - 1;
      const latestRow = photos[latestIndex];
      if (latestRow.length >= 3) {
        const row = [];
        photos.push(row);
        row.push(photo);
      } else {
        photos[latestIndex].push(photo);
      }
    }
    return photos;
  }

  renderPhotos() {
    if (this.state.photos.length > 0) {
      return (
        <div className="photo-list">
          {this.state.photos.map((p, i) =>
            <div key={i} className="row">
              {this.state.photos[i].map((p, i) =>
                <Photo key={i} id={p.id} title={p.title} photo={p.filePath} open={this.onImageOpen.bind(this)} />)}
            </div>
          )}
      </div>
      );
    }
    return '';
  }

  toggleUploadPopup() {
    const uploadPopup = this.state.uploadPopup;
    this.setState({
      uploadPopup: !uploadPopup
    });
  }

  toggleImagePopup() {
    const imagePopup = this.state.imagePopup;
    imagePopup.isVisible = !imagePopup.isVisible;
    this.setState({
      imagePopup: imagePopup
    });
  }

  onAddPhotoClicked(e) {
    this.toggleUploadPopup();
  }

  onPhotoAdded(newPhoto) {
    const photos = this.state.photos;
    this.addPhoto(photos, newPhoto);
    this.setState({photos});
    this.toggleUploadPopup();
  }

  onImageOpen(image) {
    const imagePopup = this.state.imagePopup;
    this.toggleImagePopup();
    imagePopup.src = image.src;
    imagePopup.alt = image.title;
    this.setState({imagePopup});
  }

  render() {
    return (
      <div className="photos">
        <h1>{utils.getUser() + '\'s Photos'}</h1>
        <button className="btn" onClick={this.onAddPhotoClicked.bind(this)}>Add photo</button>
        {this.renderPhotos()}
        <Popup title="Popup text"
          x={200} y={40}
          isVisible={this.state.uploadPopup}
          form={{
            fields: [
              { type: 'text', title: 'title', hint: 'Title...' },
              { type: 'file', title: 'photo' },
            ],
            submit: 'Upload photo',
            route: 'photos'
          }}
          onPopupSubmited={this.onPhotoAdded.bind(this)}
          toggle={this.toggleUploadPopup.bind(this)} />
        <Popup
          x={100} y={20}
          isVisible={this.state.imagePopup.isVisible}
          dim={true}
          image={{
            src: this.state.imagePopup.src,
            alt: this.state.imagePopup.alt
          }}
          style={{
            width: '820px'
          }}
          toggle={this.toggleImagePopup.bind(this)} />
      </div>
    );
  }
}

export default Photos;
