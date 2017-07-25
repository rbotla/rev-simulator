import React, {Component} from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#F3294D",
    accent1Color: "#F42A4D",
    pickerHeaderColor: "#8400D9",
    alternateTextColor: Colors.White
  },
}); 

const styles = {
  progresstext: {
    position: 'absolute',
    top: '15px',
    left: '10px',
    fontSize: "10px",
    display: "block",
    marginTop: "-.25em"
  }
}

const ViewKeyResultsList = (props) => {
  const keyresults = props.keyresults;
  console.log('keyresults: ', keyresults);
	return(
    <MuiThemeProvider muiTheme={muiTheme}>
	    <List>
		  	{
					keyresults.map ( (item, key) => {
						return (
							<KeyResultItem key={key} keyResult={item} />
						)
					})
		  	}
	    </List>
    </MuiThemeProvider>
  )
}

const KeyResultItem = (props) => {
  const progress = Math.round(props.keyResult.actual * 100 / props.keyResult.target);
	return (
		<div>
        <ListItem
          primaryText={props.keyResult.name}
          secondaryText={
            props.keyResult.quarter + " | Owner: " + props.keyResult.owner.name  + " | Completed " + props.keyResult.actual + " of " + props.keyResult.target + " " + props.keyResult.units.value
          }
          secondaryTextLines={1}
          leftAvatar={
            <div>
              <CircularProgress
                color="#F3294D" 
                mode="determinate"
                value={progress}
              />
              <span style={styles.progresstext}>{progress}%</span>
              </div>
          }
        />
        <Divider inset={false} />
    </div>
	);
}

export default ViewKeyResultsList;
