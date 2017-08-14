import React, { Component } from 'react';
import NavContainer from './components/NavContainer';
import GuestContainer from './components/GuestContainer';
import './App.css';
import CitiesContainer from './components/CitiesContainer.js';
import $ from 'jquery-ajax';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : true, // later should be false
      user: {name: 'Chris'}, // dummy, replace later
      cities: [],
      selectedCity: null
    };
  }
  componentDidMount () {
    this.updateCities();
  }
  updateCities() {
    $.ajax({
      method: 'GET',
      url: this.props.apiUrl + '/cities',
      success: cities => {
        this.setState({
          cities: cities,
          selectedCity: cities.length > 0 ? cities[0] : null
        });
      }
    });
  }
  selectCity(cityId) {
    const selectedCity = this.state.cities.reduce((prev, curr) => {
      return prev || ((curr._id === cityId) ? curr : null); // find matching city
    }, null) || (this.state.cities.length > 0 ? this.state.cities[0] : null);
    this.setState({selectedCity: selectedCity});
  }
  addNewPost(cityId, e) {
    e.preventDefault();
    let newPost = {
      title: $(e.target.title).val(),
      text: $(e.target.text).val(),
      user: this.state.user.name
    }
    console.log(newPost);
    $.ajax({
      method: 'POST',
      url: `${this.props.apiUrl}/cities/${cityId}/posts`,
      data: newPost,
      success: this.updateCities.bind(this)
    });
  }
  render() {
    const currentView = this.state.isLoggedIn
      ? <CitiesContainer cities={this.state.cities} selectCity={this.selectCity.bind(this)} selectedCity={this.state.selectedCity} addNewPost={this.addNewPost.bind(this)} apiUrl={this.props.apiUrl} />
      : <GuestContainer/>
      
    return (
      <div className="App">
        <NavContainer isLoggedIn={this.state.isLoggedIn} />
        {currentView}
      </div>
    );
  }
}

export default App;
