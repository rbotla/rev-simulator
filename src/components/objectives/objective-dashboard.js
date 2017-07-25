import React from 'react';
import ObjectiveProgressChart from '../charts/objective-progress-chart';
import { Grid, Row, Col } from 'react-flexbox-grid';

const ObjectiveDashboard = (props) => {
	return(
		<div>
			<br/>
			<Grid fluid>
				<Row>
					<Col md={6}>
						<ObjectiveProgressChart />
					</Col>
				</Row>
			</Grid>
		</div>
	);  
}

export default ObjectiveDashboard;