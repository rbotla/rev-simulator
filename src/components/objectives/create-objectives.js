import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import KeyResultsList from './key-results-list';
import KeyResultForm from './key-result-form';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../services/objectives/objectives-actions';
import * as empActions from '../../services/employees/employees-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderTextField, renderSelectAsync, renderSelectField} from '../utils/form-utils';
import PageHeader from './page-header';

injectTapEventPlugin();

const style = {
		margin: "10px",
		padding: "10px",
	  textAlign: 'left',
	  display: 'inline-block',
};

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

class CreateObjectives extends Component {

  onSubmit = (data) => {
    this.props.actions.saveNewObjective(data);
  }

  handleKeyResultsSubmit = ({keyresult}) => {
    this.props.actions.saveNewKeyResult(this.props.currentObjective._id, keyresult);
  }

	render() {
    const { 
      handleSubmit, 
      pristine, 
      reset, 
      submitting,
      currentObjective, 
    } = this.props;

		return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <PageHeader title="Create new Objective" />
          <div style={style} >
            {currentObjective ? (
              <Grid>
                <Row>
                  <Col md={12}>
                    <h3>Objective: {currentObjective.name}</h3>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <KeyResultForm objective={currentObjective} onSubmit={this.handleKeyResultsSubmit}/>
                  </Col>
                </Row>

                <Row>
                  <Col md={8}>
                    {this.props.currentKeyResults &&
                      <KeyResultsList keyresults={this.props.currentKeyResults}/>
                    }
                  </Col>
                </Row>
              </Grid>
            ) : (
              <Grid>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <Row>
                    <Col md={8}>
                      <Field name="objective" component={renderTextField} label="Enter Objective"/>
                    </Col>

                    <Col md={4}>
                      <RaisedButton label="Save" type="submit"/>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={8}>
                      <Field name="description" component={renderTextField} multiLine={true} label="Description"/>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Field name="owner"
                          component={renderSelectAsync}
                          placeholder="Owner"
                          resultsValueKey="_id"
                          resultsLabelKey="name"
                          callback={this.props.empActions.findEmployeesByName}
                          callbackUrl="employees/filter?name="
                          results={this.props.employee_results}
                      />
                    </Col>

                    <Col md={4}>
                      <Field name="category"
                          component={renderSelectField}
                          placeholder="Category"
                          options={
                            [
                              {label: 'Grow', value: 'Grow'},
                              {label: 'Innovate', value: 'Innovate'},
                              {label: 'Operate', value: 'Operate'},
                              {label: 'Inspire', value: 'Inspire'}
                            ]}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Field name="parent"
                        component={renderSelectAsync}
                        placeholder="Align with another Objective"
                        resultsValueKey="_id"
                        resultsLabelKey="name"
                        callback={this.props.actions.findObjectivesByName}
                        callbackUrl="objectives/filter?name="
                        results={this.props.objective_results}
                      />
                    </Col>

                    <Col md={4}>
                      <Field name="tags"
                          component={renderSelectAsync}
                          placeholder="Tags"
                          creatable={true}
                          multi={true}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Field name="contingency" component={renderTextField} multiLine={true} label="Dependencies / Contingency"/>
                    </Col>
                  </Row>

                </form>
              </Grid>
            )}
  				</div>
        </div>
			</MuiThemeProvider>
    );
	}
}

// Decorate the form component
CreateObjectives = reduxForm({
  form: 'objective',
  validate
})(CreateObjectives);

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { 
      currentObjective: state.objectives.currentObjective,
      currentKeyResults: state.objectives.currentKeyResults
     }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  empActions: bindActionCreators(empActions, dispatch),
});

export default connect (mapStateToProps, mapDispatchToProps) (CreateObjectives);