import React, { Component } from 'react';
import ProfileService from '../lib/profile-service'
import GuideService from '../lib/guides-service'
import { Link } from 'react-router-dom'
import GuideCard from './GuideCard';


class Profile extends Component {
  state = {
    user: {},
    isLoading: true,
    isEditing: false,
    isInInfo: true,
    isInGuides: false,
    info: {
      expertise: '',
      phone: '',
      email: '',
    }
  }

  componentDidMount() {
    ProfileService.getUserInfo()
      .then((response) => {
        const user = response.user
        this.setState({
          user,
          isLoading: false,
        })
      })

      .catch((error) => {
        this.setState({
          isLoading: false,
        })
      })
  }

  changeToEdit = () => {
    this.setState({
      isEditing: true,
    })
  }

  handleEditProfile = (e) => {
    e.preventDefault();
    this.setState({
      isEditing: false,
    })

    const { user } = this.state;

    ProfileService.updateProfile(user)
      .then((result) => {
        this.props.history.push(`/my`)
      })
  }

  handleWriting = (e) => {
    this.setState({
      user:
      {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }

  handleEditing = () => {
    if (this.state.isLoading) {
      return <div>Loading...</div>
    }
    if (this.state.isEditing) {
      const { user: { email, phone, expertise } } = this.state;

      return (
        <form onSubmit={this.handleEditProfile}>
          <div className="my-info">
            <span className="bold-span">Your expertise:</span>
            <input type="text" value={expertise} onChange={this.handleWriting} name='expertise' />
          </div>
          <div className="my-info">
            <span className="bold-span">E-mail:</span>
            <input type="text" value={email} onChange={this.handleWriting} name='email' />
          </div>
          <div className="my-info">
            <span className="bold-span">Phone:</span>
            <input type="text" value={phone} onChange={this.handleWriting} name='phone' />
          </div>
          <button type="submit" className="edit-profile-btn">Submit</button>
        </form>
      )
    } else {
      return (
        <div>
          <div className="my-info">
            <span className="bold-span">Your expertise:</span>
            <p className="info-text">{this.state.user.expertise}</p>
          </div>
          <div className="my-info">
            <span className="bold-span">E-mail:</span>
            <p className="info-text">{this.state.user.email}</p>
          </div>
          <div>
            <span className="bold-span">Phone:</span>
            <p className="info-text">{this.state.user.phone}</p>
          </div>
        </div>
      )
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const id = e.target.attributes.id.value;
    GuideService.deleteGuide(id)
      .then((result) => {
        const guides = this.state.user.guides;
        guides.splice(guides.findIndex(v => v._id === result._id), 1)
        this.setState({
          guides,
        })
      })
  }

  showInfoOrGuides = () => {
    if (this.state.isInInfo && this.state.isEditing) {
      const { user: { email, phone, expertise } } = this.state;

      return (
        <form onSubmit={this.handleEditProfile}>
          <div className="my-info">
            <span className="bold-span">Your expertise:</span>
            <input type="text" value={expertise} onChange={this.handleWriting} name='expertise' />
          </div>
          <div className="my-info">
            <span className="bold-span">E-mail:</span>
            <input type="text" value={email} onChange={this.handleWriting} name='email' />
          </div>
          <div className="my-info">
            <span className="bold-span">Phone:</span>
            <input type="text" value={phone} onChange={this.handleWriting} name='phone' />
          </div>
          <button type="submit" className="edit-profile-btn">Submit</button>
        </form>
      )
    } else if (this.state.isInInfo) {
      return (
        <div>
          <div className="edit-info-container">
          <button onClick={this.changeToEdit} className="edit-profile-info">&#9998;</button>
          </div>
        <div className="my-info">
          <span className="bold-span">Your expertise:</span>
          <p className="info-text">{this.state.user.expertise}</p>
        </div>
        <div className="my-info">
          <span className="bold-span">E-mail:</span>
          <p className="info-text">{this.state.user.email}</p>
        </div>
        <div>
          <span className="bold-span">Phone:</span>
          <p className="info-text">{this.state.user.phone}</p>
        </div>
      </div>
      )
    } else if (this.state.isInGuides) {
      return (
        <div className="my-guides">
        <Link to="/guides-list/create" className="btn edit-profile-info">Create</Link>
        <div class="guide-list-container">
          {this.state.user.guides.map((guide, index) => {
            return <div key={index} className="guide-card-container">
              <GuideCard key={guide._id} info={guide} />
              <div className="delete-edit-container">
                <Link to={`/guides-list/edit/${guide._id}`} className="btn">&#9998;</Link>
                <form onSubmit={this.onSubmit} id={guide._id}>
                  <button type="submit">&#10006;</button>
                </form>
              </div>
            </div>
          })}
        </div>
      </div>
      )
    }
  }

  showInfo = () => {
   
    this.setState({
      isInInfo: true,
      isInGuides: false,
    })
  }

  showGuides = () => {
    this.setState({
      isInInfo: false,
      isInGuides: true,
    })
  }

  displayButtons = () => {
    if (this.state.isInInfo) {
      return (
        <div class="profile-options">
        <div onClick={this.showInfo} className="selected-profile option-profile">Info</div>
        <div onClick={this.showGuides} className="option-profile">Guides [{this.state.user.guides.length}]</div>
      </div>
      )
    } else if (this.state.isInGuides) {
      return (
        <div class="profile-options">
        <div onClick={this.showInfo} className="option-profile">Info</div>
        <div onClick={this.showGuides} className="selected-profile option-profile">Guides [{this.state.user.guides.length}]</div>
      </div>
      )
    }
  }

  render() {

    if (this.state.isLoading) {
      return <div>Loading...</div>
    }

    return (
      <section className="my-profile">
        <h2>Your profile</h2>
        {this.displayButtons()}
        {this.showInfoOrGuides()}
      </section>
    );
  }
}


export default Profile;