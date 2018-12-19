import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    error:""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    if(username.includes('^[a-z A-Z 0-9 @]\\.')){
      return this.setState({
            error: 'You cannot use special characters',
      })} else if(password.length < 6){
              return this.setState({
                    error: 'Password Must be 6 characters or longer',
              })}
          else{

            auth.signup({ username, password })
              .then( (user) => {
                this.setState({
                    username: "",
                    password: "",
                });
                this.props.setUser(user)
              })
              .catch(error => 
                this.setState({
                  error: error.response.data.error,
                })
                )
            }
  }


  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  checkErrors = () => {
    if (this.state.error) {
      return <p id="error">{this.state.error}</p>
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <section className="login-signup-section">
        <h3>Signup</h3>
        <div className="login-signup-container">
        
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
            {this.checkErrors()}
          </form>
        </div>
        <p className="error">{this.state.error}</p>
        <p className="account-change">Already have an account? <br/><Link to="/login" className="link-green">Log in</Link></p>
      </section>
    )
  }
}

export default withAuth(Signup);