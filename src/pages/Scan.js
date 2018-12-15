import React, { Component } from 'react';
import axios from 'axios'



  // axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAOESSYVTHM5byC5-lzPdKX_6dbfTJwnq4', body)
  // .then((response) => 
  //   console.log('this is a response', response.data.responses[0].fullTextAnnotation.text)
  //   )


class Scan extends Component {

  state = {
    selectedFile: null,
    fileName: null,
    text: '',
    base64: '',
  //   body : {requests: [
  //     {
  //       image: {
  //         content: ""
  //       },
  //       features: [
  //         {
  //           type: "TEXT_DETECTION"
  //         }
  //       ]
  //     }
  //   ]
  // }
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
        let base64String = result.replace("data:image/jpeg;base64,", "")
      
       console.log(base64String)
       console.log(result)
        this.setState({
            base64: base64String,
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
      console.log(response)
    })
      // this.setState({
      //   text: response.data.responses[0].fullTextAnnotation.text,
      // }


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

