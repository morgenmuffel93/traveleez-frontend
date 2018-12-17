import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    error: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    auth.signup({ username, password })
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
        });
        this.props.setUser(user)
      })
      .catch( error => {
        this.setState({
          error: error.response.data.error,
        })
      } )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  checkErrors = () => {
    if (this.state.error) {
      return <div className="error">{this.state.error}</div>
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <section className="login-signup-section">
        <div className="login-signup-container">
        {this.checkErrors()}
          <form onSubmit={this.handleFormSubmit} className="login-signup-form">
            <div className="username-container">
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} className="login-signup-input" />
            </div>
            <div className="password-container">
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} className="login-signup-input"/>
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
        <p className="account-change">Already have an account? <br/><Link to="/login">Log in</Link></p>
      </section>
    )
  }
}

export default withAuth(Signup);