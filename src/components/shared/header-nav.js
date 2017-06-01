import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class HeaderNav extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <Link className="navbar-brand" to="/">Brand</Link>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/">Home</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/about">About</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/contact">Contact</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      // <nav className="navbar navbar-toggleable-md navbar-light fixed-top bg-faded">
      //   <div className="navbar-header">
      //     <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      //          <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <Link className="navbar-brand" to="/">Brand</Link>
      //   </div>
      //
      //   <div className="collapse navbar-collapse" id="navbarSupportedContent">
      //     <ul className="navbar-nav mr-auto">
      //       <li className="nav-item" key={1}>
      //         <Link className="nav-link" to="/">Home</Link>
      //       </li>
      //       <li className="nav-item" key={2}>
      //         <Link className="nav-link" to="/about">About</Link>
      //       </li>
      //       <li className="nav-item" key={3}>
      //         <Link className="nav-link" to="/contact">Contact</Link>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
    );
  }

};

export default HeaderNav;
