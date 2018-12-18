// Footer component

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import Square from './images/square'
// import Scan from './images/scan'
// import Microphone from './images/microphone'

class Footer extends Component {
  render() {
    return (
      <footer>
        <Link to="/"><div><img src={require('../images/squares.svg')} alt="main" className="footer-img"/></div></Link>
        <Link to="/scan"><div><img src={require('../images/scan.svg')} alt="scan" className="footer-img"/></div></Link>
        <Link to="/speech"><div><img src={require('../images/microphonenew.svg')} alt="microphone" className="footer-img"/></div></Link>
        <Link to="/my"><div><img src={require('../images/profile.svg')} alt="profile" className="footer-img"/></div></Link>
      </footer>
    );
  }
}

export default Footer;