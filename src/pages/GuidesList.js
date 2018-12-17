import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
import { Link } from 'react-router-dom'
import GuideCard from './GuideCard';


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
        console.log(error)
        this.setState({
          isLoading: false,
        })
      })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const id  = e.target.attributes.id.value;
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
      <section className="guide-list">
      <Link to="/guides-list/create">Create your own</Link>
        {this.state.guides.map((guide, index) => {
          return (
            <div key={index} className="guide-card-container">
                <Link to={`/guides-list/${guide._id}`}><GuideCard key ={guide._id} info = {guide}/></Link>
                </div>
          )}
        )}
      </section>
    );
  }
}

export default GuidesList;