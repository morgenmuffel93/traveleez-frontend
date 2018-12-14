import React, { Component } from 'react';

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