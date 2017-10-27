import {reset} from 'redux-form';
import customAxios from '../../custom-axios';

export function saveAgreementCompleted (data) {
	return  {
		type: "SAVE_AGMNT_COMPLETED",
		payload: data
	}
}

export function saveNewAgreement(data) {
	return (dispatch) => {
		return customAxios('agreement', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
				id: "1234", customerName: "ESIS, Inc.", accountId: "0016000000rEei5AAC", documentTitle: "Emdeon Claims Payment and Communication Services Schedule", agreementType: "Schedule", agreementName: "ACE INA Holdings Inc.Payer.CID 153362.pdf", parentAgreementId: "", startDate: "2014-04-10", endDate: "2018-04-09", contractTerm: 36, autoRenew: "Yes", noticePeriod: 45, contractRenewalTerm: 12, contractRenewalLimit: 999, agreementLineIds: [ String ] 	
      })
		})
		.then((res) => res.data)
		.then((data) => dispatch(saveAgreementCompleted(data)))
	}
}
