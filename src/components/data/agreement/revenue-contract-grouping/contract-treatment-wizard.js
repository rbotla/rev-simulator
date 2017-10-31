import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import AgreementTreatment from './agreement-treatment';
import RevenueContractTreatment from './revenue-contract-treatment';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.white
  }
});
/**
 * It is possible to specify your own step connector by passing an element to the `connector`
 * prop. If you want to remove the connector, pass `null` to the `connector` prop.
 */
class ContractTreatmentWizard extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  state = {
    stepIndex: 0,
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <AgreementTreatment agreement={this.props.location.state.agreement} list={this.props.location.state.list}/>
        );

      case 1:
        return (
          <RevenueContractTreatment />
        );

      case 2:
        return (
          <p>
            {'Try out different ad text to see what brings in the most customers, and learn ' +
            'how to enhance your ads using features like ad extensions. If you run into any ' +
            'problems with your ads, find out how to tell if they\'re running and how to ' +
            'resolve approval issues.'}
          </p>
        );
    }
  }

  handleNext() {
    const {stepIndex} = this.state;

    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;

    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <div style={{width: '100%', margin: 'auto'}}>

          <div style={{width: '100%', maxWidth: 900, margin: 'auto'}}>
            <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>

              <Step>
                <StepLabel>Revenue Contract Grouping</StepLabel>
              </Step>

              <Step>
                <StepLabel>Revenue Contract Treatment</StepLabel>
              </Step>

              <Step>
                <StepLabel>Review & Save</StepLabel>
              </Step>
            </Stepper>
          </div>
          <div style={{marginRight: 24, float: 'right'}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label={stepIndex === 2 ? 'Finish' : 'Next'}
              primary={true}
              onClick={this.handleNext}
            />
          </div>
          {this.getStepContent(stepIndex)}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ContractTreatmentWizard;
