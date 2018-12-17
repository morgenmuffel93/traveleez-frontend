import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
import SavedService from '../lib/saved-service'
import { Link } from 'react-router-dom'

class GuideDetails extends Component {
  state = {
    guide: {},
    isLoading: true,
    status: '',
  }
  
  componentDidMount() {
    GuideService.getGuideDetails(this.props.match.params.id)
      .then((response) => {
        console.log(response.user.savedForLater);
        console.log(response.guide._id)
        if (response.user.savedForLater.indexOf(response.guide._id) >= 0) {
          this.setState({
            guide: response.guide,
            isLoading: false,
            status: 'added'
            })

        } else {
          this.setState({
            guide: response.guide,
            isLoading: false,
            status: ''
            })
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          isLoading: false,
        })
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    SavedService.saveForLater(this.props.match.params.id)
    .then((response) => {
      this.setState({
        status: response.status,
      })
      console.log('status:', this.state.status)
    })
  }

  handleSaved = () => {
    if (this.state.status === 'added') {
      return (
        <div> 
        <form onSubmit={this.handleSubmit} action="">
        <button className="btn-interested" type="submit">I'm not interested anymore</button>
        </form>
        <p><a href={`mailto:${this.state.guide.owner.email}`} target="_top">Send Mail</a> or <a href={`whatsapp://send?abid=${this.state.guide.owner.phone}&text=Hello%2C%20World!`}>Send Message</a></p>
        </div>
      )
    } else {
      return (
        <form onSubmit={this.handleSubmit} action="">
        <button className="btn-interested" type="submit">I'm interested</button>
        </form>
      )
    }
  }

  render() {
    
    const { guide } = this.state;

    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <section className="guide-details">
        <h2>{guide.name}</h2>
        <p>{guide.expertise}</p>
        <p>Created by: <Link to={`/profile/${guide.owner._id}`}>{guide.owner.username}</Link></p>
        <p>{guide.description}</p>
        {this.handleSaved()}
      </section>
     );
   }
}

export default GuideDetails;