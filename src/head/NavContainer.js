import React, {Component} from 'react';
import logo from '../logo.svg';
import LoginModal from './LoginModal';
import {Link} from 'react-router-dom'

class NavContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }; //?
  }
  render () {
    let currentInterface;
    if (this.props.isLoggedIn) {
      currentInterface = (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to={"/profile"}>{this.props.user.name}</Link></li>
          <li><a href="#" onClick={this.props.logout}>Get Out</a></li>
        </ul>
      )
    } else {
      currentInterface = (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#" onClick={()=>this.setState({modalIsOpen:true})}>Log In</a></li>
          <li><a>Sign Up</a></li>
        </ul>
      )
    }
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to={"/"} className="navbar-brand">Wayfarer</Link>
            </div>
            <div>
              {currentInterface}
            </div>
          </div>
        </nav>
        <LoginModal
          login={this.props.login}
          closeModal={()=>this.setState({modalIsOpen:false})}
          isOpen={this.state.modalIsOpen} />
      </div>
    )
  }
};

export default NavContainer;
