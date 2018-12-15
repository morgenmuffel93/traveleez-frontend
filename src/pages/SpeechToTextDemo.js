
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
      console.log('yoyoy');
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

    console.log('after', joined)
    axios.post(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyAkNyUzuGnqGuOtK-meyLLydVTPECloI14&q=${joined}&target=es`)
      .then((response) => {
        console.log(response)
        this.setState({
          finalisedText: [response.data.data.translations[0].translatedText],
        })
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
          <button onClick={this.translateHandler}>Translate!</button>
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