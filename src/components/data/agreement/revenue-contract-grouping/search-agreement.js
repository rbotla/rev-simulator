import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class SearchAgreement extends Component {
	constructor (props) {
		super(props);
		this.showAgreementDetails = this.showAgreementDetails.bind(this);
		this.redirectToAgreementTreatmentPage = this.redirectToAgreementTreatmentPage.bind(this);
	}

	showAgreementDetails(index, list) {
		browserHistory.push({
			pathname: '/staging/contract-treatment',
			state: {
				agreement: list[index[0]],
				list: list
			}
		})
	}

	redirectToAgreementTreatmentPage(agreement, list) {
		console.log(agreement, list);
		browserHistory.push({
			pathname: '/staging/contract-treatment',
			state: {
				agreement: agreement,
				list: list
			}
		})
	}

	render () {
		return (
			<div>
			<br />
				<RaisedButton label="Create A New Agreement" primary={true}/>
			<br />

			  <Table>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
			      <TableRow>
			        <TableHeaderColumn>ID</TableHeaderColumn>
			        <TableHeaderColumn>Parent Agreement Id</TableHeaderColumn>
			        <TableHeaderColumn># Agreement Lines</TableHeaderColumn>			        
			        <TableHeaderColumn>Customer Name</TableHeaderColumn>
			        <TableHeaderColumn>Agreement Type</TableHeaderColumn>
			        <TableHeaderColumn>Agreement Name</TableHeaderColumn>
			        <TableHeaderColumn>Grouping & Treatment</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			    	{
							agreements.map( x => {
								return (
						      <TableRow>
						        <TableRowColumn>{x.id}</TableRowColumn>
						        <TableRowColumn>{x.parentAgreementId}</TableRowColumn>
						        <TableRowColumn>{x.alines? x.alines.length: 0}</TableRowColumn>
						        <TableRowColumn>{x.customerName}</TableRowColumn>
						        <TableRowColumn>{x.agreementType}</TableRowColumn>
						        <TableRowColumn>{x.agreementName}</TableRowColumn>
						        <TableRowColumn>
					            <IconButton tooltip="Contract Grouping & Treatment" onClick={() => this.redirectToAgreementTreatmentPage(x, agreements)}>
					              <FontIcon className="material-icons">low_priority</FontIcon>
					            </IconButton>
						        </TableRowColumn>
						      </TableRow>
								)
							})
						}
			    </TableBody>
			  </Table>

			</div>
		)
	}
}

const agreements = [
	{id: "2345", customerName: "ESIS, Inc.", accountId: "0016000000rEei5AAC", documentTitle: "Emdeon Claims Payment and Communication Services Schedule", agreementType: "Base Agreement", agreementName: "ACE INA Holdings Inc.Payer.CID 153362.pdf", parentAgreementId: "", startDate: "2014-04-10", endDate: "2018-04-09", contractTerm: 36, autoRenew: "Yes", noticePeriod: 45, contractRenewalTerm: 12, contractRenewalLimit: 999, 
		alines: [
			{alid: 123, product: 'Hospital Claims', defaultTreatment: 'Long-Haul', feetype: 'Implementation Fee', pobId: '11', PoBName: 'Claims', unit_price: 18000, ssp_min: 3500, ssp: 7000, ssp_max: 13000, at_ssp: 'Yes', status: 'Active'},
			{alid: 124, product: 'Hospital Claims', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'},
			{alid: 125, product: 'Dental Claims', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'},
			{alid: 126, product: 'ERA', feetype: 'Transaction Fee', defaultTreatment: 'Inconsequential', pobId: '12', PoBName: 'ERA', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'},
			{alid: 127, product: 'Eligibility', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '13', PoBName: 'Eligibility', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'}
		]
	},	
	{id: "2346", customerName: "ESIS, Inc.", accountId: "0016000000fvjnNAAQ", documentTitle: "", agreementType: "Amendment", agreementName: "Blue Cross Blue Shield of Rhode Island(BCBSRI).ABF.Payer.CID 151426.pdf", parentAgreementId: "2345", startDate: "2013-07-01", endDate: "2016-06-30", contractTerm: 24, autoRenew: "Yes", noticePeriod: 15, contractRenewalTerm: 24, contractRenewalLimit: 3, 
		alines: [
			{alid: 128, product: 'Claim Inquiry', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'},
			{alid: 129, product: 'Real-Time', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '14', PoBName: 'Real-Time', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'},
			{alid: 130, product: 'Batch Claims', feetype: 'Transaction Fee', defaultTreatment: 'Inconsequential', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'},
			{alid: 131, product: 'PRE', defaultTreatment: 'Long-Haul', pobId: '15', PoBName: 'PRE', feetype: 'Transaction Fee', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'}, 
		]
	},
	{id: "2347", customerName: "ESIS, Inc.", accountId: "0016000000fF7HUAA0", documentTitle: "Trading Partner Agreement", agreementType: "Amendment", agreementName: "Delta Dental of California.Trading Partner.CID 150915.pdf", parentAgreementId: "2345", startDate: "2013-06-01", endDate: "2018-05-31", contractTerm: 36, autoRenew: "No", noticePeriod: 90, contractRenewalTerm: 3, contractRenewalLimit: 3, 
		alines: [
			{alid: 132, product: 'Medical Claims', feetype: 'Implementation Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'},
			{alid: 133, product: 'Medical Claims', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'},
			{alid: 134, product: 'Advanced Claiming', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '16', PoBName: 'Advanced Claiming', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'},
			{alid: 135, product: 'ERA', feetype: 'Transaction Fee', defaultTreatment: 'Inconsequential', pobId: '12', PoBName: 'ERA', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active'}
		]
	},		
	{id: "2348", customerName: "Delta Dental of California", accountId: "0016000000fF7HUAA0", documentTitle: "Trading Partner Agreement", agreementType: "Base Agreement", agreementName: "Delta Dental of California.Trading Partner.CID 150915.pdf", parentAgreementId: "", startDate: "2013-06-01", endDate: "2018-05-31", contractTerm: 36, autoRenew: "No", noticePeriod: 90, contractRenewalTerm: 3, contractRenewalLimit: 3}
];

export default SearchAgreement;