import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

const styles = {
	header: {
		background: "#010144",
		color: "white",
		fontSize: "20px",
		fontWeight: "120",
		height: "50px",
		vAlign: "center",
		marginBottom: "20px",
		padding: "5px"
	}	
}

const PageHeader = (props) => {
	console.log(props);
	return (
		<Grid fluid>
			<Row>
				<Col md={12} style={styles.header}>
					{props.name}
				</Col>
			</Row>
		</Grid>
	)
}

export default PageHeader;