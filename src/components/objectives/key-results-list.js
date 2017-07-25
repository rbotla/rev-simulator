import React, {Component} from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#F3294D",
    accent1Color: "#F42A4D",
    pickerHeaderColor: "#8400D9",
    alternateTextColor: Colors.White
  },
}); 


const KeyResultsList = (props) => {
  const keyresults = props.keyresults;
  console.log(keyresults);
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
	return (
		<div>
        <ListItem
          primaryText={props.keyResult.name}
		      leftAvatar={
		        <Avatar src="/person-avatar.png" />
		      }
        />
        <Divider inset={false} />
    </div>
	);
}

export default KeyResultsList;
