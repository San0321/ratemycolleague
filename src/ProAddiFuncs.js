handleAddInvitation(){
	this.props.addInvitation(this.props.Current, this.props.searched[0].Name);
}

handleSendMessage(){
	let userMessage = prompt("Enter a message");
	this.props.replyMessage(this.props.Current, this.props.searched[0].Name, userMessage);
}