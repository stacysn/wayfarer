import React, {Component} from 'react';
import AddPostModal from './AddPostModal.js'

class City extends Component {
  render () {
    console.log(this.props.city);
    const postComponents = this.props.city.posts.map(post => (
      <button type="button" className="list-group-item" key={post._id}>
        <h4 className="list-group-item-heading">{post.user}</h4>
        <p className="list-group-item-text">{post.title}</p>
      </button>
    ));
    return (
      <div>
        <div className="col-md-8">
          <div className="media">
            <div className="media-body">
              <h2>{this.props.city.city}</h2>
            </div>
            <div className="media-right">
              <img className="media-object"
                src={__dirname + this.props.city.image}
                alt={this.props.city.city}
                style={{
                  height: '200px',
                  width: '300px'
                }}>
              </img>
            </div>
          </div>
          <div>
            <p>{this.props.city.description}</p>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                data-toggle="modal"
                data-target="#add-post"
              >
                New Post
              </button>
            <div className="list-group">
              {postComponents}
            </div>
          </div>
        </div>
        <AddPostModal addNewPost={this.props.addNewPost} city={this.props.city} />
      </div>
    )
  }
}

export default City;
