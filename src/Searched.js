import React, { Component } from 'react';
import SearchedResultList from './SearchedResultLists.js';
import SearchedResults from './SearchedResults.js';
import './searched.css';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * from "./actionReducer";


export class Searched extends Component {
	constructor() {
        super();
        this.state = {
            modal1On: false,
            modal1State: 'none',
            modal2On: false,
            modal2State: 'none',

            signInButton: true,
            signInState: 'block',

            signUpState: 'block',
            profileButton: false,
            profileState: 'none',

			logOutState: 'none',
			Evaluation: []
		};
		
        debugger;
	}

	componentWillMount() {
		debugger;
        if(this.props.app.Current != null) {
            this.signingCheck(true);
        }
        else {
            this.signingCheck(false);
		}
		debugger;
		//this.state.Searched = this.props.app.Searched;
		if(this.props.app.UserData) {
			for(let i=0; i < this.props.app.UserData.length; ++i)
			{
				if(this.props.app.UserData[i].Name === this.props.app.Current)
				{
					for(let j=0; j < this.props.app.UserData[i].Evaluation.length; ++j)
					{
						this.state.Evaluation.push(this.props.app.UserData[i].Evaluation[j]);
					}
				}
			}
		}
		
		this.setState(this.state);
    }
	
    // opens the modal when user clicks on sign in
    signInOnClick() {
    //    debugger;
        this.state.modal1On = true;
		this.changeState();
		debugger;
    };

    // opens the modal when user clicks on sign up
    signUpOnClick() {
        this.state.modal2On = true;
        this.changeState();
    };

    // closes the modal when user clicks on X
    closeOnClick() {
        this.state.modal1On = 'false';
        this.state.modal2On = 'false';
        this.changeState();
    };

    signingCheck(decision) {
        // true means its either sign in or sign up
        if(decision) {
            this.state.signInButton = false;
            this.state.profileState = true;
            this.state.signInState = 'none';
            this.state.signUpState = 'none';
            this.state.profileState = 'block';
            this.state.logOutState = 'block';
        }
        else {
            this.state.signInButton = true;
            this.state.profileState = false;
            this.state.signInState = 'block';
            this.state.signUpState = 'block';
            this.state.profileState = 'none';
            this.state.logOutState = 'none';
        }
        // false means its logout
    }

    dropDown() {
    	var x = document.getElementById("myTopnav");
    	if (x.className === "topnavsearch") {
        	x.className += " responsive";
    	} else {
        	x.className = "topnavsearch";
    	}
	}

    validate(un, pw) {
        let flag = true;
       // this.props.UserData[0].Id
        debugger;
        for(let a = 0; a < this.props.app.UserData.length; a++) {
            // check id
            if( this.props.app.UserData[a].Id === un) {
                // check pw when id is present
                if(this.props.app.UserData[a].Password === pw) {

                    // saves to parent
                    
                    return true;
                }
            }
        }
        return false;
    }


    signInFunc() {

        let username = this.state.idValue;
        let password = this.state.passwordValue;
        let flag =  this.validate(username, password);
        debugger;

        if(flag) {
            this.signingCheck(flag);
            this.props.LoggedIn(username);
            // we need to let the parent state to know we have been logged in
            this.state.modal1On = false;
            this.changeState();
        }
        else {
            alert("Wrong Password or Username");
        }
        
    }




    signOut() {
		// debugger;
		 if(this.props.app.Current != null) {
			 this.props.LogOut();
			 this.signingCheck(false);
		 }
	 }


	 signUpFunc() {
        let username = this.state.idValue;
        let password = this.state.passwordValue;
        let name = this.state.nameValue;
        let desc = this.state.descValue;
        
        let flag = true;

        for(let a = 0; a < this.props.app.UserData.length; a++) {
            if(this.props.app.UserData[a].Id === username) {
                alert("This username is already taken. Please pick different username");
                flag = false;
            }
        
        }
        
        if(flag) {
            this.signingCheck(flag);
            let newData = {
                Name: name,
                Password: password,
                Id: username,
                Description: desc
            }
            this.props.SignUps(username);
            this.props.LoggedIn(username);
            // also we need to store it to the state
            // we need to let the parent state to know we have been logged in
            this.state.modal2On = false;
            this.changeState();
        }
    }

	changeState() {
	    if(this.state.modal1On == true) {
	        this.state.modal1State = 'block';
	    }
	    else {
	        this.state.modal1State = 'none';
	    }

	    if(this.state.modal2On == true) {
	        this.state.modal2State = 'block';
	    }
	    else {
	        this.state.modal2State = 'none';
	    }
	    this.setState(this.state);
	}

	  idChange(e) {
		this.setState({ idValue: e.target.value });
	  }
	  passwordChange(e) {
		this.setState({ passwordValue: e.target.value });
	  }
	  nameChange(e) {
		this.setState({ nameValue: e.target.value });
	  }
	  descChange(e) {
		this.setState({ descValue: e.target.value });
	  }

	  searching(e) {
	  	debugger;
		  this.props.Searching(e.target[0].value);
		 this.setState(this.state);
		  debugger;
		// 
		//this.props.history.push({pathname: '/searched'}); 
	  }

	handleAddInvitation(){
		this.props.addInvitation(this.props.app.Current, this.props.app.Searched[0].Name);
		alert("Your Invitation has been sent!");
	}
	
	handleSendMessage(){
		let userMessage = prompt("Enter a message");
		this.props.replyMessage(this.props.app.Current, this.props.app.Searched[0].Name, userMessage);
		alert("Your Message has been sent!");
	}

