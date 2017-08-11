import React, {Component} from 'react';
import CitiesList from './CitiesList.js';
import City from './City.js';

class CitiesContainer extends Component {
  constructor (props) {
    super(props);
    console.log('in constructor, props are', props);
    this.state = {
      cities: this.props.cities,
      selectedCity: null
    }
  }
  componentDidUpdate (prevProps) { // check args for better performance?
    if (this.props === prevProps) return;
    this.setState({selectedCity: this.props.cities.length > 0 ? this.props.cities[0] : null});
  }
  render () {
    console.log('CitiesContainer rendered. selectedCity is', this.state.selectedCity);
    console.log('this.props.cities.length is', this.props.cities.length);
    return (
      <div className="container">
        <h2>CitiesContainer</h2>
        <div className="row">
          <CitiesList updateCities={this.props.updateCities} cities={this.props.cities} apiUrl={this.props.apiUrl} />
          <City city={this.state.selectedCity} />
        </div>
      </div>
    )
  }
}

export default CitiesContainer;
