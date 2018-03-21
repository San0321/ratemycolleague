import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import ProfileRendered  from './ProfileRendered';
import {connect} from "react-redux";
import "./profile.css";
import { AcceptEval, DeclineEval, AddEvaluation, AddInvitation, ReplyMessage, DeleteMessage, AcceptInvitation, DeclineInvitation, DeleteMember, signUps, loggedIn, searching, logOut } from "./actionReducer";

export class Profile extends React.Component{
  constructor(props) {
    super(props);
    let description = "";
    for(let a = 0; a < this.props.app.UserData.length; a++) {
      if(this.props.app.UserData[a].Name === this.props.app.Current) {
        description = this.props.app.UserData[a].Description;
      }
    }
    this.state = {
    	myName: this.props.app.Current,
    	myDescription: description,
    	myPosition: this.props.app.myPosition,
    	showGroup: false,
    	showMessage: false,
    	showInvitation: false,
      showEvaluation: false,
    	messageList: [],
    	groupMember: [],
    	invitationList: [],
      index: 0
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
    debugger;
		for(let i=0; i < this.props.app.UserData.length; ++i)
		{
			if(this.props.app.UserData[i].Name === this.state.myName)
			{
        this.state.index = i;
				for(let j=0; j < this.props.app.UserData[i].Member.length; ++j)
				{
					this.state.groupMember.push(this.props.app.UserData[i].Member[j]);
				}
				break;
			}
		}
	}

	  this.myEvaluation = this.myEvaluation.bind(this);
    this.myMessage = this.myMessage.bind(this);
    this.myInvitation = this.myInvitation.bind(this);
    this.myGroup = this.myGroup.bind(this);
    this.toggleShowEvaluation = this.toggleShowEvaluation.bind(this);
    this.toggleShowMessage = this.toggleShowMessage.bind(this);
    this.toggleShowInvitation = this.toggleShowInvitation.bind(this);
    this.toggleShowGroup = this.toggleShowGroup.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handleDeleteMember = this.handleDeleteMember.bind(this);
    this.handleDeclineEval = this.handleDeclineEval.bind(this);
    this.handleAcceptEval = this.handleAcceptEval.bind(this);
  }
	
