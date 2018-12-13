import React, { Component } from 'react';
import GuideCard from './GuideCard'

class Profile extends Component {
  render() {
    return (
      <section className="my-profile">
        <h2>User profile</h2>
        <p>User expertise</p>
        <div className="my-guides">
          <h3 className="my-guides-title">User guides</h3>
          <button>Create your own guide</button>
            <GuideCard />
        </div>
      </section>
    );
  }
}

export default Profile;