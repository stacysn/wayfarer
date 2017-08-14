import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavContainer from './components/NavContainer';
import GuestContainer from './components/GuestContainer';
import CitiesContainer from './components/CitiesContainer.js';
import './App.css';
import $ from 'jquery-ajax';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : true, // later should be false
      user: {name: 'Chris'}, // dummy, replace later
      cities: [],
      selectedCity: { // to prevent code breakage, create dummy properties
        city: 'default cityname',
        country: 'default country',
        image: '',
        description: 'default city description',
        posts: []
      }
    };
  }
  componentDidMount () {
    this.updateCities();  // after App first mounts, populate cities from db
  }
  updateCities() {
    $.ajax({
      method: 'GET',
      url: this.props.apiUrl + '/cities',
      success: cities => {
        let selectedCity = this.state.selectedCity; // default preserve existing selection
        if ((selectedCity.city === 'default cityname') && cities.length > 0) {
            // if we're at default & we read new cities...
          selectedCity = cities[0]; // ...then select 1st city we GET'd from db
        }
        this.setState({
          cities: cities,
          selectedCity: selectedCity
        });
      }
    });
  }
  selectCity(cityId) {  // change which city is currently being viewed
    const selectedCity = this.state.cities.reduce((prev, curr) => {
      return prev || ((curr._id === cityId) ? curr : null); // find matching city
    }, null) || (this.state.cities.length > 0 ? this.state.cities[0] : null);
    this.setState({selectedCity: selectedCity});
  }
  addNewPost(cityId, e) { // create a new post
    e.preventDefault();
    let newPost = {
      title: $(e.target.title).val(),
      text: $(e.target.text).val(),
      user: this.state.user.name
    }
    $.ajax({
      method: 'POST',
      url: `${this.props.apiUrl}/cities/${cityId}/posts`,
      data: newPost,
      success: this.updateCities.bind(this)
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" render={(props) => (
            <NavContainer isLoggedIn={this.state.isLoggedIn} />
          )} />
        <Route path="/guest" render={(props) => <GuestContainer />} />
        <Route path="/cities/:cityId" render={(props) => (
          <CitiesContainer
            cities={this.state.cities}
            selectCity={this.selectCity.bind(this)}
            selectedCity={this.state.selectedCity}
            addNewPost={this.addNewPost.bind(this)}
            apiUrl={this.props.apiUrl}
          />)}
        />
        </div>
    </BrowserRouter>
    );
  }
}

export default App;
