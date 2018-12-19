import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class GuideCard extends Component {
  render() {
    return (
      <div className="guide-card">
        <div className="card-title">
          <h3>{this.props.info.title}</h3>
        </div>
        <div className="card-when-container">
          <div className="card-when-info">
            <p id="card-when-text">{this.props.info.date}</p>
            <p id="card-when-text">{this.props.info.location}</p>
          </div>
        </div>
        <div className="see-more-container">
          <Link to={`/guides-list/${this.props.info._id}`} className="guide-see-more">See more...</Link>
        </div>
      </div>
    );
  }
}

export default GuideCard;