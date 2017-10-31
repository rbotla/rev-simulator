import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RevenueContractTreatment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialContractMap: {},
			contractModMap: {},			
		}
		this.handleInitialContractTreatmentChange = this.handleInitialContractTreatmentChange.bind(this); 
		this.handleContractModTreatmentChange = this.handleContractModTreatmentChange.bind(this); 
	}

	handleInitialContractTreatmentChange(event, index, value, revCId) {
		const newMap = {};
		newMap[revCId] = value;
		// this.setState ({
		// 	initialContractMap: {...this.state.initialContractMap, ...newMap}
		// })
	}

	handleContractModTreatmentChange() {

	}

	render () {
		return (
		  <Table bodyStyle={{width: '-fit-content'}} selectable={false}>
		    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
		      <TableRow>
		        <TableHeaderColumn>Revenue Contract Id</TableHeaderColumn>
		        <TableHeaderColumn>Intial Contract Treatment</TableHeaderColumn>
		        <TableHeaderColumn>Contract Modification Treatment</TableHeaderColumn>
		        <TableHeaderColumn>View Agreement Lines</TableHeaderColumn>
		      </TableRow>
		    </TableHeader>
		    <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
		    	{
						revenueContracts ?
						revenueContracts.map( (x, index) => {
							return (
					      <TableRow key={index}>
					        <TableRowColumn>{x.revCId}</TableRowColumn>
					        <TableRowColumn>
						        <SelectField
						          value={this.state.initialContractMap[x.revCId]}
						          onChange={this.handleInitialContractTreatmentChange(x.revCId)}
						        >
						          <MenuItem value={1} primaryText="Long-Haul" />
						          <MenuItem value={2} primaryText="Right to Invoice" />
						          <MenuItem value={3} primaryText="Allocation to Series" />
						          <MenuItem value={4} primaryText="Inconsequential" />
						        </SelectField>
					        </TableRowColumn>
					        <TableRowColumn>
						        <SelectField>
						          <MenuItem value={1} primaryText="Prospective" />
						          <MenuItem value={2} primaryText="Cumulative Catch-up" />
						          <MenuItem value={3} primaryText="Separate Contract" />
						          <MenuItem value={4} primaryText="Inconsequential" />
						        </SelectField>
					        </TableRowColumn>
					        <TableRowColumn>
					        	Link
					        </TableRowColumn>
					      </TableRow>
							)
						})
						: 'No agreement lines available for the Agreement.'
					}
		    </TableBody>
		  </Table>
		)
	}
}

const revenueContracts = [
	{revCId: '111'},
	{revCId: '116'},
	{revCId: '118'},
]

export default RevenueContractTreatment;