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
    fullBase64: '',
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
      this.toBase64(this.state.selectedFile, (result) => {
        let base64String = result.split(",")

        this.setState({
          base64: base64String[1],
          fullBase64: result,
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
  }

  labelName = () => {
    if (this.state.fileName) {
      return <label for="file-input" class="input-label">
        {this.state.fileName}
      </label>
    } else {
      return <label for="file-input" class="input-label">
        Browse...
      </label>
    }
  }

  handlePreview = () => {
    if (this.state.fullBase64) {
      return <img src={this.state.fullBase64} alt="" className="base64-img" />

    }
  }

  handleWriting = (e) => {
    e.preventDefault();
    this.setState({
      text: e.target.value,
    })
  }

  handleUploadButton = () => {
    if (this.state.fileName) {
      return <button onClick={this.uploadHandler}>Upload!</button>
    }
  }


  render() {

    if (this.state.translation) {
      return <section className="scan-section translate-section">
        <h3>Voilà!</h3>
        <img src={this.state.fullBase64} alt="" className="base64-img" />
        <textarea name="translated-box" cols="25" rows="3" placeholder="Translation here" value={this.state.translation}></textarea>
        <div className="lang-opt-container">
          <select name="language" id="lang-selector" onChange={this.handleLanguage}>
            <option disabled selected>Select language</option>
            <option value="es">Spanish</option>
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="ca">Catalan</option>
          </select>
          <button onClick={this.translateHandler}>Translate!</button>
        </div>
      </section>
    }

    if (this.state.text) {
      return <section className="scan-section translate-section">
        <h3>Check the text and fix if necessary</h3>
        <img src={this.state.fullBase64} alt="" className="base64-img" />
        <textarea name="translated-box" cols="25" rows="3" placeholder="Translation here" value={this.state.text} onChange={this.handleWriting}></textarea>
        <div className="lang-opt-container">
          <select name="language" id="lang-selector" onChange={this.handleLanguage}>
            <option disabled selected>Select language</option>
            <option value="es">Spanish</option>
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="ca">Catalan</option>
          </select>
          <button onClick={this.translateHandler}>Translate!</button>
        </div>
      </section>
    }

    return (
      <section className="scan-section translate-section">
        <h3>Upload an image to translate it</h3>
        <div class="input-file-container">
          <input type="file" onChange={this.fileChangedHandler} className="img-input hidden" id="file-input" />
          {this.labelName()}
        </div>
        {this.handlePreview()}
        {this.handleUploadButton()}
      </section>
    );
  }
}

export default Scan;
