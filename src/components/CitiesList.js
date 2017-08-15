import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CitiesList extends Component {
  render () {
    const cityComponents = this.props.cities.map(city => {
      return (
        <Link
          to={`/cities/${city._id}`}
          className="list-group-item"
          key={city._id}
        >
          {city.city}
        </Link>
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
