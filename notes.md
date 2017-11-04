- pages
 - renderForm.js // renders the root form
 - renderField.js // renders a field
 - renderSubcontent.js // renders a subcontent
 - validate.js // hold the validation method

 - actions
  - fetching data per component
  - fetching data per page (+1)
    - pages // act as container
      - cache // if the data already exists, dont fetch again
    - component // act as ui
      - data // get data through props
      - actions // get actions through props


// container page
class Page extends Component {
  componentWillMount() {
    if (this.props.userInfo === null) {
      this.props.fetchUserInfo();
    }
  }

  render() {
    return (
      <h1>Page title</h1>
      <UserInfo data={this.props.userInfo} onUpdate={this.props.updateUserInfo}
    );
  }
}


// default state
state = {
  userInfo: null
}

// actions
function fetchUserInfo() {
  // fetch the info
}

function updateUserInfo() {
  // update user info
  // on success
    // get updated info
    // just put them in the store

    OR

    // get just success message
    // need to re-fetch user info
    // call fetchUserInfo action: fetchUserInfo()
}


//How to work with scope without binding
handleChange = e => {
let newSearches = this.props.searches.slice().filter(item => {
   return   item.descr.search(e.target.value) !== -1
});

  this.setState({filteredSearches: newSearches})
}

render() {
  // const handleChange = e => {
  // let newSearches = this.props.searches.slice().filter(item => {
  //    return   item.descr.search(e.target.value) !== -1
  //   })
  //
  //   this.setState({filteredSearches: newSearches})
  // }


// Local state does not update by itself unlike props.
so, use componentWillReceiveProps if you want to manipulate the data received from props.
When component receive props, then set them to state in componentWillReceiveProps as below:

componentWillReceiveProps(nextProps) {
  console.log("nextProps: ", nextProps)
  if(nextProps.searches !== this.props.searches) {
    this.setState({
      filteredSearches: nextProps.searches
    })
  }
}
