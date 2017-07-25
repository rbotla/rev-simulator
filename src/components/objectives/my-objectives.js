import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LinearProgress from 'material-ui/LinearProgress';
import MyObjectivesHeader from './my-objectives-header';
import Objectiveslist from './objectives-list';
import * as actions from '../../services/objectives/objectives-actions';
import * as empActions from '../../services/employees/employees-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

const childContextTypes =
{
    muiTheme: React.PropTypes.object
}

const getChildContext = () =>
{
  return { muiTheme: getMuiTheme() } 
}

const styles = {
	progress: {
		fontSize: "24px",
    display: "block",
    marginTop: "-.25em"
	}
};

class MyObjectives extends Component {
	constructor (props) {
		super(props);
    props.empActions.getEmpProfile(this.props.current_emp_id)
    props.actions.getMyObjectives(this.props.current_emp_id)
	}

	render () {
		let empProgress = 0;
		if (this.props.my_objectives) {
			const size = this.props.my_objectives.length;
			empProgress = size == 0 ? 0 : this.props.my_objectives.map( x => x.progress ).reduce( (x1, x2) => x1 + x2, 0) / size;
		}

		if (!this.props.current_emp_obj) return <div>loading...</div>

console.log('>>>>>>>>>', this.props.current_emp_obj);
		return(
			<div>
				<MyObjectivesHeader 
					name={this.props.current_emp_obj.name}
					title={this.props.current_emp_obj.title || this.props.current_emp_obj.email}
					group="ETPM"
					avatar={this.props.current_emp_obj.url}
				/>
				<div style={styles.profilecontainer}>
					<Grid fluid>
						<Row>
							<Col md={2}/>
							<Col md={7}>
								<br/>
								<span style={styles.progress}> {Math.round(empProgress)}% </span>
				      	<MuiThemeProvider muiTheme={getMuiTheme()}>
	      					<LinearProgress mode="determinate" color="#F3294D" value={empProgress} />
								</MuiThemeProvider>
							</Col>
						</Row>
						<Row>
							<Col md={2}/>
							<Col md={7}>
								<br/>
								<Objectiveslist title="My Objectives" objectives={this.props.my_objectives}/>
							</Col>
						</Row>
					</Grid>
				</div>
			</div>
		);
	}
}

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
  	{
  		my_objectives: state.objectives.my_objectives,
    	current_emp_id: state.employees.current_emp_id,
    	current_emp_obj: state.employees.current_emp_obj,    	
  	}
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
	empActions: bindActionCreators(empActions, dispatch),
});

export default connect (mapStateToProps, mapDispatchToProps) (MyObjectives);
