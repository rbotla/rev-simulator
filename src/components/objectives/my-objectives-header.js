import React from 'react';
import Avatar from 'material-ui/Avatar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	profiletop: {
		background: "#010144",
		color: "white",
	},
	profilepic: {
		position: 'absolute',
    top: '100px',
    left: '90px',
    width: '200px',
    height: '100px'
	},
	profilecontainer: {
		background: "#010144"
	},
	avatar: {
		margin: 5
	},	
	name: {
		fontSize: "24px",
		fontWeight: "700"
	}
};

const MyObjectivesHeader = props => {
	const {name, avatar, title, group} = props;
	return(
		<div style={styles.profilecontainer}>
		<br/><br/>
		<Grid fluid>
			<Row>
				<Col xs={12}>
					<div style={styles.profiletop}>
						<Row>
							<Col md={2}>
							</Col>
							<Col md={10}>
								<div className="profile-name">
									<br/>
									<span style={styles.name}>{name}</span>
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={2}></Col>
							<Col md={6}>
								<div className="profile-title">
									{title} &nbsp;&nbsp;{(group?"|":"")}&nbsp;&nbsp;{group}
								</div>
							</Col>
							<Col md={4}>
								<div className="view-org-link">
			      					<MuiThemeProvider muiTheme={getMuiTheme()}>
    									<FlatButton label="View Org" primary={true} href="/org"/>
									</ MuiThemeProvider>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<div style={styles.profilepic}>
			      <MuiThemeProvider muiTheme={getMuiTheme()}>
			      	{
			      		(avatar ? 
					        (
					        	<Avatar
						          src={avatar}
						          size={120}
						          style={styles.avatar}
					        	/>
					        ) : (
						        <Avatar
						          src="person-avatar.png"
						          size={120}
						          style={styles.avatar}
						        />
					        )
			      		)
			      	}
			      </MuiThemeProvider>
					</div>
				</Col>
			</Row>
		</Grid>
		</div>
	);
}

export default MyObjectivesHeader;