	handleWriteEvaluation(){
		let inputReview = prompt("Enter your evaluation");
		this.props.addEvaluation(this.props.app.Searched[0].Name, inputReview);
	}
	toHome() {
		this.props.history.push({pathname: '/'});
	  }
	toProfile() {
		this.props.history.push({pathname: '/profile'});
	}
	
	render() {

	  const topnavStyle = {
        fontSize: '15px'
      };
      const homepageStyle = {
        height: '1000px',
        fontSize: '36px'
      };
      const moduleContainerStyle = {
        backgroundColor: '#f1f1f1'
      }

		return (
			<div className="searchbody">
				<header>

					<div className="topnavsearch" id="myTopnav">
						<a onClick={this.toHome.bind(this)} className="activesearch">Home</a>
						<a onClick={this.signInOnClick.bind(this)} style={{display: this.state.signInState}} id="signInModal">Sign In</a>
	  					<a onClick={this.signUpOnClick.bind(this)} style={{display: this.state.signUpState}} id ="signUpModal">Sign Up</a>
								<a id='profile' style={{display: this.state.profileState}} onClick={this.toProfile.bind(this)}>Profile</a>
								<a id="logoutButton" onClick={this.signOut.bind(this)}>Log Out</a>
	  					 <a href="javascript:void(0);" style={topnavStyle} className="icon" onClick={this.dropDown.bind(this)}>&#9776;</a>
					</div>

				</header>

				<nav>
					<div className="container">
						<form onSubmit={this.searching.bind(this)}>
							<input type="text" id="searched" name="searched"/>
							<button type='submit'>Search</button>
						
							<input type="radio" id="searchChoice1"
						     name="search" value="Name" defaultChecked/>
						    <label htmlFor="searchChoice1">Name</label>

						    <input type="radio" id="searchChoice2"
						     name="search" value="Skills"/>
						    <label htmlFor="searchChoice2">Skills</label>

						    <input type="radio" id="searchChoice3"
						     name="search" value="sth"/>
						    <label htmlFor="searchChoice3">Mail</label>
						</form>

					</div>

					<div>
						<ul>
							<div className="results">
								
									{this.props.app.Searched ? this.props.app.Searched.map(item => (
										<SearchedResultList key={item.Name} data={item}/>
									)) : ""}
									
							</div>
						

						</ul>
					</div>
				</nav>
				<article id="Search">
					<div className = "section">
					{this.props.app.Searched ? <SearchedResults item={this.props.app.Searched[0]} SendMessage={this.handleSendMessage.bind(this)} AddInvitation={this.handleAddInvitation.bind(this)} AddEvaluation={this.handleWriteEvaluation.bind(this)}/> : ""}
						
					</div>
				</article>
			<div id='modal1' className="modal1" style={{display:this.state.modal1State}}>
				<div className='modal-content'>
						<div className="imgcontainer">
								<span onClick={this.closeOnClick.bind(this)} className="close" title="Close Modal">&times;</span>
								<h1>Sign In</h1>
						</div>


						<div className="container">
							<form action=''>
								<label htmlFor='username'><b>Username</b></label>
								<input type="text" name="username" className="si-un" onChange={this.idChange.bind(this)} placeholder="Enter Username"></input>
								<label htmlFor="password"><b>Password</b></label>
								<input type="password" name="password" className="si-pw" onChange={this.passwordChange.bind(this)} placeholder="Enter Password"></input>
								<button type='button' className="login" onClick={this.signInFunc.bind(this)}>Login</button>
							</form>
						</div>
						<div className="container" style={moduleContainerStyle}>
							 <button type="button" onClick={this.closeOnClick.bind(this)} className="cancelbtn">Cancel</button>
							 <span className="psw">Forgot <a>password?</a></span>
						 </div>
				</div>
			</div>

			<div id='modal2' className="modal2" style={{display:this.state.modal2State}}>
					<div className='modal-content'>
						<div className="imgcontainer">
								<span onClick={this.closeOnClick.bind(this)} className="close" title="Close Modal">&times;</span>
								<h1>Sign Up</h1>
						</div>
						<div className="container">
                            <form action=''>
                                <label htmlFor='username'><b>Username</b></label>
                                <input type="text" name="username" className="su-un" onChange={this.idChange.bind(this)} placeholder="Enter Username"/>
                                <label htmlFor="name"><b>Name</b></label>
                                <input type="text" name="name" className="su-na" onChange={this.nameChange.bind(this)} placeholder="Enter your name"/>
                                <label htmlFor="password"><b>Password</b></label>
                                <input type="password" name="password" className="su-pw" onChange={this.passwordChange.bind(this)} placeholder="Enter Password"/>
                                <label htmlFor="desc"><b>Introduce Yourself!</b></label>
                                <input type="text" name="desc" className="su-iy" onChange={this.descChange.bind(this)} placeholder="Required"/>
                                <button type='button' className="signup" onClick={this.signUpFunc.bind(this)} >Sign Up</button>
                            </form>
                        </div>
						<div className="container" style={moduleContainerStyle}>
							 <button type="button" onClick={this.closeOnClick.bind(this)} className="cancelbtn">Cancel</button>
							 <span className="psw">Forgot <a>password?</a></span>
						 </div>
					</div>
			</div>
		</div>
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
        SignUps: (newObject) => {
            dispatch(signUps(newObject));
        },
        LoggedIn: (username) => {
            dispatch(loggedIn(username));
        },
        Searching: (value) => {
            dispatch(searching(value));
        },
        LogOut: () => {
            dispatch(logOut())
        }
        addEvaluation: (to, in_review) => {
			dispatch(AddEvaluation(to, in_review));
		},
		replyMessage: (from, to, message) => {
			dispatch(ReplyMessage(from, to, message));
		},
		addInvitation: (from, to) => {
			dispatch(AddInvitation(from, to));
		}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Searched);