import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PageNew extends Component {

  render(){
    return (
      <div className="container">
        <div className="text-right">
          <Link to="/pages">
            Back to Pages List
          </Link>
        </div>
        <h1>New Page</h1>
      </div>
    );
  }
}

export default connect(null,{})(PageNew);
