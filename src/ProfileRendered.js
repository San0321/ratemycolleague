import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Profile } from './Profile';
import { Link } from 'react-router-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

class ProfileRendered extends React.Component{
	toHome() {
		debugger;
		this.props.history.push({pathname: '/'});
	  }
	render(){
		return (
		<div className="container">
		
     	<header>
 
       	<div className="topnavprofile" id="myTopnav">
  		    <a className="activeprofile" onClick={this.toHome.bind(this)}>Home</a>
         	<a id="logoutButton" onClick={this.props.signOut}>Log Out</a>
         	<a href="javascript:void(0);" style={{fontSize:'15px'}} className="icon" onClick={this.props.dropDown}>&#9776;</a>
     	  </div>

     	<h1>Profile</h1>
     	</header>


		<nav className="profile">
  		<ul>
    		<li className="section">	</li>
    		<li id="myName">Name: {this.props.myName}</li>
    		<li>Major: {this.props.myMajor}</li>
    		<li>Position: {this.props.myPosition}</li>
    		<button onClick={this.props.myInvitation}>View Invitation</button>
    		<button onClick={this.props.myMessage}>Read Message</button>
    		<button onClick={this.props.myGroup}>View My Group</button>
        <button onClick={this.props.myEvaluation}>View Evaluation</button>
  		</ul>
		</nav>

		<article className="profile">
  		<div className="article-section">
      		<h1>About Myself</h1>
    		<p>{this.props.myDescription}</p>
  		</div>
 		</article>

  		<footer>Phillip Jo and San Kang</footer>
  		<div id = "bottomDiv">
  		</div>

  		</div>
		);
	}
}
export default ProfileRendered; 