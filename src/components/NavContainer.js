import React, {Component} from 'react';
import logo from '../logo.svg';
import NavGuestInterface from './NavGuestInterface';
import NavUserInterface from './NavUserInterface';

class NavContainer extends Component {
  constructor (props) {
    super(props);
    // this.state = {}; //?
  }
  render () {
    const currentInterface = this.props.isLoggedIn ? <NavUserInterface /> : <NavGuestInterface />;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            {
              //<img src={logo} alt="Wayfarer" />
            }
            <a className="navbar-brand">Wayfarer</a>
          </div>
          <div>
            {currentInterface}
          </div>
        </div>
      </nav>
    )
  }
};

export default NavContainer;
