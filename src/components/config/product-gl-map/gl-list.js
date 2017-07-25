import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class GLList extends Component {

	constructor(props) {
		super(props);
		this.state = {
      query: '',
      filteredData: props.data
    }
    this.doSearch = this.doSearch.bind(this);
    this.renderResults = this.renderResults.bind(this);
	}

  doSearch(queryText){
    var queryResult=[];
    this.props.data.forEach(function(item){
        if(item.prod.toLowerCase().indexOf(queryText.toLowerCase())!=-1 || item.acct.toLowerCase().indexOf(queryText.toLowerCase())!=-1)
        queryResult.push(item);
    });

    this.setState({
      query:queryText,
      filteredData: queryResult
    })
  }

  renderResults() {
    if (this.state.filteredData) {
      return (
        <Table multiSelectable={true} height={'300px'} onRowSelection={this.props.onSelect}>
          <TableHeader >
            <TableRow>
              <TableHeaderColumn style={{width: '12rem'}}>GL String</TableHeaderColumn>
              <TableHeaderColumn>Product Name</TableHeaderColumn>
              <TableHeaderColumn>Account Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {
              this.state.filteredData.map( x => {
                return ( 
                  <TableRow> 
                    <TableRowColumn style={{width: '12rem'}}>{x.glstring}</TableRowColumn>
                    <TableRowColumn>{x.prod}</TableRowColumn>
                    <TableRowColumn>{x.acct}</TableRowColumn>
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
  				placeholder="Search by Product Name or Account Name" 
  				value={this.props.query} 
  				onChange={this.doSearch}/>
	}
}

export default GLList;