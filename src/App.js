import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './styles/style.css';

import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './providers/AuthProvider';
import Home from './pages/Home';
import Main from './pages/Main'
import Footer from './components/Footer'
import MyProfile from './pages/MyProfile'
import Scan from './pages/Scan'
import Speech from './pages/Speech'
import GuidesList from './pages/GuidesList'
import CreateGuide from './pages/CreateGuide';
import EditGuide from './pages/EditGuide';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />
          <Switch>
              <PrivateRoute exact path="/" component={Main} />
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/scan" component={Scan} />
              <PrivateRoute path="/speech" component={Speech} />
              <PrivateRoute path="/my" component={MyProfile} />
              <PrivateRoute exact path="/guides-list/create" component={CreateGuide} />
              <PrivateRoute exact path="/guides-list/edit/:id" component={EditGuide} />
              <PrivateRoute path="/guides-list" component={GuidesList} />
          </Switch>
          <Footer/>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
