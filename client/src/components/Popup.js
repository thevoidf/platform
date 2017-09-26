import React, { Component } from 'react';
import '../styles/popup.css';

import { getUser } from '../utils';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x || 0,
      y: this.props.y || 0,
      dragging: false
    };
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove.bind(this))
      document.addEventListener('mouseup', this.onMouseUp.bind(this))
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove.bind(this))
      document.removeEventListener('mouseup', this.onMouseUp.bind(this))
    }
  }

  onMouseDown(e) {
    if (e.button !== 0) return;
    const pos = e.target.getBoundingClientRect();
    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      }
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e) {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e) {
    if (!this.state.dragging) return;
    this.setState({
      x: e.pageX - this.state.rel.x,
      y: e.pageY - this.state.rel.y
    })
    e.stopPropagation();
    e.preventDefault();
  }

  onCloseClicked(e) {
    this.props.toggle();
  }

  Bg() {
    if (this.props.dim) {
      return <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: '0'
      }}></div>;
    }
    return '';
  }

  onSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('username', getUser());
    formData.append('title', this.titleInput.value);
    formData.append('photo', this.imageInput.files[0]);

    fetch('/api/photos', {
      method: 'POST',
      body: formData
    }).then(resp => resp.json())
      .then(data => {
        this.titleInput.value = '';
        this.imageInput.value = '';
        this.props.onPopupSubmited(data.photo);
    });
  }

  renderImage() {
    if (this.props.image) {
      return <img className="image" src={this.props.image.src} alt={this.props.image.alt} />
    }
    return '';
  }

  renderForm() {
    if (this.props.form) {
      return (
        <form className="popup-form sn-row" onSubmit={this.onSubmit.bind(this)} encType="multipart/form-data">
          {this.props.form.fields.map((f, i) =>
            <input
              key={i}
              type={f.type}
              placeholder={f.hint}
              ref={(input) => this[f.title + 'Input'] = input} />)}
          <input className="btn" type="submit" value={this.props.form.submit || 'Submit'} />
        </form>
      );
    }
    return '';
  }

  render() {
    return (
      <div className={this.props.isVisible ? "" : " hide"}>
        <div className="popup card" style={Object.assign({
          left: this.state.x + 'px',
          top: this.state.y + 'px'
        }, this.props.style ? this.props.style: {})}>
          <div className="actions" onMouseDown={this.onMouseDown.bind(this)}>
            <span className="action close" onClick={this.onCloseClicked.bind(this)}>X</span>
          </div>
          {this.props.title ? <h2 className="title">{this.props.title}</h2> : ''}
          {this.renderForm()}
          {this.renderImage()}
        </div>
        {this.Bg()}
      </div>
    );
  }
}

export default Popup;