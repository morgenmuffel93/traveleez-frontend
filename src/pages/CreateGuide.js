import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
import FormGuide from '../components/FormGuide'
class CreateGuide extends Component {

  state = {
    title: '',
    date: '',
    time: '',
    description: '',
    location: '',
    expertise: '',
    duration: '',
  }
 
  onSubmit = (data) => {


    GuideService.createGuide(data)
      .then((response) => {
        console.log("hellooooo, its me", response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    console.log(this.state);
    return (
      <section className="create-edit-section">
        <div className="create-edit-form-container">
        <h2>Create guide</h2>
          <FormGuide onSubmit={this.onSubmit} />
          
        </div>
      </section>
    );
  }
}

export default CreateGuide;