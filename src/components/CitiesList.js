import React, {Component} from 'react';

class CitiesList extends Component {
  render () {
    const cityComponents = this.props.cities.map(city => {
      return (
        <button 
          className="list-group-item"
          key={city._id}
          onClick={e => this.props.selectCity(city._id)} >
          {city.city}
        </button>
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
