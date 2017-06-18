import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchPages } from '../../actions';

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
          Page URL: {page.url}, Title: {page.title}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Pages</h1>
        <ul className="list-group">
          {this.renderPages()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { pages: state.pages }
}
export default connect(mapStateToProps, { fetchPages })(PagesIndex);
