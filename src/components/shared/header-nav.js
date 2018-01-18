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

  renderNavItem() {

    return _.map(this.props.navlinks, navlink=>{

      return (
        <NavItem className="nav-item" key={navlink._id}>
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
            <Nav className="ml-auto bg-white" navbar>
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
  return { navlinks: state.navlinks }
}

export default connect(mapStateToProps, { fetchNavLinks })(HeaderNav);
