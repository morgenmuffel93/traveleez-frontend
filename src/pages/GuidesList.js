import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
import GuideCard from './GuideCard';

class GuidesList extends Component {
      state = {
        guides: []
      }
  

    componentDidMount() {
      GuideService.getAllGuides()
        .then((response) => {
          this.setState({
            guides: response
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  
  render() {
    
    return (
      <section className="guide-list">
        {this.state.guides.map((guide) => {
          return <GuideCard key ={guide._id} info = {guide}/>
        })}
      </section>
    );
  }
}

export default GuidesList;