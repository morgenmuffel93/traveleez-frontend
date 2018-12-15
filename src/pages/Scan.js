import React, { Component } from 'react';
import axios from 'axios'

class Scan extends Component {

  state = {
    selectedFile: null,
    fileName: null,
    text: '',
    translation: '',
    base64: '',
    target: '',
  }

  toBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result)
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  fileChangedHandler = (event) => {
    
    this.setState({
      selectedFile: event.target.files[0],
      fileName: event.target.files[0].name,
    }, () => {

      let base64String = '';
      console.log(this.state.selectedFile)
      this.toBase64(this.state.selectedFile, (result) => {
        let base64String = result.split(",")
        
       console.log(base64String)
       console.log(result)
        this.setState({
            base64: base64String[1],
        })
      })
    })
  }

  uploadHandler = () => {
    let { base64 } = this.state
    let body = {
      "requests": [
        {
          "image": {
            "content": base64
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    }
    axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAkNyUzuGnqGuOtK-meyLLydVTPECloI14', body)
      .then((response) => {
        this.setState({
          text: response.data.responses[0].fullTextAnnotation.text,
        })
      })
  }

  handleLanguage = (e) => {
    this.setState({
      target: e.target.value,
    })
  }


  translateHandler = () => {
    axios.post(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyAkNyUzuGnqGuOtK-meyLLydVTPECloI14&q=${this.state.text}&target=${this.state.target}`)
      .then((response) => {
        this.setState({
          translation: response.data.data.translations[0].translatedText,
        })
      })
    // console.log(this.state.selectedFile)
  }

  
  

  render() {
    // console.log(this.state.text)

    if (this.state.translation) {
      return <section className="scan-section translate-section">
        <h3>Voilà!</h3>
        <textarea name="translated-box" cols="25" rows="10" placeholder="Translation here" value={this.state.translation}></textarea>
        <select name="language" id="" onChange={this.handleLanguage}>
          <option disabled selected>Select language</option>
          <option value="es">Spanish</option>
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="ca">Catalan</option>
        </select>
        <button onClick={this.translateHandler}>Translate!</button>
      </section>
    }

    if (this.state.text) {
      return <section className="scan-section translate-section">
        <h3>If this seems correct, click on translate and magic will happen</h3>
        <textarea name="translated-box" cols="25" rows="10" placeholder="Translation here" value={this.state.text}></textarea>
        <select name="language" id="" onChange={this.handleLanguage}>
          <option disabled selected>Select language</option>
          <option value="es">Spanish</option>
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="ca">Catalan</option>
        </select>
        <button onClick={this.translateHandler}>Translate!</button>
      </section>
    }

    return (
      <section className="scan-section translate-section">
        <h3>Upload an image to translate it</h3>
        <input type="file" onChange={this.fileChangedHandler} className="img-input" />
        <button onClick={this.uploadHandler}>Upload!</button>
     
      </section>
    );
  }
}

export default Scan;
