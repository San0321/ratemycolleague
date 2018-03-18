export function AcceptEval(to, review){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "acceptEval",
        		to: to,
        		review: review
			});
		}, 2000);
	}
}

export function DeclineEval(to, review){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "declineEval",
        		to: to,
        		review: review
			});
		}, 2000);
	}
}

export function AddEvaluation(to, in_review){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "addEvaluation",
        		to: to,
        		in_review: in_review
			});
		}, 2000);
	}
}

export function ReplyMessage(from, to, message){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "replyMessage",
        		from: from,
        		message: message
			});
		}, 2000);
	}
}

export function DeleteMessage(from, to, message){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "deleteMessage",
        		from: from,
        		to: to,
        		message: message
			});
		}, 2000);
	}
}

export function AcceptInvitation(from, to){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "acceptInvitation",
        		from: from,
        		to: to
			});
		}, 2000);
	}
}

export function DeclineInvitation(from, to){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "declineInvitation",
        		from: from,
        		to: to
			});
		}, 2000);
	}
}

export function DeleteMember(from, to){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "deleteMember",
        		from: from,
        		to: to
			});
		}, 2000);
	}
}

export function signUps(newObject){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "SignUps",
        		newObject: newObject
			});
		}, 2000);
	}
}

export function loggedIn(username){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "LoggedIn",
        		username: username
			});
		}, 2000);
	}
}

export function searching(value){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "Searching",
        		value: value
			});
		}, 2000);
	}
}

export function logOut(){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "LogOut"
			});
		}, 2000);
	}
}























