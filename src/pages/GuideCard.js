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
          <div className="card-when-title">
            <p><span className="bold-span">When:</span></p>
          </div>
          <div className="card-when-info">
            <p className="card-when-text">{this.props.info.date}</p>
            <p className="card-when-text">{this.props.info.time}</p>
          </div>
        </div>
        <div className="card-when-container">
          <div className="card-where-title">
            <p><span className="bold-span">Where:</span></p>
          </div>
          <div className="card-when-info">
            <p className="card-when-text">{this.props.info.location}</p>
          </div>
        </div>
        <div>
        <Link to={`/guides-list/${this.props.info._id}`} class="guide-see-more">See more...</Link>
        </div>
      </div>
    );
  }
}

export default GuideCard;