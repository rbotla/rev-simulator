import React, {PropTypes, Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import customAxios from '../../custom-axios';

class AutoCompleteSync extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backspaceRemoves: props.backspaceRemoves || true,
			multi: props.multi || false,
			value: props.value,
			minchar: props.minchar || 3,
			creatable: props.creatable || false,
			label: props.label || 'Select...',
			placeholder: props.placeholder,
			displayName: props.displayName,
			callback: props.callback,
			results: props.results,
			resultsValueKey: props.resultsValueKey,
			resultsLabelKey: props.resultsLabelKey,
			callbackUrl: props.callbackUrl
		};

		console.log(this.state);

		this.onChange = this.onChange.bind(this);
		this.getOptions = this.getOptions.bind(this);
		this.gotoOption = this.gotoOption.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	getOptions (input) {
		if (!input || input.length < this.state.minchar) {
			return Promise.resolve({ options: [] });
		}
		const url = this.state.callbackUrl+`${input}`;
		//this.state.callback(input);	
		return customAxios(url)
		.then((response) => response.data)
		.then((json) => {
			return { options: json };
		});
	}

	onInputChange(input) {
	  console.log(input);
	  if (input || input.length > this.state.minchar) {
	  	this.state.callback();
	  }
	  return;
	}

	gotoOption (value, event) {
		console.log(value);		
		window.open(value.name);
	}

	onChange (value) {
console.log(value);
		this.setState({
			value: value,
		});
		// this.onBlur(value);
	}

	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<AsyncComponent 
				ref="select"
				multi={this.state.multi} 
				placeholder={this.state.placeholder}
				value={this.props.value|| ''} 
				{...this.props.input}
				onBlur={() => this.props.input.onBlur(this.props.input.value)}
				onValueClick={this.gotoOption}
				valueKey={this.state.resultsValueKey} 
				labelKey={this.state.resultsLabelKey}
				loadOptions={this.getOptions} 
				backspaceRemoves={this.state.backspaceRemoves} />
		);
	}
}

AutoCompleteSync.propTypes = {
	label: React.PropTypes.string,
  displayName: React.PropTypes.string,
  callback: React.PropTypes.func,
  results: React.PropTypes.array,
  resultsValueKey: React.PropTypes.string,
  resultsLabelKey: React.PropTypes.string,
  creatable: PropTypes.bool,
	multi: PropTypes.bool,  
	minchar: PropTypes.number,
	backspaceRemoves: PropTypes.bool
};

AutoCompleteSync.defaultProps = {
	backspaceRemoves: true,
	multi: false,
	creatable: false,
	minchar: 3
};


module.exports = AutoCompleteSync;
