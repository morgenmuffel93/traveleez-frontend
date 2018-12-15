import React, { Component } from 'react';
import axios from 'axios'
import { debug } from 'util';




  // axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAOESSYVTHM5byC5-lzPdKX_6dbfTJwnq4', body)
  // .then((response) => 
  //   console.log(response.data.responses[0].fullTextAnnotation.text)
  //   )
    
    class Scan extends Component {
      
      state = {
        selectedFile: null,
        fileName: null,
        text: '',
      }
                convertFileToBase = () => {
                    debugger;
                  // Read the file into memory.
                  var fs = this.state.selectedFile;
                  var imageFile = fs.readFile(`${this.state.selectedFile}`);
                  
                  // Convert the image data to a Buffer and base64 encode it.
                  var encoded = Buffer.from(imageFile).toString('base64');
                    console.log(encoded)
                  return encoded
                }

  fileChangedHandler = (event) => {
    debugger;
    this.setState({
      selectedFile: event.target.baseURI,
      fileName: event.target.files[0].name,
    })
    
    

  }

  uploadHandler = () => {
    console.log(this.state)
    var imageLocation = this.state.selectedFile;
    debugger;
    console.log(imageLocation);
    let body = {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": imageLocation //image URL
            }
          }
          ,
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    }
    axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD9BB4rE3PJNaxMz5SYbN9Fk7m22lqp5LQ', body)
    .then((response) => 
      this.setState({
        text: response.data.responses[0].fullTextAnnotation.text,
      })
      
    )


    console.log(this.state.selectedFile)
  }

  render() {
    console.log(this.state.text)

    if (this.state.text) {
      return       <section className="scan-section translate-section">
      <h3>Upload an image to translate it</h3>
      <input type="file" onChange={this.fileChangedHandler} className="img-input" />
      <button onClick={this.uploadHandler}>Upload!</button>
      {/* <div className="scan-image translation-img"><img src="../images/add-image.svg" alt="scan-icon"/></div> */}
      <textarea name="translated-box" cols="25" rows="10" placeholder="Translation here" value={this.state.text}></textarea>
    </section>
    }

    return (
      <section className="scan-section translate-section">
        <h3>Upload an image to translate it</h3>
        <input type="file" onChange={this.fileChangedHandler} className="img-input" />
        <button onClick={this.uploadHandler}>Upload!</button>
        {/* <div className="scan-image translation-img"><img src="../images/add-image.svg" alt="scan-icon"/></div> */}
      </section>
    );
  }
}

export default Scan;

