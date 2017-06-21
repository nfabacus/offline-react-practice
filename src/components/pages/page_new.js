import React, { Component } from 'react';
import { connect } from 'react-redux';

class PageNew extends Component {
  componentDidMount() {
    console.log("In pageNew component!");
  }

  render(){
    return (
      <div>
        <h1>New Page</h1>
      </div>
    );
  }
}

export default connect(null,{})(PageNew);
