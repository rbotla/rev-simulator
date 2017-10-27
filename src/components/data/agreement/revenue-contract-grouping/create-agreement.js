import React from 'react';

class CreateAgreement extends Component {
	constructor(props) {
		super(props);
		this.state = {
      query: '',
      filteredData: props.data,
      selectedIndex: undefined,
      filteredSelectedData: []
    }
    this.doSearch = this.doSearch.bind(this);
	}
	
}

export default CreateAgreement;