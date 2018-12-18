import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
import { Link } from 'react-router-dom'
import GuideCard from './GuideCard';

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
              <h2>List of guides</h2>
              <Link to="/guides-list/create" className="btn">Create your own</Link>
              {filteredGuides.map((guide, index) => {
                return (
                  <div key={index} className="guide-card-container">
                    <GuideCard key={guide._id} info={guide} />
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

export default GuidesList;