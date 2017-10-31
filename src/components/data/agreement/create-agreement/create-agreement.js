import React, {Component} from 'react';
import Banner from '../banner';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../../../services/data/data-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderTextField, renderSelectAsync, renderSelectField} from '../../../utils/form-utils';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#F3294D",
    accent1Color: "#F42A4D",
    pickerHeaderColor: "#8400D9",
    alternateTextColor: Colors.White
  },
}); 

const validate = values => {
  const errors = {}
  const requiredFields = [ 'objective', 'owner', 'category', 'quarter' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors;
}

class CreateAgreement extends Component {
	constructor (props) {
		super(props);
	}

	render () {

	// id: "2345", 
	// customerName: "ESIS, Inc.", 
	// accountId: "0016000000rEei5AAC", 
	// documentTitle: "Emdeon Claims Payment and Communication Services Schedule", 
	// agreementType: "Base Agreement", 
	// agreementName: "ACE INA Holdings Inc.Payer.CID 153362.pdf", 
	// parentAgreementId: "", 
	// startDate: "2014-04-10", 
	// endDate: "2018-04-09", 
	// contractTerm: 36, 
	// autoRenew: "Yes", 
	// noticePeriod: 45, 
	// contractRenewalTerm: 12, 
	// contractRenewalLimit: 999

		return (
		  <MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<br />
					<Banner title={'Create A New Agreement'}/>
	        <form>
	          <Field name="agreement_name" component={renderTextField} label="Enter Agreement Name"/>
	        </form>
				</div>
			</MuiThemeProvider>
		)
	}
}


// Decorate the form component
CreateAgreement = reduxForm({
  form: 'agreement',
  validate
})(CreateAgreement);

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { 
      // currentAgreement: state.objectives.currentAgreement
    }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (CreateAgreement);