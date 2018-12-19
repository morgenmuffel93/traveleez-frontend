import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
import { Link } from 'react-router-dom'
import GuideCard from './GuideCard';
import places from '../locations'

import { LocationsConsumer } from "../providers/LocationsProvider";

class GuidesList extends Component {
  state = {
    guides: [],
    isLoading: true,
  }


  componentDidMount() {
    GuideService.getAllGuides()
      .then((guides) => {
        this.setState({
          guides,
          isLoading: false,
        })
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        })
      })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const id = e.target.attributes.id.value;
    GuideService.deleteGuide(id)
      .then((result) => {
        const guides = this.state.guides;
        guides.splice(guides.findIndex(v => v._id === result._id), 1)

        this.setState({
          guides,
        })
      })
  }

  checkImageAndTitle = (locationValue) => {
    let locationInfo = [];

    if (locationValue) {
      locationInfo = places.filter(place => {
        return place.name.toLowerCase().includes(locationValue);
      }
      )
    }
    if (locationInfo.length > 0) {
      return (
        <div class="guides-main-img-container">
          <img src={locationInfo[0].picture} alt="City" className="city-img" />
          <h2 className="city-name-title">{locationInfo[0].name}</h2>
        </div>
      )
    } else {
      return (
        <div class="guides-main-img-container">
          <img src='https://images.unsplash.com/photo-1492129214534-08dd697407ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' alt="City" className="city-img" />
          <h2 className="city-name-title">Explore guides</h2>
        </div>
      )
    }

  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div>isLoading</div>
    }
    return (
      <LocationsConsumer>
        {locationValue => {
          let filteredGuides = this.state.guides;


          if (locationValue) {
            filteredGuides = this.state.guides.filter(guide => {
              return guide.location.toLowerCase().includes(locationValue);
            }
            )
          }
          return (
            <section className="guide-list">
              {this.checkImageAndTitle(locationValue)}
              <Link to="/guides-list/create" className="btn">Create your own</Link>
              <div class="guide-list-container">
                {filteredGuides.map((guide, index) => {
                  return (
                    <div key={index} className="guide-card-container">
                      <GuideCard key={guide._id} info={guide} />
                    </div>
                  )
                }
                )}
              </div>
            </section>
          )
        }}

      </LocationsConsumer>
    );
  }
}

export default GuidesList;