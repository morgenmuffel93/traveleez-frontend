// Footer component

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withAuth } from '../providers/AuthProvider';


class Footer extends Component {

  renderIsLoggedIn = () => {
    return (
      <footer>
        <Link to="/"><div><img src={require('../images/squares.svg')} alt="main" className="footer-img" /></div></Link>
        <Link to="/scan"><div><img src={require('../images/scan.svg')} alt="scan" className="footer-img" /></div></Link>
        <Link to="/speech"><div><img src={require('../images/microphonenew.svg')} alt="microphone" className="footer-img" /></div></Link>
        <Link to="/my"><div><img src={require('../images/profile.svg')} alt="profile" className="footer-img" /></div></Link>
      </footer>
    )
  }

  renderIsNotLoggedIn = () => {
    return (
        <div>
      </div>
    )
  }


  render() {
    return (
      <div>
        {this.props.isLogged ? this.renderIsLoggedIn() : this.renderIsNotLoggedIn()}
      </div>
    )
  }
}

export default withAuth(Footer);