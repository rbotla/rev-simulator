import React, {Component} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';

let SelectableList = makeSelectable(List);

class ProductShuffle extends Component {
	constructor(props) {
		super(props);
		this.state = {
      query: '',
      filteredData: props.data,
      selectedIndex: undefined,
      filteredSelectedData: []
    }
    this.doSearch = this.doSearch.bind(this);
	}

  doSearch(queryText){
    console.log(queryText)
    var queryResult=[];
    this.props.data.forEach(function(item){
        if(item.name.toLowerCase().indexOf(queryText.toLowerCase())!=-1)
        queryResult.push(item);
    });

    this.setState({
      query:queryText,
      filteredData: queryResult
    })
  }

  handleRequestChange = (event, index) => {
    this.setState({
      selectedIndex: index,
    });
    this.state.filteredSelectedData.push(this.props.data[index])
    //this.props.onSelect(this.props.data[index]);
  };

  renderProductResults() {
    if (this.state.filteredData) {
      return (
				<div style={{overflowY: 'auto', height: '400px', borderBottomStyle: 'none'}}>
			    <SelectableList 
            value={this.state.selectedIndex}
            onChange={this.handleRequestChange}
          >
			      {
			      	this.state.filteredData.map((x, key) => (
					      <ListItem
					        value={key}
					        primaryText={x.name}
					        leftAvatar={<Avatar>{x.name.charAt(0)}</Avatar>}
					      />
			      	))
			      }
			    </SelectableList>
			  </div>
      );
    }
  }

  renderSelectedProductResults() {
    if (this.state.filteredSelectedData) {
      return (
        <div style={{overflowY: 'auto', height: '400px', borderBottomStyle: 'none'}}>
          <SelectableList 
            value={this.state.selectedIndex}
            onChange={this.handleRequestChange}
          >
            {
              this.state.filteredSelectedData.map((x, key) => (
                <ListItem
                  value={key}
                  primaryText={x.name}
                  leftAvatar={<Avatar>{x.name.charAt(0)}</Avatar>}
                />
              ))
            }
          </SelectableList>
        </div>
      );
    }
  }

  handleSelectProduct() {
    console.log( this.state.data[ this.state.selectedIndex ] );
  }

	render () {
	  return (
      <Grid>
      <Row>
        <Col md={3}>
          <div className="InstantBox">
              <ProductSearchBox query={this.state.query} doSearch={this.doSearch}/>
              {this.renderProductResults()}
          </div>
        </Col>
        <Col md={1}>
          &nbsp;
        </Col>
        <Col md={3}>
          <div>Selected Products</div>
          <hr />
          {this.renderSelectedProductResults()}
        </Col>
      </Row>
      </Grid>
	  );
	}
}

class ProductSearchBox extends Component {
	constructor (props) {
		super(props);
		this.doSearch = this.doSearch.bind(this);
	}
  doSearch(){
      var query=this.refs.searchInput.value; // this is the search text
      this.props.doSearch(query);
  }
  render () {
  	return <input className="searchbar-edit" 
  				style={{width: '100%', height:'30px', fontSize: '14px', paddingLeft: '4px'}} 
  				type="text" ref="searchInput" 
  				placeholder="Search Product" 
  				value={this.props.query} 
  				onChange={this.doSearch}/>
	}
}

class SelectedProducts extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>select</div>
    )
  }
}

export default ProductShuffle;