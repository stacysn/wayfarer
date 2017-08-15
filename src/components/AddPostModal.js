import React, {Component} from 'react';
import Modal from 'react-bootstrap-modal';

class AddPostModal extends Component{
  constructor(props){
    super(props);
    this.state = {title: '', text:''};
  }
  handleTitleChange(e){
    this.setState({title: e.target.value});
  }
  handleTextChange(e){
    this.setState({text: e.target.value});
  }
  render(){
    return(
      <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">
            Write a post for {this.props.city.city}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={e => {
          e.preventDefault();
          this.props.addNewPost(this.props.city._id, e.target);
          this.props.closeModal();
        }}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Title</label>
              <input name="title" type="text"
                className="form-control"
                id="recipient-name"
                onChange={this.handleTitleChange.bind(this)}/>
            </div>
            <div className="form-group">
              <textarea name="text"
                className="form-control"
                id="message-text"
                onChange={this.handleTextChange.bind(this)}>
              </textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-default" onClick={e=>this.props.closeModal()}>Close</button>
            <button type="submit" className="btn btn-primary">Save changes</button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

export default AddPostModal;
