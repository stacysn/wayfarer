import React, {Component} from 'react';
import CitiesListItem from './CitiesListItem.js';

class CitiesList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cities: []
    };
  }
  componentDidMount () {
    this.setState({cities: this.props.cities});
  }
  render () {
    const cityComponents = this.props.cities.map(city => {
      return (
        <a className="list-group-item" key={city._id} >
          {city.city}
        </a>
      );
    });
    return (
      <div className="col-md-4">
        <h2>CitiesList</h2>
        <div className="listgroup">
          {cityComponents}
        </div>
      </div>
    )
  }
}

export default CitiesList;
