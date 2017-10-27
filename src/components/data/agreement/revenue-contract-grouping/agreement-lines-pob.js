import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class AgreementLinesByPoB extends Component {
	render () {
		if (this.props.pobALines.length == 0) {
			return (<div> No other PoBs found! </div>);
		}
		const pobId = this.props.pobALines[0].pobId;
		const pobName = this.props.pobALines[0].PoBName;		
		const pobSSPMin = this.props.pobALines.map(x => x.ssp_min).reduce( (a, b) => (a+b) );
		const pobSSP = this.props.pobALines.map(x => x.ssp).reduce( (a, b) => (a+b) );
		const pobSSPMax = this.props.pobALines.map(x => x.ssp_max).reduce( (a, b) => (a+b) );
		const pobPrice =  this.props.pobALines.map(x => x.unit_price).reduce( (a, b) => (a+b) );
		const pobWithinSSP = (pobPrice >= pobSSPMin && pobPrice <= pobSSPMax);
		const linesCount = this.props.pobALines.length;

		return (
			<div style={{padding: '10px', height: '400px', overflowY: 'scroll'}}>
		  <Table selectable={false}>
		    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
		      <TableRow>
		        <TableHeaderColumn>PoB ID</TableHeaderColumn>
		        <TableHeaderColumn>PoB Name</TableHeaderColumn>
		        <TableHeaderColumn>PoB Price</TableHeaderColumn>
		        <TableHeaderColumn>PoB SSP Min</TableHeaderColumn>			        
		        <TableHeaderColumn>PoB SSP</TableHeaderColumn>
		        <TableHeaderColumn>PoB SSP Max</TableHeaderColumn>
		        <TableHeaderColumn>PoB At SSP?</TableHeaderColumn>
		      </TableRow>
		    </TableHeader>
		    <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
		      <TableRow>
		        <TableRowColumn>{pobId}</TableRowColumn>
		        <TableRowColumn>{pobName}</TableRowColumn>
		        <TableRowColumn>{Math.round(pobPrice*100)/100}</TableRowColumn>
		        <TableRowColumn>{Math.round(pobSSPMin*100)/100}</TableRowColumn>
		        <TableRowColumn>{Math.round(pobSSP*100)/100}</TableRowColumn>
		        <TableRowColumn>{Math.round(pobSSPMax*100)/100}</TableRowColumn>
		        <TableRowColumn style={{backgroundColor: pobWithinSSP ? '#00FF00' : '  #FF4500'}}>
		        	{ pobWithinSSP ? 'Yes' : 'No'}</TableRowColumn>
		      </TableRow>
		    </TableBody>
		  </Table>

		  <Table bodyStyle={{width: '-fit-content'}} selectable={false}>
		    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
		      <TableRow>
		        <TableHeaderColumn>Agreement ID</TableHeaderColumn>
		        <TableHeaderColumn>Line ID</TableHeaderColumn>
		        <TableHeaderColumn>Product</TableHeaderColumn>
		        <TableHeaderColumn>Status</TableHeaderColumn>
		        <TableHeaderColumn>Fee Type</TableHeaderColumn>			        
		        <TableHeaderColumn>PoB</TableHeaderColumn>
		        <TableHeaderColumn>Unit Price</TableHeaderColumn>
		        <TableHeaderColumn>At SSP?</TableHeaderColumn>
		        <TableHeaderColumn>RC Id</TableHeaderColumn>
		        <TableHeaderColumn style={ {whiteSpace: 'normal', wordWrap: 'break-word'}} >Select Rev. Contract Id</TableHeaderColumn>
		      </TableRow>
		    </TableHeader>
		    <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
		    	{		    		
						this.props.pobALines ?
						this.props.pobALines.map( x => {
							const withinSSP = (x.unit_price >= x.ssp_max || x.unit_price <= x.ssp_max);
							const sameAgreement = this.props.currentAgreementId === x.aid;
							return (
					      <TableRow style={{backgroundColor: sameAgreement ? '#ffff99' : ''}}>
					        <TableRowColumn>{x.aid}</TableRowColumn>
					        <TableRowColumn>{x.alid}</TableRowColumn>
					        <TableRowColumn>{x.product}</TableRowColumn>
					        <TableRowColumn style={{backgroundColor: x.status !== 'Active' ? '#FF4500' : 'none'}}>{x.status}</TableRowColumn>
					        <TableRowColumn>{x.feetype}</TableRowColumn>
					        <TableRowColumn>{x.PoBName}</TableRowColumn>
					        <TableRowColumn>{x.unit_price}</TableRowColumn>
					        <TableRowColumn style={{backgroundColor: withinSSP ? '#00FF00' : '  #FF4500'}}>
					        	{withinSSP ? 'Yes' : 'No'}</TableRowColumn>
					        <TableRowColumn>{sameAgreement? '': x.revContractId}</TableRowColumn>
					        <TableRowColumn>
					        	{sameAgreement? null : 
					        		<RaisedButton label="Select" primary={true} 
					        			onClick={() => {
					        				this.props.callBackRevContractSelection(this.props.lineId, x.revContractId)
													this.props.handlePopoverClose()
					        			}}
					        		/>}
					        </TableRowColumn>
					      </TableRow>
							)
						})
						: 'No agreement lines available for the Agreement.'
					}
		    </TableBody>
		  </Table>
		  </div>
		)
	}
}

export default AgreementLinesByPoB;