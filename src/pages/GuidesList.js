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
    console.log(e.target.attributes.id.value)
    const id  = e.target.attributes.id.value;
    GuideService.deleteGuide(id)
    .then((result) => {
      console.log('deleted')
    })
  }
   


  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div>isLoading</div>
    }
    return (
      <section className="guide-list">
        {this.state.guides.map((guide, index) => {
          return <div key={index} ><GuideCard key ={guide._id} info = {guide}> 
                
                </GuideCard>
                <Link to={`/guides-list/edit/${guide._id}`}>Edit</Link>
                <form onSubmit={this.onSubmit} id={guide._id}>

                <button type="submit">Delete</button>

                </form>
                </div>
        })}
      </section>
    );
  }
}

export default GuidesList;