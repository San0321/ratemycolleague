replyMessage(from, to, message){
	this.state.Message.push(
		{
			From: from,
			To: to,
			Content: message
		}
	);
}

deleteMessage(from, to, message){
	for(let i=0; i < this.state.Message.length; ++i)
	{
		if(this.state.Message[i].From === from && this.state.Message[i].To === to && this.state.Message[i].Content === message)
		{
			this.state.Message.splice(i, 1);
			break;
		}
	}
}

acceptInvitation(from, to){
	let counter = 0;
	for(let i=0; i < this.state.UserData.length; ++i)
	{
		if(this.state.UserData[i].Name === from)
		{
			if(this.state.UserData[i].Member.indexOf(to)  == -1)
			{
				this.state.UserData[i].Member.push(to);
				++counter;
			}
		}
		else if(this.state.UserData[i].Name === to)
		{
			if(this.state.UserData[i].Member.indexOf(from)  == -1)
			{
				this.state.UserData[i].Member.push(from);
				++counter;
			}
		}
		else
		{
			//dummy
		}

		if(2 <= counter)
		{
			break;
		}
	}
}

declineInvitation(from, to){
	for(let i=0; i < this.state.Invitation.length; ++i)
	{
		if(this.state.Invitation.From === from && this.state.Invitation.To === to)
		{
			this.state.Invitation.splice(i, 1);
		}
	}
}

addInvitation(from, to){
	let exist = false;
	for(let i=0; i < this.state.Invitation.length; ++i)
	{
		if(this.state.Invitation[i].From === from && this.state.Invitation[i].To === to)
		{
			exist = true;
			break;
		}
	}

	if(!exist)
	{
		this.state.Invitation.push({From: from, To: to});
	}
}

deleteMember(from, to){
	for(let i=0; i < this.state.UserData.length; ++i)
	{
		if(this.state.UserData[i].Name === from)
		{
			if(this.state.UserData[i].Member.indexOf(to)  != -1)
			{
				this.state.UserData[i].Member.splice(this.state.UserData[i].Member.indexOf(to), 1);
			}
		}
		else if(this.state.UserData[i].Name === to)
		{
			if(this.state.UserData[i].Member.indexOf(from)  != -1)
			{
				this.state.UserData[i].Member.splice(this.state.UserData[i].Member.indexOf(from), 1);
			}
		}
		else
		{
			//dummy
		}
	}
}

<button onClick={this.loadAllData}>Profile</button>

loadAllData(currName){
	this.state.currInvitation = [];
	this.state.currMessage = [];
	this.state.currGroup = [];

	for(let i=0; i < this.state.Invitation.length; ++i)
	{
		if(this.state.Invitation[i].To === currName)
		{
			this.state.currInvitation.push(this.state.Invitation[i]);
		}
	}

	for(let i=0; i < this.state.Message.length; ++i)
	{
		if(this.state.Message[i].To === currName)
		{
			this.state.currMessage.push(this.state.Message[i]);
		}
	}

	for(let i=0; i < this.state.UserData.length; ++i)
	{
		if(this.state.UserData[i].Name === currName)
		{
			for(let j=0; j < this.state.UserData[i].Member.length; ++j)
			{
				this.state.currGroup.push(this.state.UserData[i].Member[j]);
			}
			break;
		}
	}
}



























