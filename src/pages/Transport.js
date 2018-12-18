import React, { Component } from 'react';
import { LocationsConsumer } from "../providers/LocationsProvider";
import places from '../locations'

class Transport extends Component {
	state = {
		location: '',
    isLoading: true,
	}

	componentDidMount() {
		this.setState({
			isLoading: false,
    })
    console.log('heyy')
	}

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <div>isLoading</div>
    }
    return (
      <LocationsConsumer>
        {locationValue => {
          let filteredLocations = places;

          if (locationValue) {
            filteredLocations = places.filter(place => {
              return place.name.toLowerCase().includes(locationValue);
            }
            )
          }

          return (
            <section className="guide-list">
              <h2>List of transports</h2>
              {filteredLocations.map((location, index) => {
                return (
                  <div key={index} className="guide-card-container">
                  <p>{location.taxi}</p>
                  <p>{location.bus}</p>
                  <p>{location.train}</p>                
                  </div>
                )
              }
              )}
            </section>
          )
        }}

      </LocationsConsumer>
    );
  }
}

export default Transport;