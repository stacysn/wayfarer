import React, { Component } from 'react';
import NavContainer from './components/NavContainer';
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
      success: (cities) => this.setState({cities: cities})
    })
  }
  render() {
    return (
      <div className="App">
        <NavContainer isLoggedIn={this.state.isLoggedIn} />
        <CitiesContainer cities={this.state.cities} apiUrl={this.props.apiUrl} />
      </div>
    );
  }
}

export default App;
