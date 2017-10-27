import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import AgreementLinesByPoB from './agreement-lines-pob';
import AgreementLinesList from './alines-list/agreement-lines-list';

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
	header: {
    borderBottomColor: 'black',
    borderBottomStyle: 'double',
    padding: '6px',
    backgroundColor: '#C0C0C0',
    marginLeft: '10px',
    marginRight: '10px',
    color: 'black',
    borderTopRightRadius: '2em', 
    fontSize: 'medium'
	}
}

class AgreementTreatment extends Component {
	constructor (props) {
		super (props);
		this.state = {
			pobSelectedList: [],
      slideIndex: 0,
		}
    this.handleChange = this.handleChange.bind(this);

		this.agreement = props.agreement;
		this.list = props.list;
		this.exceptionList = ['2345', '2346', '2347'];
		this.allRelatedAgreements = this.list.filter ((x) => ( this.exceptionList.indexOf(x.id) != -1 && x.id != this.agreement.id));
		this.allAlineLists = this.allRelatedAgreements.map ( y => y.alines.map(ab => {ab['aid'] = y.id; return ab;}) );
		this.allAlineList = this.allAlineLists.length > 0 ? this.allAlineLists.reduce( (fList, item) => fList ? fList.concat(item) : null): null;
		this.filterLinesByPoB = this.filterLinesByPoB.bind(this);
	}

	filterLinesByPoB(index) {
		const pob = this.agreement.alines[index[0]].PoBName;
		const allRAgreements = this.list.filter ((x) => ( this.exceptionList.indexOf(x.id) != -1 ));
		const allAlines = allRAgreements.map ( y => y.alines.filter(f => f.PoBName === pob).map(ab => {ab['aid'] = y.id; return ab;}) );
		const pobSelectedList = allAlines.length > 0 ? allAlines.reduce( (fList, item) => fList ? fList.concat(item) : null): null;
		this.setState({pobSelectedList: pobSelectedList});
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
				<div>				
					<AgreementInfo agreement={this.agreement} />

	      	<SectionHeader title={'Agreement Lines'} />
	      	<AgreementLinesList id={this.agreement.id} alines={this.agreement.alines} />
				</div>
	    </MuiThemeProvider>
          // <Tabs
          //   onChange={this.handleChange}
          //   value={this.state.slideIndex}
          // >
          //   <Tab label="Filter by Performance Obligation" value={0}>
			      	// <SectionHeader title={'Summary by PoB'} />
			      	// <AgreementLinesByPoB pobALines={this.state.pobSelectedList} />
          //   </Tab>
          //   <Tab label="All Agreement lines in Hierarchy" value={1} >
			      	// <SectionHeader title={'All Other Agreement Lines in the Hierarchy'} />
			      	// <AgreementLinesList alines={this.allAlineList} />
          //   </Tab>
          // </Tabs>

		)
	}
}

const SectionHeader = ({title}) => (
	<div style={style.header}>{title}</div>
)

const AgreementInfo = ({agreement}) => (
	<div style={{padding: '10px'}}>
		<b>Agreement Id:</b> <a href="">{agreement.id}</a> <br />
		<b>Customer:</b> {agreement.customerName} <br />
		<b>Parent Agreement Id:</b> {agreement.parentAgreementId ? <a href="">{agreement.parentAgreementId}</a> : 'None'} <br />
	</div>
)

export default AgreementTreatment;