import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { createPage } from '../../actions';

// import { fetchNavLinks } from '../../actions';

class PageNew extends Component {

  renderField(field) {
    // const { meta } = field;  //this will allow us to use just 'meta' instead of 'field.meta'...
    const { input, label, type, textarea, meta: { touched, error, invalid } } = field; // furthermore, we can even pull off touched and error from meta like this. now you can just use touched and error.
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const checkBoxGroup = "form-group row";

    console.log("field: ", field);

    if(type === "checkbox") {
      return (
        <div className={checkBoxGroup}>
          <label className="col-sm-2">{label}</label>
          <div className="col-sm-10">
            <div className="form-check">
              <input type={type} { ...input }/>
            </div>
          </div>
        </div>
      );
    }

    if(type === "textarea") {
      return (
        <div className={className}>
          <label>{label}</label>
          <textarea name={field.content} className='form-control' { ...input }/>
          <div className="text-danger">
            { touched? error: '' }
          </div>
        </div>
      );
    }
    if(type === "radio") {
      return (
        <input type={field.type} {...input }/>
      )
    }

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input type={field.type} className='form-control' { ...input } />
        <div className="text-danger">
          { touched? error: '' }
        </div>
      </div>
    );
  }

  // renderSubcontents() {
  //   // console.log("subcontents: ", subcontents);
  //   //
  //   // _.map(subcontents, subcontent =>{
  //   //   console.log("subcontent: ", subcontent);
  //   const subcontents = [];
  //   for (let i=0; i < this.state.subconCount; i++) {
  //     // subcontents = subcontents.concat(<div className='list-group-item' >
  //     subcontents.push(
  //       <div className='list-group-item' key={i}>
  //       subcontent here.
  //       </div>);
  //   }
  //   console.log("ssubcontents: ", subcontents);
  //   return subcontents;
  //
  // }

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

          <Field type="textarea" label="content" name="content" component={this.renderField} />

          <div>
            <label>NavLink?</label>
            <div>
              <label>
                <Field name="navLink" component={this.renderField} type="radio" value="false" />
                &nbsp; No &nbsp;
              </label>
              <label>
                <Field name="navLink" component={this.renderField} type="radio" value="true" />
                &nbsp; Yes &nbsp;
              </label>
            </div>
          </div>

          <FieldArray name="subcontents" component={subcontents =>
            <ul>
              <li>
                <button type="button" onClick={() => push('subcontents', {})}>Add Subcontent</button>
              </li>
              {subcontents.map((subcontent, subcontentIndex) =>
                <li key={subcontentIndex}>
                  <button
                    type="button"
                    title="Remove Subcontent"
                    onClick={() => subcontents.remove(subcontentIndex)}/>
                  <h4>Subcontent #{subcontentIndex + 1}</h4>
                  <div>
                    <label>Title</label>
                    <Field name={`${subcontent}.title`} component={title =>
                      <div>
                        <input type="text" {...title} placeholder="Title"/>
                        {title.touched && titile.error && <span>{title.error}</span>}
                      </div>
                    }/>
                  </div>
                  <div>
                    <label>Content</label>
                    <Field name={`${subcontent}.content`} component={content =>
                      <div>
                        <input type="text" {...content} placeholder="Content"/>
                        {content.touched && content.error && <span>{content.error}</span>}
                      </div>
                    }/>
                  </div>
                </li>
              )}
            </ul>
          }/>

          <Field type="checkbox" label="publish" name="published" component={this.renderField} />

          <div className="form-group">
            <button type="submit" className="btn btn-primary">Save</button>
            <Link className="btn btn-danger ml-3" to="/pages">Cancel</Link>
          </div>

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

  return errors;
}

export default reduxForm({
  validate,  //This is the same as--> validate: validate,
  form: 'PageNewForm'  //giving a name to the form here.
})(
  connect(null, { createPage })(PageNew)
);
