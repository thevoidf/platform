import React, { Component } from 'react';
import '../styles/music.css';

import Popup from './Popup';
import AudioPlayer from './AudioPlayer';

import { getUser } from '../utils';

class Music extends Component {
  constructor() {
    super();
    this.state = {
      uploadPopup: false,
      music: []
    };
  }

  componentDidMount() {
    fetch('/api/music/' + getUser())
      .then(resp => resp.json())
      .then(music => this.setState({music}));
  }

  onAddMusicClicked(e) {
    this.toggleUploadPopup();
  }

  onMusicAdded(newMusic) {
  }

  toggleUploadPopup() {
    const uploadPopup = this.state.uploadPopup;
    this.setState({
      uploadPopup: !uploadPopup
    });
  }

  renderMusicPlayers() {
    const music = this.state.music;
    if (music.length > 0) {
      return (
        <div className="players">
          {music.map((m, i) =>
            <AudioPlayer key={i} src={m.filePath} title={m.title} />)}
        </div>
      );
    }
    return '';
  }

  render() {
    return (
      <div className="music">
        <h1>{getUser()}'s Music</h1>
        <button className="btn" onClick={this.onAddMusicClicked.bind(this)}>Add photo</button>

        {this.renderMusicPlayers()}
        <Popup title="Upload music"
          x={200} y={40}
          isVisible={this.state.uploadPopup}
          form={{
            fields: [
              { type: 'text', title: 'title', hint: 'Title...' },
              { type: 'file', title: 'music' },
            ],
            submit: 'Upload music',
            route: 'music'
          }}
          onPopupSubmited={this.onMusicAdded.bind(this)}
          toggle={this.toggleUploadPopup.bind(this)} />
      </div>
    );
  }
}

export default Music;
