export default ( state = initialState, { type, payload } ) => {
  switch (type) {
    case "SAVE_AGMNT_COMPLETED":
      return {currentAgreement: payload};
  	default: 
  		return state;
  }
};

const initialState = [];