import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import PoBList from './pob-definition/pob-list';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PoBConfigList from './pob-config-list';
import ProductGLMap from './product-gl-map/product-gl-map';
import PoB from './pob-definition/pob';

injectTapEventPlugin();

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

class ConfigHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 2,
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
                <Tab label="PoB Pattern Config" value={0}>
                  <PoBConfig />
                </Tab>
                <Tab label="Products / Services" value={1} />
                <Tab label="PoB Definition" value={2} >
                  <PoBDefinition />
                </Tab>
                <Tab label="Product GL Map" value={3}>
                  <ProductGLMap productsList={productsList}/>
                </Tab>
                <Tab label="CRM Accounts" value={4} />
                <Tab label="Billing (Customer) Ids" value={5} />
              </Tabs>
            </Col>
					</Row>
				</Grid>
			</MuiThemeProvider>
		)
	}
}

const PoBDefinition = (props) => {
	return (
    <div style={style}>
    <Row style={{padding: '15px'}}>
      <Col md={12}>
        <PoB pobConfigList={pobConfigList} productsList={productsList}/>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <PoBList pobList={pobList}/>
      </Col>
    </Row>
    </div>
	)
}

const PoBConfig = (props) => {
  return (
    <div style={style}>
    <Row style={{padding: '15px'}}>
      <Col md={12}>
        <RaisedButton label="Create New PoB Config" primary={true}/>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <PoBConfigList pobConfigList={pobConfigList}/>
      </Col>
    </Row>
    </div>
  )
}

const pobList = [
  {id:1232, name: 'Claims', products: 5, pobconfigid: 102, pattern: 'Ratable', trigger: 'Time elapsed'},
  {id:1234, name: 'ERA', products: 2, pobconfigid: 102, pattern: 'Ratable', trigger: 'Time elapsed'},
  {id:1235, name: 'Eligibility', products: 1, pobconfigid: 103, pattern: 'Input', trigger: 'Time elapsed'},
  {id:1236, name: 'Print & Mail Services', products: 14, pobconfigid: 104, pattern: 'Input', trigger: 'Savings identified'},
  {id:1237, name: 'Electronic Bill Pay', products: 1, pobconfigid: 105, pattern: 'Input', trigger: 'Application Submitted'},
  {id:1238, name: 'Real Time', products: 1, pobconfigid: 106, pattern: 'Output', trigger: 'PEPM'},
];

const pobConfigList = [
  {id:'101', name: 'Point in time', products: 5, pattern: 'One time', trigger: 'Upon billing'},
  {id:'102', name: 'Overtime - Ratable - Time elapsed', products: 5, pattern: 'Ratable', trigger: 'Time elapsed'},
  {id:'103', name: 'Overtime - Series - Time elapsed', products: 5, pattern: 'Series', trigger: 'Time elapsed'},
  {id:'104', name: 'Overtime - Output - Savings identified', products: 4, pattern: 'Output', trigger: 'Savings identified'},
  {id:'105', name: 'Overtime - Input - Application Submitted', products: 2, pattern: 'Input', trigger: 'Application Submitted'},
  {id:'106', name: 'Overtime - Output - PEPM', products: 3, pattern: 'Output', trigger: 'PEPM'},
];

const productsList = [
  {name: 'Hospital Claims'},
  {name: 'Medical Claims'},
  {name: 'Dental Claims'},
  {name: 'ERA'},
  {name: 'Eligibility'},
]

export default ConfigHome;