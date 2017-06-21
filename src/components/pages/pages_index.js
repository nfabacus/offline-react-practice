import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPages } from '../../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class PagesIndex extends Component {
  componentDidMount() {
    this.props.fetchPages();
  }

  renderPages() {
    console.log("this.props.pages: ", this.props.pages);
    return _.map(this.props.pages, page =>{
      console.log("page: ", page);
      return (
        <li className="list-group-item" key={page._id}>
          <Link to={`/${page.url}`}>
            Page URL: {page.url}, Title: {page.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="text-right">
          <Link className="btn btn-primary" to="/pages/new">
            Add a page
          </Link>
        </div>

        <h1>Pages</h1>
        <ul className="list-group">
          {this.renderPages()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("State:", state);
  return { pages: state.pages }
}
export default connect(mapStateToProps, { fetchPages })(PagesIndex);
