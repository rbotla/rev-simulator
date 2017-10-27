import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import AgreementLinesByPoB from '../agreement-lines-pob';

class POBInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreementId: props.agreementId,
      aline: props.aline,
      pobALines: relatedALines.filter(x => x.pobId === props.aline.pobId),
      open: false,
    }
  }

  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render () {
    return (
      <div>
        <IconButton onTouchTap={this.handleTouchTap} >
          <FontIcon className="material-icons">list</FontIcon>
        </IconButton>
        <Popover
          style={{width: '95%', borderStyle:'outset'}}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'center', vertical: 'bottom'}}
          onRequestClose={this.handleRequestClose}
        >
          <div style={{margin: '10px', fontSize: 'small'}}>
            {
            this.state.pobALines.length > 1 ? 
            <AgreementLinesByPoB 
              currentAgreementId={this.state.agreementId} 
              pobALines={this.state.pobALines} 
              callBackRevContractSelection={this.props.callBackRevContractSelection} 
              lineId={this.props.aline.alid}
              handlePopoverClose={this.handleRequestClose}
              /> : 
            <div>There are no related agreement lines for PoB: {this.state.aline.PoBName} in the agreement hierarchy.</div>
            }
          </div>
        </Popover>
      </div>
    )
  }
}

const relatedALines = [
    {aid: '2345', alid: 123, product: 'Hospital Claims', defaultTreatment: 'Long-Haul', feetype: 'Implementation Fee', pobId: '11', PoBName: 'Claims', unit_price: 18000, ssp_min: 3500, ssp: 7000, ssp_max: 13000, at_ssp: 'Yes', status: 'Active', revContractId: '111'},
    {aid: '2345', alid: 124, product: 'Hospital Claims', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '111'},
    {aid: '2345', alid: 125, product: 'Dental Claims', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '111'},
    {aid: '2345', alid: 126, product: 'ERA', feetype: 'Transaction Fee', defaultTreatment: 'Inconsequential', pobId: '12', PoBName: 'ERA', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Amended', revContractId: '111'},
    {aid: '2345', alid: 127, product: 'Eligibility', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '13', PoBName: 'Eligibility', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '111'},
    {aid: '2346', alid: 128, product: 'Claim Inquiry', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '111'},
    {aid: '2346', alid: 129, product: 'Real-Time', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '14', PoBName: 'Real-Time', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '115'},
    {aid: '2346', alid: 130, product: 'Batch Claims', feetype: 'Transaction Fee', defaultTreatment: 'Inconsequential', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '116'},
    {aid: '2346', alid: 131, product: 'PRE', defaultTreatment: 'Long-Haul', pobId: '15', PoBName: 'PRE', feetype: 'Transaction Fee', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '116'},
    {aid: '2347', alid: 132, product: 'Medical Claims', feetype: 'Implementation Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '117'},
    {aid: '2347', alid: 133, product: 'Medical Claims', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '11', PoBName: 'Claims', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '117'},
    {aid: '2347', alid: 134, product: 'Advanced Claiming', feetype: 'Transaction Fee', defaultTreatment: 'Long-Haul', pobId: '16', PoBName: 'Advanced Claiming', unit_price: .15, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '117'},
    {aid: '2347', alid: 135, product: 'ERA', feetype: 'Transaction Fee', defaultTreatment: 'Inconsequential', pobId: '12', PoBName: 'ERA', unit_price: .25, ssp_min: .08, ssp: .12, ssp_max: .22, at_ssp: 'Yes', status: 'Active', revContractId: '111'}
  ];

export default POBInfo;