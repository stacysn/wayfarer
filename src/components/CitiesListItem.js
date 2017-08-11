import React, {Component} from 'react';

class CitiesListItem extends Component {
  render () {
    return (
      <li className="list-group-item">
        {this.props}
      </li>
    )
  }
}

export default CitiesListItem;
