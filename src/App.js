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
      cities: [],
      selectedCity: null
    };
  }
  componentDidMount () {
    const endpoint = this.props.apiUrl + '/cities';
    $.ajax({
      method: 'GET',
      url: endpoint,
      success: this.updateCities.bind(this)
    })
  }
  updateCities(cities) {
    this.setState({
      cities: cities,
      selectedCity: cities.length > 0 ? cities[0] : null
    });
  }
  render() {
    const currentView = this.state.isLoggedIn
      ? <CitiesContainer cities={this.state.cities} selectedCity={this.state.selectedCity} updateCities={this.updateCities.bind(this)} apiUrl={this.props.apiUrl} />
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
