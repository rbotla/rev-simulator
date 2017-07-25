import {reset} from 'redux-form';
import customAxios from '../../custom-axios';

export function getObjectivesCompleted (data) {
	return  {
		type: "GET_OBJECTIVES_COMPLETED",
		payload: data
	}
}
export function getAllParentObjectiveCompleted (data) {
	return  {
		type: "GET_ALL_PARENT_OBJECTIVES_COMPLETED",
		payload: data
	}
}

export function getChildObjectiveCompleted (data) {
	return  {
		type: "GET_CHILD_OBJECTIVES_COMPLETED",
		payload: data
	}
}

export function getObjectiveCompleted (data) {
	return  {
		type: "GET_OBJECTIVE_COMPLETED",
		payload: data
	}
}

export function saveObjectiveCompleted (data) {
	return  {
		type: "SAVE_OBJECTIVE_RETURNED",
		payload: data
	}
}

export function getKeyresultsCompleted (data) {
	return  {
		type: "GET_KEY_RESULTS_COMPLETED",
		payload: data
	}
}

export function getMyObjectivesCompleted (data) {
	return  {
		type: "GET_MY_OBJECTIVES_COMPLETED",
		payload: data
	}
}

export function onCheckinCancelClicked () {
	return  {
		type: "CHECKIN_DIALOG_CANCEL_REQUESTED",
		payload: {}
	}
}

export function onCheckinSubmitClicked () {
	return  {
		type: "CHECKIN_SUBMIT_REQUESTED",
		payload: {}
	}
}

export function onCheckinSubmitCompleted () {
	return  {
		type: "CHECKIN_SUBMIT_COMPLETED",
		payload: {}
	}
}

export function checkinClicked() {
	return  {
		type: "CHECKIN_DIALOG_OPEN_REQUESTED",
		payload: {}
	}	
}

// getObjectivesProgressByEmp
export function getMyObjectives(data) {
	return (dispatch) => {
		return customAxios('myobjectives?id='+data, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getMyObjectivesCompleted(data)))
	}
}

export function findObjectivesByName(data) {
	return (dispatch) => {
		return customAxios('objectives/filter?name='+data, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getObjectivesCompleted(data)))
	}
}

export function fetchCurrentEmployeeObjectives(eid) {
	return (dispatch) => {
		return customAxios('objectives/filter?eid='+eid, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getObjectivesCompleted(data)))
	}
}

export function fetchCurrentEmployeeKeyResults(eid) {
	return (dispatch) => {
		return customAxios('keyresults/filter?eid='+eid, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getKeyresultsCompleted(data)))
	}
}

export function saveKeyResultsCompleted (data) {
	return  {
		type: "SAVE_KEY_RESULT_RETURNED",
		payload: data
	}
}

export function checkin(data, empId) {
	let dArr = [];
	for (let [k, v] of Object.entries(data)) {
		dArr.push({id: k, actual: v});
	}
	const list = [...dArr];

	return (dispatch) => {
		return customAxios('keyresults/checkin', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
      	actual: list
      })
		})
		.then(() => fetchCurrentEmployeeObjectives(empId))
		.then(() => dispatch(onCheckinSubmitCompleted()))
		.catch(function(error) {
		  console.log('There has been a problem with your customAxios operation: ' + error.message);
		});
	}
}

export function saveNewObjective(data) {
	let tags = [];
	let pobjective = '';
	const description = data.description || '';
	if (data.tags) {
		tags = data.tags.map((x) => ({tid: '123', name: x.value}));
	}
	if (data.parent) {
		pobjective = data.parent._id; //{oid: data.parent._id};
	}
	return (dispatch) => {
		return customAxios('objectives', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
      	name: data.objective,
      	description: description,
      	pobjective: pobjective,
			  owner: {eid: data.owner._id, name: data.owner.name},
			  category: data.category,
			  contingency: data.contingency,
			  progress: 0,
			  tags: tags
      })
		})
		.then((res) => res.data)
		.then((data) => dispatch(saveObjectiveCompleted(data)))
	}
}

export function saveNewKeyResult(objectiveId, data) {
	return (dispatch) => {
		return customAxios('objectives/'+objectiveId+'/keyresults', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
      	name: data.keyresult,
      	owner: {eid: data.owner._id, name: data.owner.name},
      	quarter: data.quarter,
      	target: data.target,
      	actual: 0,
      	progress: 0,
      	units: {uid: data.units._id, value: data.units.value}
      })
		})
		.then((res) => res.data)
		.then((newData) => dispatch(saveKeyResultsCompleted(newData)))
		.then(() => dispatch(reset('keyresultform')))
	}
}

export function getObjectiveDetails (id) {
	return (dispatch) => {
		return customAxios('objectives/'+id, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getObjectiveCompleted(data)))
	}
}

export function getChildObjectives (id) {
	return (dispatch) => {
		return customAxios('childobjectives?id='+id, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getChildObjectiveCompleted(data)))
	}
}

export function getAllParentObjectives(id) {
	console.log('called getAllParentObjectives: ', id);
	return (dispatch) => {
		return customAxios('objectives/getAllParentObjectives?id='+id, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getAllParentObjectiveCompleted(data)))
	}
}
