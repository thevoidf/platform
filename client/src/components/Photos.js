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
      popupVisible: false
    };
  }

  componentDidMount() {
    fetch('/api/photos/' + utils.getUser())
      .then(resp => resp.json())
      .then(photos => {
        const photoRows = this.formatData(photos);
        this.setState({photos: photoRows})
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
                <Photo key={i} title={p.title} photo={p.filePath} />)}
            </div>
          )}
      </div>
      );  
    }
    return '';
  }

  togglePopup() {
    const popupVisible = this.state.popupVisible;
    this.setState({
      popupVisible: !popupVisible
    });
  }

  onAddPhotoClicked(e) {
    this.togglePopup();
  }

  onPhotoAdded(newPhoto) {
    const photos = this.state.photos;
    this.addPhoto(photos, newPhoto);
    this.setState({photos});
    this.togglePopup();
  }

  renderPopup() {
    if (this.state.popupVisible) {
      return <Popup title="Popup text" form={{
        fields: [
          { type: 'text', title: 'title', hint: 'Title...' },
          { type: 'file', title: 'image' },
        ],
        submit: 'Upload photo'
      }} onPopupSubmited={this.onPhotoAdded.bind(this)} />
    }
    return '';
  }

  render() {
    return (
      <div className="photos">
        <h1>{utils.getUser() + '\'s Photos'}</h1>
        <button className="btn" onClick={this.onAddPhotoClicked.bind(this)}>Add photo</button>
        {this.renderPhotos()}
        {this.renderPopup()}
      </div>
    );
  }
}

export default Photos;