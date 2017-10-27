import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SearchAgreement from './agreement/revenue-contract-grouping/search-agreement'; 

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#FFF",
    primary2Color: "#F3294D",
    accent1Color: "#F3294D",
    pickerHeaderColor: "#F3294D",
    alternateTextColor: Colors.darkBlack
  }
});

const style = {
  padding: '15px'
};

class DataHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({
      slideIndex: value,
    });
  };

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Grid>
          <Row>
            <Col md={12}>
              <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
              >
                <Tab label="Agreements" value={0}>
                  <SearchAgreement />
                </Tab>
                <Tab label="Invoice" value={1} />
                <Tab label="TCV" value={2} >
                </Tab>
                <Tab label="Product - GL SSP" value={3} />
                <Tab label="Test cases" value={4} />
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default DataHome;