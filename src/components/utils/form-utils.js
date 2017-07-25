import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import TextField from 'material-ui/TextField';
import customAxios from '../../custom-axios';
 
const style = {
  error: {
    position: "relative",
    bottom: "2px",
    fontSize: "12px",
    lineHeight: '12px',
    color: '#F3294D'
  }
}

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label htmlFor={label}>{label}</label>
    <input className="form-control" {...input} placeholder={label} type={type}/>
    <p style={style.error}>{touched && (error && <span>{error}</span>)}</p>
  </div>
)

export const renderTextAreaField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label htmlFor={label}>{label}</label>
    <textarea className="form-control" {...input} placeholder={label} type={type} rows="10"/>
    <p style={style.error}>{touched && (error && <span>{error}</span>)}</p>
  </div>
)

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  // console.log('##########', input);
  // const _input = {...input, value: xyz};
  // console.log('>>>>>>>>>>>', _input);
  return (
    <TextField hintText={label}
      errorText={touched && error}
      fullWidth={true}
      {...input}
      {...custom}
    />
)}

export const renderSelectField = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.label}>{props.label}</label>
      <Select
        name={props.input.name}
        value={props.input.value}
        onChange={props.input.onChange}
        onBlur={() => props.input.onBlur(props.input.value)}
        options={props.options}
        placeholder={props.placeholder}
        simpleValue
        clearable={false}
      />
      <p style={style.error}>{props.meta.touched && (props.meta.error && <span>{props.meta.error}</span>)}</p>
    </div>
  )
}

export const renderSelectMultiField = ({ input, label, options, meta: { touched, error } }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <Select
        {...input}
        onBlur={() => input.onBlur([...input.value].map(x => (x.value)))}
        options={options}
        multi
      />
      <p style={style.error}>{touched && (error && <span>{error}</span>)}</p>
    </div>
  )
}

export const renderSelectAsync = (props) => {
  const minchar = props.minchar || 3;

  const AsyncComponent = props.creatable
    ? Select.AsyncCreatable
    : Select.Async;

  const getOptions = (input) => {
    if (!input || input.length < minchar) {
      return Promise.resolve({ options: [] });
    }
    const url = props.callbackUrl+`${input}`;
    return customAxios(url)
    .then((response) => response.data)
    .then((json) => {
      return { options: json };
    });
  }

  const gotoOption = (value, event) => {
    window.open(value.name);
  }

  return (
    <div className="form-group">
      <label htmlFor={props.label}>{props.label}</label>
      <AsyncComponent 
        multi={props.multi} 
        placeholder={props.placeholder}
        value={props.value || ''} 
        {...props.input}
        onBlur={() => props.input.onBlur(props.input.value)}
        onValueClick={gotoOption}
        valueKey={props.resultsValueKey} 
        labelKey={props.resultsLabelKey}
        loadOptions={getOptions} 
        backspaceRemoves={props.backspaceRemoves} />
      <p style={style.error}>{props.meta.touched && (props.meta.error && <span>{props.meta.error}</span>)}</p>
    </div>
  )
}
