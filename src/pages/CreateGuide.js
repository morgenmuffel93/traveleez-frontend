import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
class CreateGuide extends Component {

  state = {
    searchValue: '',
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
          console.log("hello" + response)
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
    return (
      <section className="create-edit-section">
        <div className="create-edit-form-container">
        <h2>Create guide</h2>
          <form action="/guides-list/" method="POST" className="create-edit-form">
            <input type="text" placeholder="Title" name="title" className="create-edit-input" onChange={this.handleChange} value={this.state.title}/>
            <input type="text" placeholder="Description" name="description" className="create-edit-input desc" onChange={this.handleChange} value={this.state.description} />
            <input type="text" placeholder="Location" name="location" className="create-edit-input" onChange={this.handleChange} value={this.state.location} />
            <input type="text" placeholder="Expertise" name="expertise" className="create-edit-input" onChange={this.handleChange} value={this.state.expertise} />
            <div className="duration-container">
              <p>Duration:</p>
            <input type="text" placeholder="Date" name="date" className="create-edit-input" onChange={this.handleChange} value={this.state.date} />
            <input type="text" placeholder="Time" name="time" className="create-edit-input" onChange={this.handleChange} value={this.state.time} />
              <input type="time" placeholder="hh" name="duration" className="duration-input" onChange={this.handleChange} value={this.state.duration} />
            </div>
            <button type="submit" onSubmit={this.onSubmit}>Create</button>
          </form>
        </div>
      </section>
    );
  }
}

export default CreateGuide;