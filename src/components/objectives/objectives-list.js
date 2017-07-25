import React, {Component} from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: Colors.Grey,
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.darkBlack
  }
});

const styles = {
	progresstext: {
		position: 'absolute',
		top: '15px',
		left: '10px',
		fontSize: "10px",
    display: "block",
    marginTop: "-.25em"
	},
	subheader: {
		fontSize: "18px",
		fontWeight: "700"
	}
}

const ObjectivesList = (props) => {
  const objectives = props.objectives;
  console.log(props);
	return(
		<MuiThemeProvider muiTheme={muiTheme}>
				<div>
			    <Subheader style={styles.subheader}>{props.title}</Subheader>
		    <List>
			  	{
			  		(objectives ? 
			  			(
								objectives.map ( (item, key) => {
									return (
										<MyObjectivesListItem key={item._id} objective={item} progress={item.progress} />
									)
								})
							): (
								<div> No objectives found! </div> 
							)
						)
			  	}
		    </List>
			</div>
		</MuiThemeProvider>
  )
}

const MyObjectivesListItem = (props) => {
	const objective = props.objective; 
console.log(objective);
	const url = '/objectives/'+objective._id;
	return (
		<div>
        <ListItem
          primaryText={objective.name}
          href={url}
		      leftAvatar={
		      	<div>
			        <CircularProgress
			        	color="#F3294D" 
			          mode="determinate"
			          value={props.progress}
			        />
			        <span style={styles.progresstext}>{props.progress}%</span>
			        </div>
		      }
        />
        <Divider inset={false} />
    </div>
	);
}

export default ObjectivesList;
