import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
import { Link } from 'react-router-dom'

class GuideDetails extends Component {
  state = {
    guide: {},
    isLoading: true,
  }
  
  componentDidMount() {
    GuideService.getGuideDetails(this.props.match.params.id)
      .then((guide) => {
        console.log(guide)
        this.setState({
          guide,
          isLoading: false,
          })
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          isLoading: false,
        })
      })
  }


  render() {
    
    const { guide } = this.state;

    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <section class="guide-details">
        <h2>{guide.name}</h2>
        <p>{guide.expertise}</p>
        <p>Created by: <Link to={`/profile/${guide.owner._id}`}>{guide.owner._id}</Link></p>
        <p>{guide.description}</p>
        <button className="btn-interested">I'm interested</button>
      </section>
    );
  }
}

export default GuideDetails;