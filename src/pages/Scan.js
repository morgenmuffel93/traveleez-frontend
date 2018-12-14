
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

axios.post(`https://vision.googleapis.com/v1/images:annotate?key=YOURAPIKEY`, body)
  .then((response) => console.log(response));
class Scan extends Component {
  render() {
    return (
      <section className="scan-section translate-section">
        <h3>Upload an image to translate it</h3>
        <div className="scan-image translation-img"><img src="../images/add-image.svg" alt="scan-icon"/></div>
        <textarea name="translated-box" cols="25" rows="10" placeholder="Translation here" value=""></textarea>
      </section>
    );
  }
}

export default Scan;