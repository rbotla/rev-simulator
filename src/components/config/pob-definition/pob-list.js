import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const PoBList = ({pobList}) => (
	  <Table>
	    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
	      <TableRow>
	        <TableHeaderColumn>ID</TableHeaderColumn>
	        <TableHeaderColumn>PoB Name</TableHeaderColumn>
	        <TableHeaderColumn>#Products</TableHeaderColumn>
	        <TableHeaderColumn>PoB Config Id</TableHeaderColumn>
	        <TableHeaderColumn>Pattern</TableHeaderColumn>
	        <TableHeaderColumn>Trigger</TableHeaderColumn>
	      </TableRow>
	    </TableHeader>
	    <TableBody displayRowCheckbox={false}>
	    	{
					pobList.map( x => {
						return (
				      <TableRow>
				        <TableRowColumn>{x.id}</TableRowColumn>
				        <TableRowColumn>{x.name}</TableRowColumn>
				        <TableRowColumn>{x.products}</TableRowColumn>
				        <TableRowColumn>{x.pobconfigid}</TableRowColumn>
				        <TableRowColumn>{x.pattern}</TableRowColumn>
				        <TableRowColumn>{x.trigger}</TableRowColumn>
				      </TableRow>
						)
					})
				}
	    </TableBody>
	  </Table>
)

export default PoBList;
