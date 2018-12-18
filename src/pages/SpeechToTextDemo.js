
import React, { Component } from 'react';
import SpeechToText from 'speech-to-text';
import axios from 'axios'


class SpeechToTextDemo extends Component {
  state = {
    error: '',
    interimText: '',
    finalisedText: [],
    listening: false,
    translation: '',
    readBack: '',
    target: '',
  };

  componentDidMount() {
    const onAnythingSaid = text => {
      this.setState({ interimText: text });
    };

    const onEndEvent = () => {
      if (this.state.listening) {
        this.startListening();
      }
    };

    const onFinalised = text => {

      this.setState({
        finalisedText: [...this.state.finalisedText, text],
        interimText: ''
      });
    };

    try {
      this.listener = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  startListening = () => {
    try {
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (err) {
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({
      listening: false
    });
  };

  translateHandler = () => {

    let joined = this.state.finalisedText.join('. ')
    let googleTarget = this.state.target.replace(/-[a-z][a-z]/, '')

    axios.post(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyAkNyUzuGnqGuOtK-meyLLydVTPECloI14&q=${joined}&target=${googleTarget}`)
      .then((response) => {
        this.setState({
          finalisedText: [response.data.data.translations[0].translatedText],
        })
      })
  }
  readOutLoud = () => {
    axios.get(`https://api.voicerss.org/?key=ab98abe31f3a4a11bbbf68f7b9f6d334&hl=${this.state.target}&src=${this.state.finalisedText}&c=mp3&rnd=0.7265951914142883&b64=true`)
      .then((response) => {
        this.playSound(response)
        this.setState({
          readBack: response.data
        })


      })

  }
  playSound = (response) => {
    window.beeb = new Audio(response.data)
  }

  handleLanguage = (e) => {
    this.setState({
      target: e.target.value,
    })
  }

  handleWriting = (e) => {
    e.preventDefault();
    this.setState({
      finalisedText: e.target.value,
    })
  }
  resetTranslate = (e) => {
    e.preventDefault();
    this.setState({
      finalisedText: '',
    })
  }

  render() {
    const { error, interimText, listening } = this.state;

    let content;
    if (error) {
      content = (
        <p>	{error}	</p>
      );
    } else {
      let buttonForListening;

      if (listening) {
        buttonForListening = (
          <button onClick={() => this.stopListening()}>
            Stop Listening <span role="img" aria-label="stop Listening">&#127908;</span>
          </button>
        );
      } else {
        buttonForListening = (
          <button onClick={() => this.startListening()}>
            Start Listening <span role="img" aria-label="stop Listening">&#127908;</span>
          </button>
        );
      }
      content = (

        <div className="speech-section">
          {/* <p>Status: {listening ? 'listening...' : 'finished listening'} */}
          {buttonForListening}
          {/* </p> */}
          <div className="current-text speech-text">
            Current:
              <textarea name="translated-box" cols="25" rows="3" placeholder="Current" value={interimText}></textarea>
          </div>

            <div>
              <div className="finalised-text speech-text">
                Finalised Text
                  {/* {finalisedText.map((str, index) => {
                    return (
                      <div key={index}>
                        {str}
                      </div>
                    );
                  })} */}
              <textarea name="translated-box" cols="25" rows="5" placeholder="Final text" value={this.state.finalisedText} onChange={this.handleWriting}></textarea>
              <button id="reset-button" onClick={this.resetTranslate}>Reset</button>
              <button onClick={this.readOutLoud} id="play-btn">Play &#9654;</button>
              </div>
              <div className="lang-opt-container">
                <select name="language" id="lang-selector" onChange={this.handleLanguage}>
                  <option disabled selected>Select language</option>
                  <option value="es-es">Spanish</option>
                  <option value="en-gb">English</option>
                  <option value="de-de">German</option>
                  <option value="ca-es">Catalan</option>
                </select>
                <button onClick={this.translateHandler}>Translate!</button>
                

              </div>
              <audio controls="controls" src={this.state.readBack} autoPlay="autoplay">
              </audio>
              
            </div>
            </div>
            );
          }
      
          return (
            <div>
              {content}
            </div>

            );
          }
        }
        
export default SpeechToTextDemo;