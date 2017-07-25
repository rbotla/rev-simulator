import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import * as empActions from '../../services/employees/employees-actions';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import AutoCompleteAsync from '../utils/autocomplete-async';
import {renderTextField, renderSelectAsync, renderSelectField} from '../utils/form-utils';

const validate = values => {
  const errors = {}
  const requiredFields = [ 'keyresult', 'owner', 'quarter', 'target', 'units' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  if (values.target && !/^\d+$/i.test(values.target)) {
    errors.target = 'Please enter a numeric value.'
  }
  return errors
}

let PoB = props => {
  const { objective, handleSubmit, pristine, reset, submitting } = props

  const onSubmit = (data) => {
    props.actions.saveNewKeyResult(objective._id, data);
  }

	return(
    <Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={8}>
              <Field name="keyresult" component={renderTextField} label="Key Result"/>
          </Col>
          <Col md={4}>
              <RaisedButton label="Save" disabled={submitting} type="submit"/>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Field name="owner"
                component={AutoCompleteAsync}
                placeholder="Owner"
                resultsValueKey="_id"
                resultsLabelKey="name"
                callback={props.empActions.findEmployeesByName}
                callbackUrl="employees/filter?name="
                results={props.employee_results}
            />  
          </Col>
          <Col md={4}>
            <Field name="quarter"
                component={renderSelectField}
                placeholder="Quarter"
                options={
                  [
                    {label: 'Q1', value: 'Q1'},
                   //// {label: 'Q2', value: 'Q2'},
                    {label: 'Q3', value: 'Q3'},
                    {label: 'Q4', value: 'Q4'}
                  ]}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
              <Field name="target" component={renderTextField} label="Target"/>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Field name="units"
                component={renderSelectAsync}
                placeholder="Select Unit"
                creatable={true}
                resultsValueKey="_id"
                resultsLabelKey="value"
                callbackUrl="config?domain=units&value="
            />
          </Col>
        </Row>
      </form>
    </Grid>
  );
}

// Decorate the form component
PoB = reduxForm({
  form: 'PoB',
  validate
})(PoB);


// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { 
      employee_results: state.employees.employee_results
    }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  empActions: bindActionCreators(empActions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (PoB);
