import React, { Component } from 'react';
import GuideService from '../lib/guides-service';


class EditGuide extends Component {
  state = {
    guide: {
      title: '',
      date: '',
      time: '',
      description: '',
      location: '',
      expertise: '',
      duration: '',
    },
    error: '',
    isLoading: true,
  }

  componentDidMount() {
    GuideService.guideDetails(this.props.match.params.id)
      .then((guide) => {
        this.setState({
          guide,
          isLoading: false,
        })
      })
      .catch(error => 
        this.setState({
          error: error.response.data.error,
        })
        )
  }

  handleOnChange = (e) => {
    this.setState({
      guide:
      {
        ...this.state.guide,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { guide } = this.state;
    GuideService.updateGuide(id, guide)
      .then((result) => {
        this.props.history.push(`/guides-list/${id}`)
      })
  }

  render() {
    const { guide: { title, date, time, description, location, expertise, duration } } = this.state;
    if (this.state.error) {
      return (
        <section>
        <div>{this.state.error}</div>
        </section>
      )
    }

    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <section className="create-edit-section">
        <div className="create-edit-form-container">
          <h2>Edit this guide</h2>
          <form onSubmit={this.handleSubmit} className="create-edit-form">
            <input type="text" placeholder="Title" name="title" className="create-edit-input" onChange={this.handleOnChange} value={title} />
            <input type="text" placeholder="Description" name="description" className="create-edit-input desc" onChange={this.handleOnChange} value={description} />
            <input type="text" placeholder="Location" name="location" className="create-edit-input" onChange={this.handleOnChange} value={location} />
            <input type="text" placeholder="Expertise" name="expertise" className="create-edit-input" onChange={this.handleOnChange} value={expertise} />
            <input type="text" placeholder="Date" name="date" className="create-edit-input" onChange={this.handleOnChange} value={date} />
            <input type="text" placeholder="Time" name="time" className="create-edit-input" onChange={this.handleOnChange} value={time} />
            <div className="duration-container">
              <p>Duration</p><input type="time" placeholder="hh" name="duration" className="duration-input" onChange={this.handleOnChange} value={duration} />
            </div>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
    );
  }
}

export default EditGuide;