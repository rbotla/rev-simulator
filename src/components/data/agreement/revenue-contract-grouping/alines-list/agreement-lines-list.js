import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Toggle from 'material-ui/Toggle';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import SSPInfo from './ssp-info';
import POBInfo from './pob-info';

class AgreementLinesList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.id,
      alines: props.alines,
      parentObject: props.that,
      revContractMap: {}
    }
    this.handleContractIdSelection = this.handleContractIdSelection.bind(this);
    this.resetContractId = this.resetContractId.bind(this);
  }

  handleContractIdSelection(lineId, revContractid) {
    const newMap = {};
    newMap[lineId] = revContractid;
    this.setState({
      revContractMap: {...this.state.revContractMap, ...newMap}
    });
  }

  resetContractId(lineId) {
    const newMap = {};
    newMap[lineId] = '';
    this.setState({
      revContractMap: {...this.state.revContractMap, ...newMap}
    });
  }

  render() {
    return (
    	<div style={{padding: '10px'}}>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} stripedRows={true}>
          <TableRow >
            { this.state.id? null: <TableHeaderColumn>Agreement ID</TableHeaderColumn> }
            <TableHeaderColumn style={ {width: '2rem'} }>Line ID</TableHeaderColumn>
            <TableHeaderColumn style={ {width: '2rem'} }>PoB Id</TableHeaderColumn>
            <TableHeaderColumn style={ {width: '5rem'} }>PoB Name</TableHeaderColumn>
            <TableHeaderColumn>Product Name</TableHeaderColumn>
            <TableHeaderColumn>Fee Type</TableHeaderColumn>
            <TableHeaderColumn style={ {width: '3rem', whiteSpace: 'normal', wordWrap: 'break-word'} }>Related Agrmnt. Lines</TableHeaderColumn>
            <TableHeaderColumn style={ {width: '2rem'} }>At SSP?</TableHeaderColumn>
            <TableHeaderColumn>New Rev Contract Flag</TableHeaderColumn>
            <TableHeaderColumn>Rev Contract Id</TableHeaderColumn>
            <TableHeaderColumn style={ {whiteSpace: 'normal', wordWrap: 'break-word'} }>Auto Select Info.</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
        	{
    				this.state.alines ?
    				this.state.alines.map( (x, index) => {
              const withinSSP = (x.unit_price >= x.ssp_min) && (x.unit_price <= x.ssp_max);
              return (
    			      <TableRow striped={true} key={index}>
    			        { this.state.id? null: <TableRowColumn>{this.state.id? this.state.id: x.aid}</TableRowColumn> }
    			        <TableRowColumn style={ {width: '2rem'} }>{x.alid}</TableRowColumn>
                  <TableRowColumn style={ {width: '2rem'} }>{x.pobId}</TableRowColumn>
                  <TableRowColumn style={ {width: '5rem'} }>{x.PoBName}</TableRowColumn>
    			        <TableRowColumn>{x.product}</TableRowColumn>
    			        <TableRowColumn>{x.feetype}</TableRowColumn>
                  <TableRowColumn style={ {width: '3rem'} }>
                      <POBInfo aline={x} alines={this.state.alines} agreementId={this.state.id} callBackRevContractSelection={this.handleContractIdSelection}/>                
                  </TableRowColumn>
    			        <TableRowColumn style={ {width: '2rem'} } >
                      <SSPInfo agreement={x} withinSSP={withinSSP}/>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Toggle
                      labelPosition="right"
                      onClick={() => this.resetContractId(x.alid)}
                      thumbSwitchedStyle={{backgroundColor: '#C0C0C0'}}
                      trackSwitchedStyle={{backgroundColor: '#F3294D'}}
                      style={{marginBottom: 16}}
                    />
                  </TableRowColumn>
    			        <TableRowColumn>
                    {this.state.revContractMap[x.alid]}
                  </TableRowColumn>
                  <TableRowColumn >
                    <IconButton>
                      <FontIcon className="material-icons">info_outline</FontIcon>
                    </IconButton>
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

export default AgreementLinesList;