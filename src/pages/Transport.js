import React, { Component } from 'react';
import { LocationsConsumer } from "../providers/LocationsProvider";
import places from '../locations'
import Transition from 'react-transition-group/Transition';

class Transport extends Component {
  state = {
    location: '',
    isLoading: true,

  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <div>isLoading</div>
    }
    return (
      <LocationsConsumer>
        {locationValue => {
          let locationValueUpper = locationValue.charAt(0).toUpperCase() + locationValue.slice(1);
          let filteredLocations = [];

          if (locationValue) {
            filteredLocations = places.filter(place => {
              return place.name.toLowerCase().includes(locationValue);
            }
            )
          }

          return (
          
            <section className="guide-list">
              <h2>{locationValue ? locationValueUpper : 'Enter location above'}</h2>

              {!locationValue ? <div>select a city first</div> : filteredLocations.map((location, index) => {
                return (
                  <div key={index} className="train-card-container">
                    <Transition timeout={4000} in={true} appear>
                      {(status) => (
                        <div className={`transport-info taxi taxi-icon-${status}`}>
                          <img src={require('../images/taxi.svg')} alt="taxi" className="footer-img" />
                          <p>{location.taxi}</p>
                        </div>
                      )}</Transition>
                    <Transition timeout={4000} in={true} appear>
                      {(status) => (
                        <div className={`transport-info bus bus-icon-${status}`}>
                          <img src={require('../images/bus.svg')} alt="bus" className="footer-img" />
                          <p>{location.bus}</p>
                        </div>
                      )}</Transition>
                    <Transition timeout={4000} in={true} appear>
                      {(status) => (
                        <div className={`transport-info train train-icon-${status}`}>
                          <img src={require('../images/tram.svg')} alt="train" className="footer-img" />
                          <p>{location.train}</p>
                        </div>
                      )}</Transition>
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