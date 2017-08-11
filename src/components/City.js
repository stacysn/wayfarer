import React, {Component} from 'react';

class City extends Component {
  render () {
    const city = this.props.city || {
      city: 'YOLO',
      country: '',
      image: '',
      description: '',
      posts: []
    };
    console.log('in City.js, city ===', city);
    return (
      <div className="col-md-8">
        <h2>City Show</h2>
        <h2>{city.city}</h2>
      </div>
    )
  }
}

export default City;
