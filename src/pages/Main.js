import React, { Component } from 'react';
import InfoCard from './InfoCard'
import { Link } from 'react-router-dom'

 class Main extends Component {
  render() {
    return (
      <section className="main">
        <Link to="/guides-list">
        <InfoCard img="">Guides</InfoCard>
        </Link>
        <InfoCard img="">Taxi</InfoCard>
        <InfoCard img="">Public transport</InfoCard>
        <InfoCard img="">Restaurants</InfoCard>
        <InfoCard img="">Museums</InfoCard>
        <InfoCard img="">Accomodation</InfoCard>
        <InfoCard img="">Night life</InfoCard>
        <InfoCard img="">Another</InfoCard>
      </section>
    );
  }
}
 export default Main; 