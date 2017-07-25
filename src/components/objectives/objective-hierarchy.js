import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const styles = {
	objectiveText: {
		borderStyle: 'solid',
		borderWidth: 'thin',
		fontFamily: 'Roboto, sans-serif',
		borderColor: '#E0E0E0',
		borderRadius: '5px',
		paddingLeft: '3px',
		paddingRight: '3px',
		paddingTop: '5px',
		paddingBottom: '5px',
		margin: '3px',
		minHeight: '30px',
		cursor: 'pointer'
	},
	objHeader: {
		height: '30px',
    backgroundColor: '#9BA1A9',
    marginTop: '15px',
    paddingTop: '15px',
    paddingLeft: '15px',
    fontSize: 'medium',
    color: 'white'
	},
	objBody: {
		overflowY: 'scroll',
    borderStyle: 'solid',
    borderBottomStyle: 'none',
    borderColor: '#9BA1A9',
    borderWidth: 'thin',
    padding: '10px',
    fontSize: 'small',
    overflowY: 'auto'
	}
}

const ObjectiveHierarchy = (props) => {
	if (!props.parents || props.parents.length <= 1) return null;
	const list = [...props.parents];
	const parents = list.reverse();
	return (
		<div>
		<div style={styles.objHeader}>Parent objectives</div> 
		<div style={styles.objBody}>
		{			
			parents.map( (parent, i) =>  {
				return (
					<div key={'parent_'+i}>
					{
						(i != 0) ?
							<div> <FontIcon className="material-icons">expand_more</FontIcon> </div>
							: null
					}
					<ObjectiveCard obj={parent}/>
					</div>
				)
			})
		}
		</div>
		</div>
	)
}

const ObjectiveCard = ({obj}) => {
	return (
		<a href={`/objectives/${obj._id}`} style={{textDecoration: 'none'}}>
			<div style={styles.objectiveText} >[{obj.owner.name}]: {obj.name}</div>
		</a>
	)
}

export default ObjectiveHierarchy;