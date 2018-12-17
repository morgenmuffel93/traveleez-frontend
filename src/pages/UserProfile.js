import React, { Component } from 'react';
import GuideCard from './GuideCard'
import ProfileService from '../lib/profile-service'
import { Link } from 'react-router-dom'

class Profile extends Component {
  state = {
    user: {},
    isLoading: true,
  }
  
  componentDidMount() {
    ProfileService.getOtherUserInfo(this.props.match.params.id)
      .then((user) => {
        this.setState({
          user,
          isLoading: false,
          })
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const { user } = this.state;

  if (this.state.isLoading) {
    return <div>Loading...</div>
  }

    return (
      <section className="my-profile">
        <h2>{user.username}'s profile</h2>
        <p>User expertise: {user.expertise}</p>
        <div className="my-guides">
          <h3 className="my-guides-title">User guides</h3>
          <button>Create your own guide</button>
          {user.guides.map((guide, index) => {
          return (
            <div key={index} className="guide-card-container">
                <Link to={`/guides-list/${guide._id}`}><GuideCard key ={guide._id} info = {guide}/></Link>
                </div>
          )}
        )}
        </div>
      </section>
    );
  }
}

export default Profile;