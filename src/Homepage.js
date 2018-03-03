import React, { Component } from 'react';
//import {browserHistory} from 'react-router-dom';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
//import users from './data';
//import logo from './logo.svg';
//import './Homepage.css';

class Homepage extends Component {
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

            logOutState: 'none'

        };
    }
    
    // opens the modal when user clicks on sign in
    signInOnClick() {
    //    debugger;
        this.state.modal1On = true;
        this.changeState();
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
/*
    componentDidMount() {
        // modal shows
        let modal = document.getElementById('modal');
        let signIn = document.getElementById('signInModal');
        let signUp = document.getElementById('signUpModal');
        let span1 = document.getElementsByClassName('close')[0];
        let span2 = document.getElementsByClassName('close')[1];

        debugger;
  */      
/*
        // closes modal when use clicks outside of the modal
        window.onclick = (event) => {
            if(event.target == modal1) {
                modal1.style.display = "none";
                modal2.style.display = "none";
            }
            if(event.target == modal2) {
                modal1.style.display = "none";
                modal2.style.display = "none";
            }
        }
        */
        //checks whether the user is logged in
        /*
        if(localStorage.getItem("current")) {
            let signIn = document.getElementById('signInModal');
            let signUp = document.getElementById('signUpModal');
            let profile = document.getElementById('profile');
            let logout = document.getElementById('logoutButton');
            signIn.style.display = "none";
            signUp.style.display = "none";
            profile.style.display = "block";
            logout.style.display = "block";
        }
    }
*/
    ComponentDidMount() {
        //checks whether the user is logged in
        /*
        if(localStorage.getItem("current")) {
            let signIn = document.getElementById('signInModal');
            let signUp = document.getElementById('signUpModal');
            let profile = document.getElementById('profile');
            let logout = document.getElementById('logoutButton');
            signIn.style.display = "none";
            signUp.style.display = "none";
            profile.style.display = "block";
            logout.style.display = "block";
        }
        */
    }

    // use ref??
    dropDown() {
    	var x = document.getElementById("myTopnav");
    	if (x.className === "topnav") {
        	x.className += " responsive";
    	} else {
        	x.className = "topnav";
    	}
	}

    validate(un, pw) {
        let flag = true;
       // this.props.UserData[0].Id
        debugger;
        for(let a = 0; a < this.props.UserData.length; a++) {
            // check id
            if( this.props.UserData[a].Id === un) {
                // check pw when id is present
                if(this.props.UserData[a].Password === pw) {

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
        if(localStorage.getItem("current")) {
            // removes from the localStorage
            localStorage.removeItem("current");
            this.signingCheck(false);

        }
    }


    signUpFunc() {
        let username = this.state.idValue;
        let password = this.state.passwordValue;
        
        let name = document.getElementsByClassName("su-na").name.value;
        let description = document.getElementsByClassName("su-iy").desc.value
        let flag = true;

        for(let a = 0; a < this.props.UserData.length; a++) {
            if(this.props.UserData[a].Id === username) {
                alert("This username is already taken. Please pick different username");
                flag = false;
            }
        
        }
        


        if(flag) {
            this.signingCheck(flag);
            // this.props.signUps(username);
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
      debugger;
    this.setState({ idValue: e.target.value });
  }
  passwordChange(e) {
    this.setState({ passwordValue: e.target.value });
  }

  searching() {
    //  debugger;
   // <Link to= {{pathname: '/searched'}}/>
      //browserHistory.push({pathname: '/searched', state: this.props})
     this.props.history.push({pathname: '/searched'});
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
    <div className="Homepage">
        <nav>
            <div className="topnav" id="myTopnav">
                <a href="homepage.html" className="active">Home</a>
                <a href="#" onClick={this.signInOnClick.bind(this)} style={{display: this.state.signInState}}  id="signInModal">Sign In</a>
                <a href="#" onClick={this.signUpOnClick.bind(this)} style={{display: this.state.signUpState}}  id="signUpModal">Sign Up</a>
                    <a href="profile.html" id="profile" style={{display: this.state.profileState}}>Profile</a>
                    <a href="#" id="logoutButton" onClick={this.signOut.bind(this)} style={{display: this.state.logOutState}}>Log Out</a>
                <a href="javascript:void(0);" style={topnavStyle} className="icon" onClick={this.dropDown.bind(this)}>&#9776;</a>
            </div>
        </nav>
        <section>
            <br/>

            <div className="container" id="searchDiv">
                <form onSubmit={this.searching.bind(this)}>
                    <input type="search" name="searched"/>
                    <button type='submit' className="buttons" id="buttons">Search</button>
                
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

        </section>


        <article>
            <h1>Welcome to our website!</h1>
            <p>Our website allows you to search people who are qualified for your team-work project</p>
            <div className="parallax"></div>
            <div style={homepageStyle} className="caption">
                <span className="border">
We want you to find best team-mate for your group work.
        </span>
            </div>


            <div id='modal1' className="modal1" style={{display:this.state.modal1State}}>
                <div className='modal-content'>
                        <div className="imgcontainer">
                            <span onClick={this.closeOnClick.bind(this)} className="close" title="Close Modal">&times;</span>
                            <h1>Sign In</h1>
                           
                        </div>


                        <div className="container">
                            <form action=''>
                                <label htmlFor='username' ><b>Username</b></label>
                                <input type="text" name="username" className="si-un" onChange={this.idChange.bind(this)} placeholder="Enter Username"/>

                                <label htmlFor="password"><b>Password</b></label>
                                <input type="password" name="password" className="si-pw" onChange={this.passwordChange.bind(this)} placeholder="Enter Password"/>
                                <button type='button' className="login" onClick={this.signInFunc.bind(this)}>Login</button>
                            </form>
                        </div>
                        <div className="container" style={moduleContainerStyle}>
                            <button type="button" onClick={this.closeOnClick.bind(this)} className="cancelbtn">Cancel</button>
                            <span className="psw">Forgot <a href="#">password?</a></span>
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
                                <input type="text" name="name" className="su-na" placeholder="Enter your name"/>
                                <label htmlFor="password"><b>Password</b></label>
                                <input type="password" name="password" className="su-pw" onChange={this.passwordChange.bind(this)} placeholder="Enter Password"/>
                                <label htmlFor="desc"><b>Introduce Yourself!</b></label>
                                <input type="text" name="desc" className="su-iy" placeholder="Required"/>
                                <button type='button' className="signup" onClick={this.signUpFunc.bind(this)} >Sign Up</button>
                            </form>
                        </div>
                        <div className="container" style={moduleContainerStyle}>
                            <button type="button" onClick={this.closeOnClick.bind(this)} className="cancelbtn">Cancel</button>
                            <span className="psw">Forgot <a href="#">password?</a></span>
                        </div>
                </div>
            </div>
        </article>
    </div>
    
    );
  }
}

export default Homepage;
