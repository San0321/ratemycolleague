import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import ProfileRendered  from './ProfileRendered';
import {connect} from "react-redux";

export class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    	myName: this.props.app.Current,
    	myDescription: this.props.app.myDescription,
    	myPosition: this.props.app.myPosition,
    	showGroup: false,
    	showMessage: false,
    	showInvitation: false,
    	messageList: [],
    	groupMember: [],
    	invitationList: []
	};

	if(this.props.app.Invitation) 
	{
		for(let i=0; i < this.props.app.Invitation.length; ++i)
		{
			if(this.props.app.Invitation[i].To === this.state.myName)
			{
				this.state.invitationList.push(this.props.app.Invitation[i]);
			}
		}
	}

	if(this.props.app.Message) 
	{
		for(let i=0; i < this.props.app.Message.length; ++i)
		{
			if(this.props.app.Message[i].To === this.state.myName)
			{
				this.state.messageList.push(this.props.app.Message[i]);
			}
		}
	}

	if(this.props.app.UserData) 
	{
		for(let i=0; i < this.props.app.UserData.length; ++i)
		{
			if(this.props.app.UserData[i].Name === this.state.myName)
			{
				for(let j=0; j < this.props.app.UserData[i].Member.length; ++j)
				{
					this.state.groupMember.push(this.props.app.UserData[i].Member[j]);
				}
				break;
			}
		}
	}

	
    this.myMessage = this.myMessage.bind(this);
    this.myInvitation = this.myInvitation.bind(this);
    this.myGroup = this.myGroup.bind(this);
    this.toggleShowMessage = this.toggleShowMessage.bind(this);
    this.toggleShowInvitation = this.toggleShowInvitation.bind(this);
    this.toggleShowGroup = this.toggleShowGroup.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handleDeleteMember = this.handleDeleteMember.bind(this);
  }
	
	myMessage(){
  		if(this.state.showGroup)
  		{
  			this.state.showGroup = false;
  		}

  		if(this.state.showInvitation)
  		{
  			this.state.showInvitation = false;
  		}

  		if(this.state.messageList.length < 1)
  		{
  	    	alert("No messages!");
  		}
  		else
  		{
        	this.setState({showMessage: true});
  		}
  	}

	myInvitation(){
  		if(this.state.showGroup)
  		{
  			this.state.showGroup = false;
  		}

  		if(this.state.showMessage)
  		{
  			this.state.showGroup = false;
  		}

  		if(this.state.invitationList.length < 1)
  		{
  	    	alert("No invitations!");
  		}
  		else
  		{
        	this.setState({showInvitation: true});
  		}
  	}

  	myGroup(){
  		if(this.state.showInvitation)
  		{
  			this.state.showGroup = false;
  		}

  		if(this.state.showMessage)
  		{
  			this.state.showGroup = false;
  		}

  		if(this.state.groupMember.length < 1)
  		{
  	    	alert("No groups!");
  		}
  		else
  		{
        	this.setState({showGroup: true});
  		}
  	}

	toggleShowMessage(){
  		this.setState({showMessage: false});
  	}

  	toggleShowInvitation(){
  		this.setState({showInvitation: false});
  	}

  	toggleShowGroup(){
  		this.setState({showGroup: false});
  	}

  	handleReply(e){
  		let userMessage = prompt("Enter a message");
  		let input = e.target.name.split("@");
  		this.props.replyMessage(input[1], input[0], userMessage);
  	}

  	handleDelete(e){
  		let input = e.target.name.split("@");
  		let intIndex = parseInt(input[3]);
  		this.props.deleteMessage(input[0], input[1], input[2]);
  		this.state.messageList.splice(intIndex, 1);
  		this.setState({messageList: this.state.messageList});
  	}

  	handleAccept(e){
  		let exist = false;
  		let input = e.target.name.split("@");
  		let intIndex = parseInt(input[2]);
  		this.props.acceptInvitation(input[0], input[1]);

  		for(let i=0; i < this.state.groupMember.length; ++i)
  		{
  			if(this.state.groupMember[i] === input[0])
  			{
  				exist = true;
  			}
    	}
    	this.state.invitationList.splice(intIndex, 1);
    	if(!exist)
    	{
  			this.setState({invitationList: this.state.invitationList,
  							groupMember: this.state.groupMember.push(input[0])});
    	}
    	else
    	{
    		this.setState({invitationList: this.state.invitationList});
    	}
  	}

  	handleDecline(e){
  		let input = e.target.name.split("@");
  		let intIndex = parseInt(input[2]);
  		this.props.declineInvitation(input[0], input[1]);
  		this.state.invitationList.splice(intIndex, 1);
  		this.setState({invitationList: this.state.invitationList});
  	}

	handleDeleteMember(e){
  		let input = e.target.name.split("@");
  		let intIndex = parseInt(input[1]);
  		this.props.deleteMember(this.state.myName, input[0]);
  		this.state.groupMember.splice(intIndex, 1);
  		this.setState({groupMember: this.state.groupMember});
  	}
	render(){
  		if(this.state.showMessage)
  		{
  	  	return (
  	  		<div>
  	  		<ProfileRendered history={this.props.history} myMessage={this.myMessage} myInvitation={this.myInvitation} myGroup={this.myGroup}/>
  	  		<ul>
  	  	{
  	  		this.state.messageList.map((item, index) => {
  	  			let m_message = item.From + ": " + item.Content;
  	  			let stringIndex = index.toString();
  	  			let inputString = item.From + "@" + item.To + "@" + item.Content + "@" + stringIndex;
  	  			let inputString2 = item.From + "@" + item.To;
  	  			return (
  	  				<li>{m_message} <button name={inputString} onClick={this.handleDelete}>Delete</button> <button name={inputString2} onClick={this.handleReply}>Reply</button> </li>
  	  			);
  	  		})
  	  	}
  	  	</ul>
  	  	<button onClick={this.toggleShowMessage}>Close</button>
  	  	</div>
  	  );  	
  	}

  	if(this.state.showInvitation)
  	{
  		return (
  			<div>
  			<ProfileRendered history={this.props.history} myMessage={this.myMessage} myInvitation={this.myInvitation} myGroup={this.myGroup} myName={this.state.myName} myPosition={this.state.myPosition} myDescription={this.state.myDescription}/>
  			<ul>
  			{
  				this.state.invitationList.map((item, index) => {
  					let stringIndex = index.toString();
  					let inputString = item.From + "@" + item.To + "@" + stringIndex;
  					return (<li>{item.From + " invites you!"} <button name={inputString} onClick={this.handleAccept}>Accept</button><button name={inputString} onClick={this.handleDecline}>Decline</button></li>);
  				})
  			}
  			</ul>
  			<button onClick={this.toggleShowInvitation}>Close</button>
  			</div>
  		);
  	}

  	if(this.state.showGroup)
  	{
  		return (
  			<div>
  			<ProfileRendered myMessage={this.myMessage} myInvitation={this.myInvitation} myGroup={this.myGroup} myName={this.state.myName} myPosition={this.state.myPosition} myDescription={this.state.myDescription}/>
  			<ul>
  			{
  				this.state.groupMember.map((item, index) => {
  					let stringIndex = index.toString();
  					let inputString = item + "@" + stringIndex;
  					return (<li>{item} <button name={inputString} onClick={this.handleDeleteMember}>Delete</button> </li>);
  				})
  			}
  			</ul>
  			<button onClick={this.toggleShowGroup}>Close</button>
  			</div>
  		);
  	}

  	return (
  		<ProfileRendered myMessage={this.myMessage} myInvitation={this.myInvitation} myGroup={this.myGroup} myName={this.state.myName} myPosition={this.state.myPosition} myDescription={this.state.myDescription} {...this.props}/>
  	);
  }
}


const mapStateToProps = (state) => {
	return {
		app: state.appReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addEvaluation: (to, in_review) => {
			dispatch({
				type: "addEvaluation",
				to: to,
				in_review: in_review
			});
		},
		replyMessage: (from, to, message) => {
			dispatch({
				type: "replyMessage",
				to: to,
				from: from,
				message: message
			});
		},
		deleteMessage: (from, to, message) => {
			dispatch({
				type: "deleteMessage",
				to: to,
				from: from,
				message: message
			});
		},
		acceptInvitation: (from, to) => {
			dispatch({
				type: "acceptInvitation",
				to: to,
				from: from,
			});
		},
		declineInvitation: (from, to) => {
			dispatch({
				type: "declineInvitation",
				to: to,
				from: from,
			});
		},
		addInvitation: (from, to) => {
			dispatch({
				type: "addInvitation",
				to: to,
				from: from
			});
		},
		deleteMember: (from, to) => {
			dispatch({
				type: "deleteMember",
				to: to,
				from: from
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);



















