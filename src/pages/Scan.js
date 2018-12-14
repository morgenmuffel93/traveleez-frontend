
import React, { Component } from 'react';
import axios from 'axios'

let body = {
  "requests": [
    {
      "image": {
        "source": {
          "imageUri": "http://newsimg.bbc.co.uk/media/images/45162000/jpg/_45162744_-2.jpg" //image URL
        }
      },
      "features": [
        {
          "type": "TEXT_DETECTION",
          "maxResults": 1
        }
      ]
    }
  ]
}

axios.post(`https://vision.googleapis.com/v1/images:annotate?key=`, body)
  .then((response) => console.log(response));
class Scan extends Component {
  state = {
    selectedFile: null,
    fileName: null,
    }

  fileChangedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      fileName: event.target.files[0].name,
    })
  }
  
  uploadHandler = () => { 
    console.log(this.state.selectedFile)
  }

  render() {
    return (
      <section className="scan-section translate-section">
        <h3>Upload an image to translate it</h3>
        <input type="file" onChange={this.fileChangedHandler} className="img-input"/>
        <button onClick={this.uploadHandler}>Upload!</button>
        {/* <div className="scan-image translation-img"><img src="../images/add-image.svg" alt="scan-icon"/></div> */}
        <textarea name="translated-box" cols="25" rows="10" placeholder="Translation here" value=""></textarea>
      </section>
    );
  }
}

export default Scan;