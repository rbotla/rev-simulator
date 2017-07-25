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
	profilecontainer: {
		background: "#010144"
	},
	name: {
		fontSize: "18px",
		fontWeight: "400"
	}
};

const PageHeader = props => {
	const {title} = props;
	return(
		<div style={styles.profilecontainer}>
		<Grid fluid>
			<Row>
				<Col xs={12}>
					<div style={styles.profiletop}>
						<Row>
							<Col md={10}>
								<div className="profile-name">
									<br/>
									<span style={styles.name}>{title}</span>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</Grid>
		<br/>
		</div>
	);
}

export default PageHeader;
