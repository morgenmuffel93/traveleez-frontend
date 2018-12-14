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
    const { guide: {title, date, time, description, location, expertise, duration} } = this.state;

    // if (this.state.isLoading) {
    //   return (
    //     <div>Loading...</div>
    //   )
    // }

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="create-edit-form">
          <input type="text" value={title} name='title' onChange={this.handleOnChange} className="create-edit-input" />
          <input type="text" value={date} name='date' onChange={this.handleOnChange} className="create-edit-input" />
          <input type="text" value={time} name='time' onChange={this.handleOnChange} className="create-edit-input" />
          <input type="text" value={description} name='description' onChange={this.handleOnChange} className="create-edit-input" />
          <input type="text" value={location} name='location' onChange={this.handleOnChange} className="create-edit-input" />
          <input type="text" value={expertise} name='expertise' onChange={this.handleOnChange} className="create-edit-input" />
          <input type="text" value={duration} name='duration' onChange={this.handleOnChange} className="create-edit-input" />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default EditGuide;