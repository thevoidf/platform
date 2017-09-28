import React, { Component } from 'react';
import '../styles/audio-player.css';

import ReactAudioPlayer from 'react-audio-player';

class AudioPlayer extends Component {
  render() {
    return (
      <div className="audio-player card">
        <h2 className="title">{this.props.title}</h2>
        <ReactAudioPlayer src={this.props.src} autoplay controls />
      </div>
    );
  }
}

export default AudioPlayer;
