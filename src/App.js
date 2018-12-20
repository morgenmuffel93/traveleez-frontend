import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
import './styles/style.css';

import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './providers/AuthProvider';
import Main from './pages/Main'
import Footer from './components/Footer'
import MyProfile from './pages/MyProfile'
import Scan from './pages/Scan'
import Speech from './pages/Speech'
import HomeSick from './pages/HomeSick'
import GuidesList from './pages/GuidesList'
import CreateGuide from './pages/CreateGuide';
import EditGuide from './pages/EditGuide';
import GuideDetails from './pages/GuideDetails';
import UserProfile from './pages/UserProfile';
import Transport from './pages/Transport';

import { LocationsProvider } from "./providers/LocationsProvider";

class App extends Component {

  state = {
    locations: [],
    searchValue: '',
  }

  updateLocation = (location) => {
    return this.setState({
      searchValue: location,
    })
  }

  render() {

    return (
      <LocationsProvider value={this.state.searchValue}>
      <AuthProvider>
            <Navbar onUpdate={this.updateLocation} />
            <Switch>
                <PrivateRoute exact path="/" component={Main} />
                <AnonRoute exact path="/signup" component={Signup} />
                <AnonRoute exact path="/login" component={Login} />
                <PrivateRoute exact path="/scan" component={Scan} />
                <PrivateRoute exact path="/speech" component={Speech} />
                <PrivateRoute exact path="/homesick" component={HomeSick} />
                <PrivateRoute exact path="/transport" component={Transport} />
                <PrivateRoute exact path="/my" component={MyProfile} />
                <PrivateRoute exact path="/profile/:id" component={UserProfile} />
                <PrivateRoute exact path="/guides-list/create" component={CreateGuide} />
                <PrivateRoute exact path="/guides-list/edit/:id" component={EditGuide} />
                <PrivateRoute exact path="/guides-list/:id" component={GuideDetails} />
                <PrivateRoute exact path="/guides-list" component={GuidesList} />
                <PrivateRoute exact path="/transport" component={Transport} />
            </Switch>
            <Footer/>
        </AuthProvider>
      </LocationsProvider>
    )
  }
}

export default App;
