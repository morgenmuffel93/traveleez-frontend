import React, { Component } from 'react';
import GuideCard from './GuideCard';

class GuidesList extends Component {
  render() {
    return (
      <section className="guide-list">
        <GuideCard/>
        <GuideCard/>
        <GuideCard/>
        <GuideCard/>
      </section>
    );
  }
}

export default GuidesList;