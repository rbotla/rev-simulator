import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';

class SSPInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      withinSSP: props.withinSSP,
      agreement: props.agreement,
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
        <IconButton onTouchTap={this.handleTouchTap} style={{backgroundColor: this.state.withinSSP ? '#00FF00' : '  #FF4500'}}>
          <FontIcon className="material-icons">info_outline</FontIcon>
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <div style={{margin: '10px', fontSize: 'small'}}>
            Unit Price: {this.state.agreement.unit_price} <br />            
            SSP Min: {this.state.agreement.ssp_min} <br />
            SSP: {this.state.agreement.ssp} <br />
            SSP Max: {this.state.agreement.ssp_max} <br />
          </div>
        </Popover>
      </div>
    )
  }
}

export default SSPInfo;