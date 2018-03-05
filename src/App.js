import React, { Component } from 'react';

import Homepage from './Homepage.js';
import Searched from './Searched.js';
import Profile from './Profile.js';

import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
//import createBrowserHistory from 'history/createBrowserHistory'

class App extends Component {
  constructor() {
    super();
    this.state = {
      Invitation: [{
        From: "A",
        To: "Rick"
      }],
      Message: [{
        From: "Morty",
        To: "Rick",
        Content: "Hello World"
      }],
      UserData: [{
        Name: "Rick",
        Id: "dorat",
        Password: "1234",
        Description: "Hi, my name is Rick. I have experience on web front-end development. I have used React.js and CSS to develop some websites.",
        Position: "",
        Endorsement: "",
        Evaluation: [],
        Picture: "profile.png",
        Skill: ["React.js", "CSS"],
        Member: [],
        Email: "rick@ucsd.edu"
      },
      {
        Name: "Morty",
        Id: "something",
        Password: "1234",
        Description: "Hi, my name is Morty. I have experience on web back-end development. I have used Node.js and PHP to develop some websites.",
        Position: "",
        Evaluation: [],
        Endorsement: "",
        Picture: "",
        Skill: ["PHP", "Node.js"],
        Class: [],
        Email: "morty@ucsd.edu",
        Member: []
      },
      {
        Name: "Rick and Morty",
        Id: "rickmorty",
        Password: "1234",
        Description: "Hi, my name is Rick and Morty. I have experience on web back-end development. I have used Node.js and PHP to develop some websites.",
        Position: "",
        Endorsement: "",
        Evaluation: [],
        Picture: "RM_profile.png",
        Skill: ["PHP", "Node.js"],
        Class: [],
        Email: "morty@ucsd.edu",
        Member: []
      }],
      Current: null, // Name
      Search:"",
      SearchItem:"",
      Searched: [],
       
    };
    this.replyMessage = this.replyMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.declineInvitation = this.declineInvitation.bind(this);
    this.addInvitation = this.addInvitation.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.SignUps = this.SignUps.bind(this);
    this.LoggedIn = this.LoggedIn.bind(this);
    this.Searching = this.Searching.bind(this);
    this.LogOut = this.LogOut.bind(this);
    this.addEvaluation = this.addEvaluation.bind(this);
  }

  addEvaluation(to, in_review){
    for(let i=0; i < this.state.UserData.length; ++i)
    {
      if(this.state.UserData[i].Name === to)
      {
        this.state.UserData[i].Evaluation.push(in_review);
      }
    }
  }



  SignUps(newObject) {
    this.state.UserData.push(newObject);
    this.setState(this.state);
  }

  LoggedIn (username) {
    debugger;
    for(let a = 0; a < this.state.UserData.length; a++) {
      if(username === this.state.UserData[a].Id) {
        this.state.Current = this.state.UserData[a].Name;
      }
    }
   // this.state.Current = username;
    this.setState(this.state);
  }

  Searching(value) {
    this.state.Searched = [];
    this.state.Search = value;
    debugger;
    for(let a = 0; a < this.state.UserData.length; a++ ) {

      if(this.state.UserData[a].Name.toLowerCase() === value.toLowerCase()) {

        this.state.Searched.push(this.state.UserData[a]);
      }
      
    }

    for(let b = 0; b < this.state.UserData.length; b++ ) {
       if(this.state.UserData[b].Name.toLowerCase().includes(value.toLowerCase()) && this.state.UserData[b].Name.toLowerCase() !== value.toLowerCase()) {
         this.state.Searched.push(this.state.UserData[b]);
       }
     }
    this.setState(this.state);
  }

  LogOut() {
    debugger;
    this.state.Current = null;
    this.setState(this.state);
  }
// <Route path={"searched"} component={Search} />
// <Route path={"profile"} component={Profile}/>
//<Homepage Invitation={this.state.Invitation} Message={this.state.Message} UserData={this.state.UserData} LoggedIn={this.LoggedIn.bind(this)} />


replyMessage(from, to, message){
  debugger;
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
  //this.setState(this.state);
}

  render() {
    return (
      <div className="currentPage">
        <BrowserRouter>
          <Switch>
            <Route exact path="/profile"  render={(props) => (<Profile Invitation={this.state.Invitation} Message={this.state.Message} loadAllData={this.loadAllData} replyMessage={this.replyMessage} deleteMessage={this.deleteMessage} acceptInvitation={this.acceptInvitation} deleteMember={this.deleteMember} addInvitation={this.addInvitation} declineInvitation={this.declineInvitation} Current={this.state.Current} invitationList={this.state.currInvitation} messageList={this.state.currMessage} groupMemberList={this.state.currGroup}  UserData={this.state.UserData} LoggedIn={this.LoggedIn.bind(this)} LogOut={this.LogOut.bind(this)} Searching={this.Searching.bind(this)} {...props}/> )}/>
            <Route exact path="/"  render={(props) => (<Homepage SignUps={this.SignUps.bind(this)} Current={this.state.Current} Invitation={this.state.Invitation} Message={this.state.Message} UserData={this.state.UserData} LoggedIn={this.LoggedIn.bind(this)} LogOut={this.LogOut.bind(this)} Searching={this.Searching.bind(this)} {...props}/> )}/> 
            <Route exact path="/searched"  render={(props) => (<Searched addEvaluation={this.addEvaluation} replyMessage={this.replyMessage} addInvitation={this.addInvitation} SignUps={this.SignUps.bind(this)} Searched={this.state.Searched} Searching={this.state.Searching} Current={this.state.Current} Invitation={this.state.Invitation} Message={this.state.Message} UserData={this.state.UserData} LoggedIn={this.LoggedIn.bind(this)} LogOut={this.LogOut.bind(this)} Searching={this.Searching.bind(this)} {...props}/> )}/> 
          </Switch>
        </BrowserRouter>
  
        
      </div>
    );
  }
}

export default App;
