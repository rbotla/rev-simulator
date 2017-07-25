import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class GLMapList extends Component {
	constructor(props) {
		super(props);
		this.state = {
      query: '',
      filteredData: props.data
    }
    this.doSearch = this.doSearch.bind(this);
    this.renderResults = this.renderResults.bind(this);
	}

  componentWillReceiveProps(props) {
    console.log(props.data);
    this.setState({
      filteredData: props.data
    })
  }

  doSearch(queryText){
    var queryResult=[];
    const qText = queryText.toLowerCase();

    this.props.data.forEach(function(item){
        if(item.prod.toLowerCase().indexOf(qText)!=-1 || 
          item.acct.toLowerCase().indexOf(qText)!=-1 ||
          item.proj.toLowerCase().indexOf(qText)!=-1 ||
          item.crm_product.toLowerCase().indexOf(qText)!=-1)
        queryResult.push(item);
    });

    this.setState({
      query:queryText,
      filteredData: queryResult
    })
  }

  renderResults() {
    console.log(this.state.filteredData);
    if (this.state.filteredData) {
      return (
        <Table multiSelectable={true} height={'300px'} onRowSelection={this.props.onSelect}>
          <TableHeader >
            <TableRow>
              <TableHeaderColumn >CRM Product</TableHeaderColumn>
              <TableHeaderColumn style={{width: '12rem'}}>GL String</TableHeaderColumn>
              <TableHeaderColumn>Product Name</TableHeaderColumn>
              <TableHeaderColumn>Account Name</TableHeaderColumn>
              <TableHeaderColumn>Project Name</TableHeaderColumn>
              <TableHeaderColumn>Location</TableHeaderColumn>
              <TableHeaderColumn>Division</TableHeaderColumn>
              <TableHeaderColumn>Company</TableHeaderColumn>
              <TableHeaderColumn>Department</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {
              this.state.filteredData.map( x => {
                return ( 
                  <TableRow> 
                    <TableRowColumn>{x.crm_product}</TableRowColumn>
                    <TableRowColumn style={{width: '12rem'}}>{x.glstring}</TableRowColumn>
                    <TableRowColumn>{x.prod}</TableRowColumn>
                    <TableRowColumn>{x.acct}</TableRowColumn>
                    <TableRowColumn>{x.proj}</TableRowColumn>
                    <TableRowColumn>{x.loc}</TableRowColumn>
                    <TableRowColumn>{x.div}</TableRowColumn>
                    <TableRowColumn>{x.comp}</TableRowColumn>
                    <TableRowColumn>{x.dep}</TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      );
    }
  }

	render () {
	  return (
      <div className="InstantBox">
          <SearchBox query={this.state.query} doSearch={this.doSearch}/>
          {this.renderResults()}
      </div>
	  );
	}
}

class SearchBox extends Component {
	constructor (props) {
		super(props);
		this.doSearch = this.doSearch.bind(this);
	}
  doSearch(){
      var query=this.refs.searchGL.value; // this is the search text
      this.props.doSearch(query);
  }
  render () {
  	return <input 
  				style={{width: '100%', height:'30px', fontSize: '14px', paddingLeft: '4px'}} 
  				type="text" ref="searchGL" 
  				placeholder="Search" 
  				value={this.props.query} 
  				onChange={this.doSearch}/>
	}
}

export default GLMapList;