
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
      console.log(err);
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({
      listening: false
    });
  };

  translateHandler = () => {

    console.log('before', this.state.finalisedText[0])
    let joined = this.state.finalisedText.join('. ')
    let googleTarget = this.state.target.replace(/-[a-z][a-z]/, '')

    axios.post(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyAkNyUzuGnqGuOtK-meyLLydVTPECloI14&q=${joined}&target=${googleTarget}`)
      .then((response) => {
        console.log(response)
        this.setState({
          finalisedText: [response.data.data.translations[0].translatedText],
        })
      })
  }
  readOutLoud = () => {
    axios.get(`http://api.voicerss.org/?key=ab98abe31f3a4a11bbbf68f7b9f6d334&hl=${this.state.target}&src=${this.state.finalisedText}&c=mp3&rnd=0.7265951914142883&b64=true`)
      .then((response) => {
        this.playSound(response)
        console.log(response.data)
        this.setState({
          readBack: response.data
        })
        console.log("link", this.state.readBack)


      })

    // console.log(this.state.selectedFile)
  }
  playSound = (response) => {
    window.beeb = new Audio(response.data)
  }

  handleLanguage = (e) => {
    this.setState({
      target: e.target.value,
    })
  }

  render() {
    const { error, interimText, finalisedText, listening } = this.state;

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
            Stop Listening
          </button>
        );
      } else {
        buttonForListening = (
          <button onClick={() => this.startListening()}>
            Start Listening
          </button>
        );
      }
      content = (

        <div>
          <p>Status: {listening ? 'listening...' : 'finished listening'}
            {buttonForListening}
          </p>
          <p>
            Current utterances
							{interimText}
          </p>

          <div>
            <div>
              <div>
                <div>Finalised Text</div>
              </div>
              <div>
                {finalisedText.map((str, index) => {
                  return (
                    <div key={index}>
                      {str}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <textarea name="translated-box" cols="25" rows="10" placeholder="Translation here" value={this.state.finalisedText}></textarea>
          <select name="language" id="" onChange={this.handleLanguage}>
            <option disabled selected>Select language</option>
            <option value="es-es">Spanish</option>
            <option value="en-gb">English</option>
            <option value="de-de">German</option>
            <option value="ca-es">Catalan</option>
          </select>
          <button onClick={this.translateHandler}>Translate!</button>
          <audio controls="controls" src={this.state.readBack} autoPlay="autoplay">
          </audio>
          <button onClick={this.readOutLoud}>ROL!</button>
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