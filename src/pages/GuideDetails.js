import React, { Component } from 'react';

class GuideDetails extends Component {
  render() {
    return (
      <section class="guide-details">
        <h2>Title</h2>
        <p>Expertise</p>
        <p>Created by: user</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button className="btn-interested">I'm interested</button>
      </section>
    );
  }
}

export default GuideDetails;