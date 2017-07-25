import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {orange500, blue500, grey400} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ProductShuffle from './product-shuffle';

const styles = {
  radioButton: {
    marginTop: 16,
  },
  errorStyle: {
    color: "#F3294D",
  },
  underlineStyle: {
    borderColor: "#F3294D",
  },
  floatingLabelStyle: {
    color: grey400,
  },
  floatingLabelFocusStyle: {
    color: "#F3294D",
  },
};

class PoB extends Component {
	constructor (props) {
		super(props);
	}

  state = {
    open: false,
    pobName: undefined,
    pattern_trigger: undefined
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    console.log(
      this.state.pobName,
      this.state.pattern_trigger
    	)
    this.handleClose();
  };

  handleClose = () => {
    this.setState({open: false});
  };

	handlePTChange = (event, index, value) => this.setState({pattern_trigger: value});
	handlePoBChange = (event, index, value) => this.setState({pobName: value});
	
	render () {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

		return (
      <div>
        <RaisedButton label="Create New PoB" primary={true} onTouchTap={this.handleOpen} />
        <Dialog
          title="Performance Obligation"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
			    <TextField
			      floatingLabelText="Enter PoB Name"
			      floatingLabelStyle={styles.floatingLabelStyle}
			      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
			      onChange={this.handlePoBChange}
			    />

			    <br />

	        <SelectField
	          floatingLabelText="Pattern | Trigger"
	          value={this.state.pattern_trigger}
	          onChange={this.handlePTChange}
	        >
		        {
			    		this.props.pobConfigList.map( (item) => (
			    			<MenuItem value={item.id} primaryText={item.pattern + " | " + item.trigger} />
			    		))
		        }
	        </SelectField>

	        <br />

	        <ProductShuffle data={this.props.productsList}/>
        </Dialog>
      </div>
		);
	}
}

export default PoB;