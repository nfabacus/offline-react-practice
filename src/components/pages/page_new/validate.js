export default function validate(values) {
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

  if(values.subcontents) {
    errors.subcontents = values.subcontents.map((subcontent, index) => ({
      title: subcontent.title ? null : `Please enter subcontent[${index + 1}] title`,
      content: subcontent.content ? null : `Please enter subcontent[${index + 1}] content`
    }));
  }

  return errors;
}
