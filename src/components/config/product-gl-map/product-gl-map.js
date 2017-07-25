import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Products from './products';
import GLList from './gl-list';
import GLMapList from './gl-map-list';

class ProductGLMap extends Component {  

	constructor (props) {
		super(props);
		this.state = {
			selectedProduct: undefined,
			selectedgls: undefined,
			glMap: []
		}
		this.handleProductSelected = this.handleProductSelected.bind(this);
		this.handleGLSelected = this.handleGLSelected.bind(this);
		this.handleMapClick = this.handleMapClick.bind(this);
	}

	handleProductSelected = (product) => {
		this.state.selectedProduct = product;
	}

	handleGLSelected = (glListTemp) => {
		this.state.selectedgls = glListTemp.map(x => glList[x]);
	}

	handleMapClick = () => {
    const mapList = this.state.selectedgls.map( gl => 
					({crm_product: this.state.selectedProduct.name, 
						glstring: gl.glstring, 
						acct: gl.acct, 
						prod: gl.prod, 
						proj: gl.proj,
						dep: gl.dep,
						loc: gl.loc,
						div: gl.div,
						comp: gl.comp
					}));
		const newMapList = [...this.state.glMap, ...mapList]

    console.log(newMapList);

    this.setState({
			glMap: newMapList
    }, () => {console.log(this.state.glMap)})
	}

	render () {
		return (
			<Grid style={{paddingTop: '25px'}}>
				<Row>
					<Col md={4}>
						<Products data={this.props.productsList} onSelect={this.handleProductSelected}/>
					</Col>
					<Col md={1}>
				    <RaisedButton label="Map" primary={true} style={{marginTop: '150px'}} onClick={this.handleMapClick}/>
					</Col>
					<Col md={7}>
						<GLList data={glList} onSelect={this.handleGLSelected}/>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<GLMapList data={this.state.glMap} />
					</Col>
				</Row>
			</Grid>
		)
	}

}


const glList = [
	{glstring:"64.31.A15.17.N4.4184.SB5", acode:"4184", pjcode:"SB5", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Setup Fees / DLL", proj:"One Time Fee"},
	{glstring:"64.31.A15.17.N4.40R1.SB4", acode:"40R1", pjcode:"SB4", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Claim Inquiry", proj:"Service Pack Monthly Fee"},
	{glstring:"64.31.A15.17.N4.40R3.SB4", acode:"40R3", pjcode:"SB4", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Referral", proj:"Service Pack Monthly Fee"},
	{glstring:"64.31.A15.17.N4.40R1.SB4", acode:"40R1", pjcode:"SB4", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Claim Inquiry", proj:"Service Pack Monthly Fee"},
	{glstring:"64.31.A15.17.N4.40R3.SB4", acode:"40R3", pjcode:"SB4", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Referral", proj:"Service Pack Monthly Fee"},
	{glstring:"64.31.A15.17.N4.40R1.SB3", acode:"40R1", pjcode:"SB3", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Claim Inquiry", proj:"Service Pack"},
	{glstring:"64.31.A15.17.N4.40R3.SB3", acode:"40R3", pjcode:"SB3", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Referral", proj:"Service Pack"},
	{glstring:"64.31.A15.17.N4.40R1.SB1", acode:"40R1", pjcode:"SB1", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Claim Inquiry", proj:"Per Transaction"},
	{glstring:"64.31.A15.17.N4.40R2.SB1", acode:"40R2", pjcode:"SB1", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Eligibility", proj:"Per Transaction"},
	{glstring:"64.31.A15.17.N4.40R3.SB1", acode:"40R3", pjcode:"SB1", pdcode:"N4", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"RA", acct:"Referral", proj:"Per Transaction"},
	{glstring:"64.31.A15.17.ZU.40R8.SB3", acode:"40R8", pjcode:"SB3", pdcode:"ZU", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"Medifax RA Credit", acct:"Credit Report", proj:"Service Pack"},
	{glstring:"64.31.A15.17.ZU.40R8.SB4", acode:"40R8", pjcode:"SB4", pdcode:"ZU", lcode:"17", dcode:"A15", dicode:"31", ccode:"64", loc:"Nashville", dep:"RCM Executive Sales Revenue", div:"Medical", comp:"MediFax EDI, LLC", prod:"Medifax RA Credit", acct:"Credit Report", proj:"Service Pack Monthly Fee"},
	{glstring:"19.10.033.25.00.4123.000", acode:"4123", pjcode:"0", pdcode:"0", lcode:"25", dcode:"33", dicode:"10", ccode:"19", loc:"Tampa", dep:"ARMS Admin", div:"Accounts Receivable Management", comp:"Chapin", prod:"General", acct:"Service Revenue", proj:"none"},
	{glstring:"19.10.034.25.DK.4123.000", acode:"4123", pjcode:"0", pdcode:"DK", lcode:"25", dcode:"34", dicode:"10", ccode:"19", loc:"Tampa", dep:"ROS-Sales Revenue", div:"Accounts Receivable Management", comp:"Chapin", prod:"FCS Coding", acct:"Service Revenue", proj:"none"},
	{glstring:"19.10.034.25.DK.4123.SB1", acode:"4123", pjcode:"SB1", pdcode:"DK", lcode:"25", dcode:"34", dicode:"10", ccode:"19", loc:"Tampa", dep:"ROS-Sales Revenue", div:"Accounts Receivable Management", comp:"Chapin", prod:"FCS Coding", acct:"Service Revenue", proj:"Per Transaction"},
	{glstring:"19.10.034.25.NH.4123.000", acode:"4123", pjcode:"0", pdcode:"NH", lcode:"25", dcode:"34", dicode:"10", ccode:"19", loc:"Tampa", dep:"ROS-Sales Revenue", div:"Accounts Receivable Management", comp:"Chapin", prod:"PIP", acct:"Service Revenue", proj:"none"},
	{glstring:"19.10.034.25.NH.4123.SB1", acode:"4123", pjcode:"SB1", pdcode:"NH", lcode:"25", dcode:"34", dicode:"10", ccode:"19", loc:"Tampa", dep:"ROS-Sales Revenue", div:"Accounts Receivable Management", comp:"Chapin", prod:"PIP", acct:"Service Revenue", proj:"Per Transaction"},
	{glstring:"19.10.034.25.NK.4123.000", acode:"4123", pjcode:"0", pdcode:"NK", lcode:"25", dcode:"34", dicode:"10", ccode:"19", loc:"Tampa", dep:"ROS-Sales Revenue", div:"Accounts Receivable Management", comp:"Chapin", prod:"Denial", acct:"Service Revenue", proj:"none"},
	{glstring:"19.10.034.25.NK.4123.SB1", acode:"4123", pjcode:"SB1", pdcode:"NK", lcode:"25", dcode:"34", dicode:"10", ccode:"19", loc:"Tampa", dep:"ROS-Sales Revenue", div:"Accounts Receivable Management", comp:"Chapin", prod:"Denial", acct:"Service Revenue", proj:"Per Transaction"},
];

export default ProductGLMap;
