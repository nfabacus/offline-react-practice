import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPage } from '../../actions';

class PageShow extends Component {
  componentDidMount() {
    const { url } = this.props.match.params; //this is provided by react router.
    console.log('url: ', url);
    this.props.fetchPage(url);
  }

  renderSubcontents(subcontents) {
    console.log("subcontents: ", subcontents);
    return _.map(subcontents, subcontent => {
      return (
        <li key={subcontent._id}>
          {subcontent.title}: {subcontent.content}
        </li>
      )
    })
  }

  render() {
    const { page } = this.props;

    // const renderSubcontents = ()=>{
    //   return (
    //     <div>Subcontent: ... </div>
    //   )
    // }

    if(!page) {
      return <div>Loading...</div>;
    }
    console.log("page.subcontents in PageShow: ", page.subcontents);

    return (
      <div className="container">
        <h3>{page.title}</h3>
        <p>{page.content}</p>
        Subcontents here...
        <ul>
          { this.renderSubcontents(page.subcontents) }
        </ul>

      </div>
    );
  }
}

function mapStateToProps({ pages }, ownProps) { //{ pages } asks to get just pages off the state. ownProps will be the whole props (this.props) for this component.
  return { page: pages[ownProps.match.params.url] }; // .match.params... is provided by react router.
}

export default connect(mapStateToProps, { fetchPage })(PageShow);
