import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const PoBConfigList = ({pobConfigList}) => (
	  <Table>
	    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
	      <TableRow>
	        <TableHeaderColumn>ID</TableHeaderColumn>
	        <TableHeaderColumn>PoB Config Name</TableHeaderColumn>
	        <TableHeaderColumn>Pattern</TableHeaderColumn>
	        <TableHeaderColumn>Trigger</TableHeaderColumn>
	      </TableRow>
	    </TableHeader>
	    <TableBody displayRowCheckbox={false}>
	    	{
					pobConfigList.map( x => {
						return (
				      <TableRow>
				        <TableRowColumn>{x.id}</TableRowColumn>
				        <TableRowColumn>{x.name}</TableRowColumn>
				        <TableRowColumn>{x.pattern}</TableRowColumn>
				        <TableRowColumn>{x.trigger}</TableRowColumn>
				      </TableRow>
						)
					})
				}
	    </TableBody>
	  </Table>
)

export default PoBConfigList;
