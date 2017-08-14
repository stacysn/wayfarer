import React, {Component} from 'react';
import CitiesList from './CitiesList.js';
import City from './City.js';

class CitiesContainer extends Component {
  render () {
    return (
      <div className="container">
        <h2>CitiesContainer</h2>
        <div className="row">
          <CitiesList cities={this.props.cities} apiUrl={this.props.apiUrl} />
          <City addNewPost={this.props.addNewPost} city={this.props.selectedCity} />
        </div>
      </div>
    )
  }
}

export default CitiesContainer;