	myMessage(){

      if(this.state.showEvaluation)
      {
        this.state.showEvaluation = false;
      }

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
      if(this.state.showEvaluation)
      {
        this.state.showEvaluation = false;
      }

  		if(this.state.showGroup)
  		{
  			this.state.showGroup = false;
  		}

  		if(this.state.showMessage)
  		{
  			this.state.showMessage = false;
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
      if(this.state.showEvaluation)
      {
        this.state.showEvaluation = false;
      }

  		if(this.state.showInvitation)
  		{
  			this.state.showInvitation = false;
  		}

  		if(this.state.showMessage)
  		{
  			this.state.showMessage = false;
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

    myEvaluation(){
          debugger;
      if(this.state.showInvitation)
      {
        this.state.showInvitation = false;
      }

      if(this.state.showMessage)
      {
        this.state.showMessage = false;
      }

      if(this.state.showGroup)
      {
        this.state.showGroup = false;
      }

      if(this.props.app.UserData[this.state.index].Position !== "Professor")
      {
        alert("You do not have the right!");
        this.setState({showEvaluation: false});
      }
      else
      {
        this.setState({showEvaluation: true});
      }
    }    

    toggleShowEvaluation(){
      this.setState({showEvaluation: false});
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
      debugger;
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
        this.state.groupMember = this.state.groupMember.push(input[0]);
        this.render();
/*
  			this.setState({invitationList: this.state.invitationList,
  							groupMember: this.state.groupMember.push(input[0])});
                */
    	}
    	else
    	{
    		this.setState({invitationList: this.state.invitationList});
    	}
      debugger;
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

    handleDeclineEval(e){
      let input = e.target.name.split("@");
      this.props.declineEval(input[0], input[1]);
      this.setState(this.state);
    }

    handleAcceptEval(e){
      let input = e.target.name.split("@");
      this.props.acceptEval(input[0], input[1]);
      this.setState(this.state);
    }

	  render(){
      debugger;
      if(this.state.showEvaluation)
      {
        return (
          <div>
          <ProfileRendered history={this.props.history} myMessage={this.myMessage} myName = {this.state.myName} myDescription={this.state.myDescription} myInvitation={this.myInvitation} myGroup={this.myGroup} myEvaluation={this.myEvaluation}/>
          <ul>
          {
            this.props.app.UserData[this.state.index].Evaluation.map((item, index) => {
              let m_message = "To " + item.to + ": " + item.review;
              let inputString = item.to + "@" + item.review;
              return (
                <div className="messages">
                <ul>{m_message} <button name={inputString} onClick={this.handleDeclineEval}>Decline</button> <button name={inputString} onClick={this.handleAcceptEval}>Accept</button> </ul>
                </div>
              );
            })
          }
          </ul>
          <button className="closeButton" onClick={this.toggleShowEvaluation}>Close</button>
          </div>
        );
      }

  		if(this.state.showMessage)
  		{
  	  	return (
  	  		<div>
  	  		<ProfileRendered myDescription={this.state.myDescription} history={this.props.history} myName = {this.state.myName} myMessage={this.myMessage} myInvitation={this.myInvitation} myGroup={this.myGroup} myEvaluation={this.myEvaluation}/>
  	  		<ul>
  	  	  {
  	  		  this.state.messageList.map((item, index) => {
  	  			  let m_message = item.From + ": " + item.Content;
  	  			  let stringIndex = index.toString();
  	  			  let inputString = item.From + "@" + item.To + "@" + item.Content + "@" + stringIndex;
  	  			  let inputString2 = item.From + "@" + item.To;
  	  			  return (
                <div className="messages">
  	  				  <ul>{m_message} <button name={inputString} onClick={this.handleDelete}>Delete</button> <button name={inputString2} onClick={this.handleReply}>Reply</button> </ul>
                </div>
  	  			  );
  	  		  })
  	  	  }
  	  	</ul>
  	  	<button className="closeButton" onClick={this.toggleShowMessage}>Close</button>
  	  	</div>
  	  );  	
  	}

  	if(this.state.showInvitation)
  	{
  		return (
  			<div>
  			<ProfileRendered history={this.props.history} myMessage={this.myMessage} myInvitation={this.myInvitation} myGroup={this.myGroup} myName={this.state.myName} myPosition={this.state.myPosition} myDescription={this.state.myDescription} myEvaluation={this.myEvaluation}/>
  			<ul>
  			{
  				this.state.invitationList.map((item, index) => {
  					let stringIndex = index.toString();
  					let inputString = item.From + "@" + item.To + "@" + stringIndex;
  					return (
              <div className="messages">
              <ul>{item.From + " invites you!"} <button name={inputString} onClick={this.handleAccept}>Accept</button><button name={inputString} onClick={this.handleDecline}>Decline</button></ul>

  				    </div>
              );
          })
  			}
  			</ul>
  			<button className="closeButton" onClick={this.toggleShowInvitation}>Close</button>
  			</div>
  		);
  	}

  	if(this.state.showGroup)
  	{
  		return (
  			<div>
  			<ProfileRendered myMessage={this.myMessage} myInvitation={this.myInvitation} myGroup={this.myGroup} myName={this.state.myName} myPosition={this.state.myPosition} myDescription={this.state.myDescription} myEvaluation={this.myEvaluation}/>
  			<ul>
        {
           this.props.app.UserData[this.state.index].Member.map((item, index) => {
                    let stringIndex = index.toString();
                    let inputString = item + "@" + stringIndex;
                    return (
                      <div className="messages">
                      <ul>{item} <button name={inputString} onClick={this.handleDeleteMember}>Delete</button> </ul>
                      </div>);
                })
          } 
  			}
  			</ul>
  			<button className="closeButton" onClick={this.toggleShowGroup}>Close</button>
  			</div>
  		);
  	}

  	return (
  		<ProfileRendered myMessage={this.myMessage} myInvitation={this.myInvitation} myGroup={this.myGroup} myName={this.state.myName} myPosition={this.state.myPosition} myDescription={this.state.myDescription} myEvaluation={this.myEvaluation} {...this.props}/>
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
    acceptEval: (to, review) => {
      dispatch(AcceptEval(to, review));
    },

    declineEval: (to, review) => {
      dispatch(DeclineEval(to, review));
    },

		addEvaluation: (to, in_review) => {
			dispatch(AddEvaluation(to, in_review));
		},

		replyMessage: (from, to, message) => {
			dispatch(ReplyMessage(from, to, message));
		},

		deleteMessage: (from, to, message) => {
			dispatch(DeleteMessage(from, to, message));
		},

		acceptInvitation: (from, to) => {
			dispatch(AcceptInvitation(from, to));
		},

		declineInvitation: (from, to) => {
			dispatch(DeclineInvitation(from, to));
		},

		addInvitation: (from, to) => {
			dispatch(AddInvitation(from, to));
		},

		deleteMember: (from, to) => {
			dispatch(DeleteMember(from, to));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);



















