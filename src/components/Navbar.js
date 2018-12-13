import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import places from '../locations'

class Navbar extends Component {
  state = {
    search: '',
    locations: [],

  }

  renderIsLoggedIn = () => {
    return <div className="nav-container">
      <input type="text" className="input" placeholder="Search Location..." onChange={this.handleSearch} name="search" value={this.state.search} />
      <div>
        {this.state.locations.map((place, index) => {
          return <div key={index}>
            {/* {locations} */}
          </div>
        })}
      </div>
      <div className="nav-userinfo">
        <p id="text-userinfo">username: {this.props.user.username}</p>
        <p id="text-userinfo" onClick={this.props.logout}>Logout</p>
      </div>
    </div>
  }

  renderIsNotLoggedIn = () => {
    return <div>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
    </div>
  }

  findLocation = (value) => {
    this.setState({
      locations: []
    })

    if (value.length > 2) {
      let locationsList = [];
      places.forEach((place) => {
        if (place.name.toLowerCase().includes(value.toLowerCase())) {
          locationsList.push(place.name)
        }
      })
      if (value.length < 2) {
        locationsList = [];
      }
      this.setState({
        locations: locationsList,
      })
    }

  }


  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
    })
    this.findLocation(event.target.value)
  }

  render() {
    return (
      <nav>
        {this.props.isLogged ? this.renderIsLoggedIn() : this.renderIsNotLoggedIn()}
      </nav>
    )
  }
}

export default withAuth(Navbar);