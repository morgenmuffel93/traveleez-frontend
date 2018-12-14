import React, { Component } from 'react';
import axios from 'axios'

let body = {
    "requests": [
      {
        "image": {
          "content": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEyNSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PGc+PHBhdGggZD0iTTUwLjA1Niw4OC4xMTNjLTAuMDM4LDAuMDAxLTAuMDc1LDAuMDAxLTAuMTEzLDBjLTAuNDMyLDAtMC44NjktMC4xMjktMS4yNDktMC4zOTkgICAgYy0xLjE5OS0wLjg1MS0yOS41MDItMjEuMDM4LTM5LjkzLTM4LjA2N2MtMC4wMTQtMC4wMjMtMC4wMjctMC4wNDYtMC4wNDEtMC4wNjljLTIuMzI3LTMuODYtMy41NTctOC4yOTItMy41NTctMTIuODIzICAgIGMwLTEzLjcxMiwxMS4xNTYtMjQuODY4LDI0Ljg2OC0yNC44NjhjNy45MzksMCwxNS4zMTEsMy43NzIsMTkuOTY1LDEwLjAzN2M0LjY1NC02LjI2NSwxMi4wMjctMTAuMDM3LDE5Ljk2NS0xMC4wMzcgICAgYzEzLjcxMiwwLDI0Ljg2OCwxMS4xNTYsMjQuODY4LDI0Ljg2OGMwLDQuNTMxLTEuMjMsOC45NjMtMy41NTcsMTIuODIzYy0wLjAxMywwLjAyMy0wLjAyNiwwLjA0Ni0wLjA0MSwwLjA2OSAgICBjLTEwLjQyNywxNy4wMjktMzguNzMsMzcuMjE2LTM5LjkzLDM4LjA2N0M1MC45MjYsODcuOTg0LDUwLjQ4OSw4OC4xMTMsNTAuMDU2LDg4LjExM3ogTTEyLjQ5LDQ3LjQ0OCAgICBDMjEuMzA4LDYxLjc5NCw0NC40NjgsNzkuMjYyLDUwLDgzLjMxOWM1LjUzMi00LjA1NywyOC42OTItMjEuNTI1LDM3LjUxLTM1Ljg3YzAuMDEtMC4wMTYsMC4wMi0wLjAzMywwLjAzLTAuMDUgICAgYzEuOTQyLTMuMTk5LDIuOTY5LTYuODc5LDIuOTY5LTEwLjY0NGMwLTExLjMyOC05LjIxNi0yMC41NDMtMjAuNTQzLTIwLjU0M2MtNy41NCwwLTE0LjQ2Miw0LjEyLTE4LjA2NSwxMC43NTMgICAgYy0wLjM3OCwwLjY5Ny0xLjEwOCwxLjEzLTEuOSwxLjEzcy0xLjUyMi0wLjQzMy0xLjktMS4xM2MtMy42MDMtNi42MzMtMTAuNTI1LTEwLjc1My0xOC4wNjUtMTAuNzUzICAgIGMtMTEuMzI4LDAtMjAuNTQzLDkuMjE2LTIwLjU0MywyMC41NDNjMCwzLjc2NSwxLjAyNiw3LjQ0NSwyLjk2OSwxMC42NDRDMTIuNDcsNDcuNDE1LDEyLjQ4LDQ3LjQzMiwxMi40OSw0Ny40NDh6Ii8+PC9nPjwvZz48dGV4dCB4PSIwIiB5PSIxMTUiIGZpbGw9IiMwMDAwMDAiIGZvbnQtc2l6ZT0iNXB4IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IidIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwtVW5pY29kZSwgQXJpYWwsIFNhbnMtc2VyaWYiPkNyZWF0ZWQgYnkgQUI8L3RleHQ+PHRleHQgeD0iMCIgeT0iMTIwIiBmaWxsPSIjMDAwMDAwIiBmb250LXNpemU9IjVweCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSInSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIEFyaWFsLVVuaWNvZGUsIEFyaWFsLCBTYW5zLXNlcmlmIj5mcm9tIHRoZSBOb3VuIFByb2plY3Q8L3RleHQ+PC9zdmc+"
        },
        "features": [
          {
            "type": "TEXT_DETECTION"
          }
        ]
      }
    ]
  }

  axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAOESSYVTHM5byC5-lzPdKX_6dbfTJwnq4', body)
  .then((response) => 
    console.log('this is a response', response.data.responses[0].fullTextAnnotation.text)
    )


class Scan extends Component {

  state = {
    selectedFile: null,
    fileName: null,
    text: '',
  }

  fileChangedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      fileName: event.target.files[0].name,
    })
  }

  uploadHandler = () => {
    axios.post('https://vision.googleapis.com/v1/images:annotate?key=', body)
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

