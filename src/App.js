import React, { Component } from 'react';

import Homepage from './Homepage.js';
import Searched from './Searched.js';
//import Profile from './profile.js';

import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

class App extends Component {
  constructor() {
    super();
    this.state = {
      Invitation: [{
        From: "",
        To: ""
      }],
      Message: [{
        From: "",
        To: "",
        Content: ""
      }],
      UserData: [{
        Name: "Rick",
        Id: "dorat",
        Password: "1234",
        Rating: "9/10",
        Description: "Hi, my name is Rick. I have experience on web front-end development. I have used React.js and CSS to develop some websites.",
        Position: "",
        Endorsement: "",
        Picture: "profile.png",
        Skill: ["React.js", "CSS"],
        Member: [],
        Email: "rick@ucsd.edu"
      },
      {
        Name: "Morty",
        Id: "something",
        Password: "1234",
        Rating: "4/10",
        Description: "Hi, my name is Morty. I have experience on web back-end development. I have used Node.js and PHP to develop some websites.",
        Position: "",
        Endorsement: "",
        Picture: "",
        Skill: ["PHP", "Node.js"],
        Class: [],
        Email: "morty@ucsd.edu"
      },
      {
        Name: "Rick and Morty",
        Id: "rickmorty",
        Password: "1234",
        Rating: "10/10",
        Description: "Hi, my name is Rick and Morty. I have experience on web back-end development. I have used Node.js and PHP to develop some websites.",
        Position: "",
        Endorsement: "",
        Picture: "RM_profile.png",
        Skill: ["PHP", "Node.js"],
        Class: [],
        Email: "morty@ucsd.edu"
      }],
      LoggedIn: "",
      Search:"",
      SearchItem:""
    
       
    };
    //const customHistory = createBrowserHistory();
  }

  LoggedIn (username) {
    // this.setState()
  }
// <Route path={"searched"} component={Search} />
// <Route path={"profile"} component={Profile}/>
//<Homepage Invitation={this.state.Invitation} Message={this.state.Message} UserData={this.state.UserData} LoggedIn={this.LoggedIn.bind(this)} />

  render() {
    return (
      <div className="currentPage">
        <BrowserRouter>
          <Switch>
            <Route exact path="/"  render={(props) => (<Homepage Invitation={this.state.Invitation} Message={this.state.Message} UserData={this.state.UserData} LoggedIn={this.LoggedIn.bind(this)} {...props}/> )}/> 
            <Route exact path="/searched"  render={(props) => (<Searched Invitation={this.state.Invitation} Message={this.state.Message} UserData={this.state.UserData} LoggedIn={this.LoggedIn.bind(this)} {...props}/> )}/> 
          </Switch>
        </BrowserRouter>
  
        
      </div>
    );
  }
}

export default App;
