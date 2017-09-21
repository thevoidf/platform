import React, { Component } from 'react';
import '../styles/popup.css';

import { getUser } from '../utils';

class Popup extends Component {
  componentDidMount() {
    this.titleInput.focus();
  }

  onCloseClicked(e) {
    this.props.toggle();
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

  renderForm() {
    if (this.props.form.fields) {
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
      <div className={"popup card" + (this.props.isVisible ? "" : " hide")}>
        <div className="actions">
          <span className="action close" onClick={this.onCloseClicked.bind(this)}>X</span>
        </div>
        <h2 className="title">{this.props.title}</h2>
        {this.renderForm()}
      </div>
    );
  }
}

export default Popup;