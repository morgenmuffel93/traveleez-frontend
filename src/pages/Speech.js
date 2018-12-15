import React, { Component } from 'react';
import SpeechToTextDemo from '../pages/SpeechToTextDemo'


class Speech extends Component {

  state = {
    finalisedText: '',
    interimText: ''
  }

  render() {
    return (
      <section className="speech-section translate-section">
        <SpeechToTextDemo />
      </section>
    )
  }
}

export default Speech;

