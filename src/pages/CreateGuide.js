import React, { Component } from 'react';
import GuideService from '../lib/guides-service'
import FormGuide from '../components/FormGuide'
import { Link } from 'react-router-dom'

class CreateGuide extends Component {

  state = {
    title: '',
    date: '',
    time: '',
    description: '',
    location: '',
    expertise: '',
    duration: '',
    guideWasCreated: false,
  }

  onSubmit = (data) => {
    GuideService.createGuide(data)
      .then(() => {
        this.setState({
          guideWasCreated: true,
        })
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
    if (this.state.guideWasCreated) {
      return <section>
        <div>Cool guide!</div>
        <div>You can <Link to="/guides-list/create">create a new one</Link> or <Link to="/guides-list">see a list with them all</Link></div>
      </section>
    }

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