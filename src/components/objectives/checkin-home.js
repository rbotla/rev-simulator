import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, White, darkBlack} from 'material-ui/styles/colors';
import Checkin from './checkin';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: '#F3294D',
    alternateTextColor: White
  }
});

class CheckinHome extends Component {

  handleClose = () => {
    this.props.actions.onCheckinCancelClicked();
  };

	constructor (props) {
		super (props);
		this.eid = props.eid || this.props.current_emp_id;
		this.props.actions.fetchCurrentEmployeeKeyResults(this.eid)
	}

	render () {
    const actionButtons = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.actions.onCheckinCancelClicked}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.actions.onCheckinSubmitClicked}
      />,
    ];

		return(
	    <MuiThemeProvider muiTheme={muiTheme}>
	      <div>
	        <Dialog
	          title="Checkin My Key Results"
	          actions={actionButtons}
	          modal={false}
	          open={this.props.checkin_open_flag}
	          onRequestClose={this.handleClose}
	          autoScrollBodyContent={true}
	        >
        	<div>
	        	<br/>
						<Checkin my_keyresults={this.props.keyresults_fetch_results} empId={this.props.current_emp_id}/>
					</div>
	        </Dialog>
	      </div>
	    </MuiThemeProvider>
		)
	}
}

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
  	{
      keyresults_fetch_results: state.objectives.keyresults_fetch_results,
      checkin_open_flag: state.objectives.checkin_open_flag,
      checkin_close_flag: state.objectives.checkin_close_flag,
      current_emp_id: state.employees.current_emp_id
    }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (CheckinHome);