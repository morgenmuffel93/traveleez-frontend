import React, { Component } from 'react';

class GuideCard extends Component {
  render() {
    return (
      <div className="guide-card">
        <p>{this.props.info.title}</p>
        <p>{this.props.info.date}</p>
        <p>{this.props.info.time}</p>
        <p>{this.props.info.desctiption}</p>
        <p>{this.props.info.location}</p>
        <p>{this.props.info.expertise}</p>
        <p>{this.props.info.duration}</p>
       </div>
    );
  }
}

export default GuideCard;