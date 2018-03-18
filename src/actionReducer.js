export function AcceptEval(to, review){
	return {
		type: "acceptEval",
        to: to,
        review: review
	};
}

export function DeclineEval(to, review){
	return {
		type: "declineEval",
        to: to,
        review: review
	};
}

export function AddEvaluation(to, in_review){
	return {
		type: "addEvaluation",
		to: to,
		in_review: in_review
	};
}

export function ReplyMessage(from, to, message){
	return {
		type: "replyMessage",
		to: to,
		from: from,
		message: message
	};
}

export function DeleteMessage(from, to, message){
	return {
		type: "deleteMessage",
		to: to,
		from: from,
		message: message
	};
}

export function AcceptInvitation(from, to){
	return {
		type: "acceptInvitation",
		to: to,
		from: from
	};
}

export function DeclineInvitation(from, to){
	return {
		type: "declineInvitation",
		to: to,
		from: from
	};
}

export function DeleteMember(from, to){
	return {
		type: "deleteMember",
		to: to,
		from: from
	};
}

export function signUps(newObject){
	return {
		type: "SignUps",
        newObject: newObject
	};
}

export function loggedIn(username){
	return {
		type: "LoggedIn",
        username: username
	};
}

export function searching(value){
	return {
		type: "Searching",
        value: value
	};
}

export function logOut(){
	return {
		type: "LogOut"
	};
}























