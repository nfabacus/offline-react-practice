import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createPage } from '../../actions';
// import { fetchNavLinks } from '../../actions';

class PageNew extends Component {

  renderField(field) {
    // const { meta } = field;  //this will allow us to use just 'meta' instead of 'field.meta'...
    const { meta: { touched, error } } = field; // furthermore, we can even pull off touched and error from meta like this. now you can just use touched and error.
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className='form-control' { ...field.input } />
        <div className="text-danger">
          { touched? error: '' }
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // console.log('submitted values: ', values);
    // Call createPage action and pass input values to it.
    // Then, add callback function so that, after a page is created, we can redirect to the pages page.
    this.props.createPage(values, ()=>{
      // this.props.fetchNavLinks();
      this.props.history.push('/pages');
    });
  }

  render(){
    const { handleSubmit } = this.props; //handleSubmit is provided by redux form. Pulling it off from this.props.
    return (
      <div className="container">
        <div className="text-right">
          <Link to="/pages">
            Back to Pages List
          </Link>
        </div>
        <h1>New Page</h1>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="url" name="url" component={this.renderField} />
          <Field label="title" name="title" component={this.renderField} />
          <Field label="content" name="content" component={this.renderField} />
          <Field label="navLink" name="navLink" component={this.renderField} />
          <Field label="published" name="published" component={this.renderField} />

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link className="btn btn-danger ml-3" to="/pages">Cancel</Link>
        </form>

      </div>
    );
  }
}

function validate(values) {
  // values will be { title: 'whatever you input in the form', categories: 'whatever you input', content: 'whatever you input'}
  const errors = {};

  // Validate the inputs from 'values'
  if(!values.url) {
    errors.url ="Please enter a url.";
  }
  if(!values.title) {
    errors.title ="Please enter a title.";
  }
  if(!values.content) {
    errors.content ="Please enter a content.";
  }
  if(!values.navLink) {
    errors.navLink ="Please confirm whether it is a navLink (true or false).";
  }
  if(!values.published) {
    errors.published ="Please confirmed whether you want to publish it (true or false).";
  }

  return errors;
}

export default reduxForm({
  validate,  //This is the same as--> validate: validate,
  form: 'PageNewForm'  //giving a name to the form here.
})(
  connect(null, { createPage })(PageNew)
);
