import React from 'react';

const style = {
	header: {
    borderBottomColor: 'black',
    borderBottomStyle: 'double',
    padding: '6px',
    backgroundColor: '#C0C0C0',
    marginLeft: '10px',
    marginRight: '10px',
    color: 'black',
    borderTopRightRadius: '2em', 
    fontSize: 'medium'
	}
}

const Banner = ({title}) => (
	<div style={style.header}>{title}</div>
)

export default Banner;
