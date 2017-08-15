import React, {Component} from 'react'

class ProfileContainer extends Component {
  render(){
    console.log('this.props',this.props);
    return (
      <div>
        <h1>HELLO THERE</h1>
        <h2>{this.props.user.name}</h2>
      </div>
    )
  }
}

export default ProfileContainer;
