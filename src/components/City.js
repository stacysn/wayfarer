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
    const postComponents = city.posts.map(post => {
      return (
        <a className="list-group-item">
          <h4 className="list-group-item-heading">{post.user}</h4>
          <p className="list-group-item-text">{post.text}</p>
        </a>
      )
    });
    return (
      <div className="col-md-8">
        <div className="media">
          <div className="media-body">
            <h2>{city.city}</h2>
          </div>
          <div className="media-right">
            <img className="media-object"
              src={city.image}
              alt={city.city}
              style={{
                height: '200px',
                width: '300px'
              }}>
            </img>
          </div>
        </div>
        <div>
          <p>{city.description}</p>
          <div className="list-group">
            {postComponents}
          </div>
        </div>
      </div>
    )
  }
}

export default City;
