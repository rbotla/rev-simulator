import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {renderTextField} from '../utils/form-utils';
import { Field, FieldArray, reduxForm } from 'redux-form';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {darkBlack, White} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from 'material-ui/TextField';

const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
   // pickerHeaderColor: '#010144',   
    alternateTextColor: White
  }
});

// Implementation overwritten in the constructor in order to get handle on the props object
let onSubmit = (data) => { } 

class Checkin extends Component {
	constructor(props) {
		super (props);
  	onSubmit = (data) => {
  		props.actions.checkin(data, this.props.empId)
  	}
	}

  componentWillUpdate(props, state) {
    if (props.checkin_submitted_flag) props.submit();
  }

  render() {
		const keyresults = this.props.my_keyresults;
	  const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
	    <MuiThemeProvider muiTheme={muiTheme}>
				<Grid fluid>
					<Row>
						<Col md={12}>
							<form >
								<FieldArray name="keyresults" component={CheckinObjectivesFormItems} list={keyresults}/>
							</form>
						</Col>
					</Row>
				</Grid>
			</MuiThemeProvider>
		)
	}
}

const CheckinObjectivesFormItems = (props) => {
	const keyresults = props.list;
	const { fields, meta: { touched, error, submitFailed } } = props;
	const style = {
	  message: {
	    position: "relative",
	    bottom: "2px",
	    fontSize: "12px",
	    lineHeight: '12px',
	    color: '#F3294D'
	  }
	}
	// keyresults.map ( (x) => { fields.push({kr: x}) });

  {(touched || submitFailed) && error && <span>{error}</span>}
	return (
		<Row>
			<Col md={12}>
				{
					keyresults.map ( (x) => {
						const val = x.keyresults.actual +"";
						return (
							<Row key={x.keyresults._id}>
								<Col md={8}>
									<span>{x.keyresults.quarter} - {x.keyresults.name}</span>
								</Col>
								<Col md={4}>
			            <Field name={x.keyresults._id} placeholder="Enter actual value" value={val}
			            		component={renderTextField}
									/>
									<span style={style.message}>Target: {x.keyresults.target}	{x.keyresults.units.value}</span>
									<br/><br/><br/>
								</Col>
							</Row>
						);
					})
				}
			</Col>
		</Row>
	)
}

// Decorate the form component
Checkin = reduxForm({
  form: 'checkin'
})(Checkin);

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
	return (
		{
		checkin_submitted_flag: state.objectives.checkin_submitted_flag,
    onSubmit: onSubmit
		}
	)
}

export const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (Checkin);
