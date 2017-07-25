const initialState = {
  checkin_open_flag: false, 
  checkin_submitted_flag: false,
  checkin_close_flag: true
};

export default ( state = initialState, { type, payload } ) => {
  switch (type) {
    case "SAVE_OBJECTIVE_RETURNED":
      return {currentObjective: payload};
  	default: 
  		return state;
  }
};
