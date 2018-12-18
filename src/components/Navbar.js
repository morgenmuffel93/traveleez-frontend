import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import places from '../locations'

class Navbar extends Component {
  state = {
    search: '',
    locations: [],
    searchHappening: false,

  }

  renderIsLoggedIn = () => {
    return <div className="nav-container">
      <input type="text" className="input" placeholder="Search Location..." onChange={this.handleSearch} name="search" value={this.state.search} />
     
      <div className="nav-userinfo">
        <p id="text-userinfo">{this.props.user.username}</p>
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
      locations: [],
    })

    if (value.length > 2) {
     
      this.setState({
        searchHappening: true,
      })
      let locationsList = [];
      places.forEach((place) => {
        if (place.name.toLowerCase().includes(value.toLowerCase()) && locationsList.length < 10) {
          locationsList.push(place.name)
        }
      })
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

  takeValue = (value) => {
    this.setState({
      search: value.location,
      locations: [],
    })
    this.props.onUpdate(value.location.toLowerCase())
    }

  render() {
    const {locations} = this.state
    return (
      <nav>
        {this.props.isLogged ? this.renderIsLoggedIn() : this.renderIsNotLoggedIn()}
        <div className='location-list'>
        {locations.map((location, index) => {
                return <li key={index} className={'location-drop'}value={location} onClick={() => {this.takeValue({location})}}>
                {location}</li>
                
        })}
        </div>
      </nav>
    )
  }
}

export default withAuth(Navbar);