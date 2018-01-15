import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SmallImg from '../assets/small.jpg';

class Home extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      modal: false
    };
  }

  toggle=()=>{
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    return (
      <div className="container">

        <div className="bigImage jumbotron">
          <h1 className="text-center">Home page</h1>
        </div>
        <p>Above uses a background image in <b>style</b>.</p>
        <br/>

        <div className="d-inline-block mb-3">
          <p>
            This uses an <b>Image Tag</b> in react component:
          </p>
          <img src={SmallImg}/>

        </div>
      </div>
    );
  }
};

export default Home;
