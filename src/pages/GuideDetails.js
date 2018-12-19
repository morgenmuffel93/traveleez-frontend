import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
import SavedService from '../lib/saved-service'
import { Link } from 'react-router-dom'

class GuideDetails extends Component {
  state = {
    guide: {},
    user: {},
    isLoading: true,
    status: '',
  }
  
  componentDidMount() {
    GuideService.getGuideDetails(this.props.match.params.id)
      .then((response) => {
        if (response.user[0].savedForLater.indexOf(response.guide._id) >= 0) {
          this.setState({
            guide: response.guide,
            isLoading: false,
            status: 'added',
            user: response.user[0],
            })

        } else {
          this.setState({
            guide: response.guide,
            isLoading: false,
            status: '',
            user: response.user[0]
            })
        }
      })
      .catch((error) => {
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
    })
  }

  handleSaved = () => {
    if (this.state.status === 'added') {
      return (
        <div> 
        <form onSubmit={this.handleSubmit} action="" className="interested-form">
        <button className="btn-interested" type="submit">I'm not interested anymore</button>
        </form>
        <p className="contact-text"><a className="contact-details" href={`mailto:${this.state.user.email}`} target="_top">Send Mail</a> or <a className="contact-details" href={`whatsapp://send?abid=${this.state.user.phone}&text=Hello%2C%20World!`}>Send Message</a></p>
        </div>
      )
    } else {
      return (
        <form onSubmit={this.handleSubmit} action="" className="interested-form">
        <button className="btn-interested" type="submit">I'm interested</button>
        </form>
      )
    }
  }

  render() {
    
    const { guide } = this.state;
    const { user } = this.state;

    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <section className="guide-details">
        <h2 className="card-title">{guide.title}</h2>
        <p><span className="underlined-span">Created by:</span> <Link to={`/profile/${user._id}`} className="guide-owner-text">{user.username}</Link></p>
        <p><span className="underlined-span">User's expertise:</span> {user.expertise}</p>
        <p id="guide-description">"{guide.description}"</p>
        {this.handleSaved()}
      </section>
     );
   }
}

export default GuideDetails;