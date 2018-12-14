import React, { Component } from 'react';
import GuideCard from './GuideCard'

class Profile extends Component {
  render() {
    return (
      <section className="my-profile">
        <h2>Your profile</h2>
        <p id="text-userinfo" onClick={this.props.logout}>Logout</p>
        <p>Your expertise</p>
        <div className="my-info">
          <p>E-mail:</p>
          <input type="text" value="blabla@blabla.com" />
          <button>Change</button>
        </div>
        <div>
          <p>Phone:</p>
          <input type="text" value="123456789" />
          <button>Change</button>
        </div>
        <div className="my-guides">
          <h3 className="my-guides-title">Your guides</h3>
          <button>Create guide</button>
            {/* <GuideCard /> */}
        </div>
        
      </section>
    );
  }
}

export default Profile;