import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PostShow extends Component {
  render () {
    console.log(this.props);
    const post = this.props.post;
    const postId = this.props.post._id
    const cityId = this.props.city._id;


    return (
      <div>
        <h1>{post.title}<small>&nbsp;by {post.user}</small></h1>
        <p>{post.text}</p>
        <Link to={`/cities/${this.props.city._id}`} className="btn btn-primary">Return to {this.props.city.city}</Link>
        <button className="btn btn-default">Edit</button>
        <button onClick={e=>this.props.destroyPost(cityId, postId)} className="btn btn-default">Delete</button>
      </div>
    )
  }
}

export default PostShow;
