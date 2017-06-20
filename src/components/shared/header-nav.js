import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNavLinks } from '../../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class HeaderNav extends Component {
  componentDidMount() {
    this.props.fetchNavLinks();
  }
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
  // console.log("State in HeaderNav: ", state);
  renderNavItem() {
    console.log("this.props.navlinks in Nav: ", this.props.navlinks);
    return _.map(this.props.navlinks, navlink=>{
      console.log("navlink in Nav: ", navlink);
      return (
        <NavItem key={navlink._id}>
          <Link className="nav-link" to={`/${navlink.url}`}>{navlink.title}</Link>
        </NavItem>
      );
    })

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
                <Link className="nav-link" to="/about">About</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/contact">Contact</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/pages">Admin</Link>
              </NavItem>
              { this.renderNavItem() }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

function mapStateToProps(state) {
  console.log("State in nav:", state);
  return { navlinks: state.navlinks }
}

export default connect(mapStateToProps, { fetchNavLinks })(HeaderNav);
