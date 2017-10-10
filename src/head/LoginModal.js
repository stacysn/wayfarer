import React, {Component} from 'react';
import Modal from 'react-bootstrap-modal';

class LoginModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: ''
    };
  }
  render(){
    return(
      <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">
            Log In
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={e => {
          e.preventDefault();
          console.log('form submitted');
          this.props.login(this.state.name, this.state.password);
          this.setState({name: '', password: ''});
          this.props.closeModal();
        }}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Username
                <input name="name" type="text"
                  className="form-control"
                  onChange={(e)=>this.setState({name:e.target.value})}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="control-label">Password
                <input name="password" type="password"
                  className="form-control"
                  onChange={e=>this.setState({password:e.target.value})}
                />
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary">Log In</button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

export default LoginModal;
