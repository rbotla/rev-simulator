import React from 'react';
import CreateAgreementVisual from '../../create-agreement-visual';

class CreateAgreement extends Component {
	constructor(props) {
		super(props);
		this.state = {
      // query: '',
      // filteredData: props.data,
      // selectedIndex: undefined,
      // filteredSelectedData: []
    }
    //this.doSearch = this.doSearch.bind(this);
	}

  render() {
    return (
      <CreateAgreementVisual />
    )
  }
	
}

export default CreateAgreement;