import React, { Component } from 'react';

class Speech extends Component {
  render() {
    return (
      <section className="speech-section translate-section">
        <h3>Tap the image to start recording</h3>
        <div className="speech-image translation-img"><img src="../images/speech-micro.svg" alt="speech-icon" /></div>
        <textarea name="translated-box" cols="25" rows="10" placeholder="Translation here" value=""></textarea>
      </section>
    )
  }
}

export default Speech;