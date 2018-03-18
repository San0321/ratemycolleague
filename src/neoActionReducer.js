export function AcceptEval(to, review){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "acceptEval",
        		to: to,
        		review: review
			});
		}, 0);
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
		}, 0);
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
		}, 2);
	}
}

export function AddInvitation(from, to){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "addInvitation",
        		to: to,
        		from: from
			});
		}, 0);
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
		}, 0);
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
		}, 0);
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
		}, 0);
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
		}, 0);
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
		}, 0);
	}
}

export function signUps(newObject){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "SignUps",
        		newObject: newObject
			});
		}, 0);
	}
}

export function loggedIn(username){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "LoggedIn",
        		username: username
			});
		}, 0);
	}
}

export function searching(value){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "Searching",
        		value: value
			});
		}, 0);
	}
}

export function logOut(){
	return dispatch => { 
		setTimeout(() => {
			dispatch({
				type: "LogOut"
			});
		}, 0);
	}
}






















