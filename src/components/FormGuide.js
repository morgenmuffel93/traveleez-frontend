import React, { Component } from 'react';

class FormGuide extends Component {
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
    
    handleForm = (event) => {
        event.preventDefault();
        const { title, date, time, description, location, expertise, duration } = this.state
        const data = {title, date, time, description, location, expertise, duration }
        this.props.onSubmit(data);
    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value,
        })
      }
 render() {
   return (
    <form onSubmit={this.handleForm} className="create-edit-form">
    <input type="text" placeholder="Title" name="title" className="create-edit-input" onChange={this.handleChange} value={this.state.title}/>
    <input type="text" placeholder="Description" name="description" className="create-edit-input desc" onChange={this.handleChange} value={this.state.description} />
    <input type="text" placeholder="Location" name="location" className="create-edit-input" onChange={this.handleChange} value={this.state.location} />
    <input type="text" placeholder="Expertise" name="expertise" className="create-edit-input" onChange={this.handleChange} value={this.state.expertise} />
    <input type="text" placeholder="Date" name="date" className="create-edit-input" onChange={this.handleChange} value={this.state.date} />
    <input type="text" placeholder="Time" name="time" className="create-edit-input" onChange={this.handleChange} value={this.state.time} />
    <div className="duration-container">
    <p>Duration</p><input type="time" placeholder="hh" name="duration" className="duration-input" onChange={this.handleChange} value={this.state.duration} />
    </div>
    <button type="submit">Create</button>
  </form>
   );
 }
}

export default FormGuide;