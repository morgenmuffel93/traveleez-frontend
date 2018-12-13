import React, { Component } from 'react';

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