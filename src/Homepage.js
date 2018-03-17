import React, { Component } from 'react';
//import {browserHistory} from 'react-router-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import './index.css';


export class Homepage extends Component {
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

    componentWillMount() {
        if(this.props.app.Current != null) {
            this.signingCheck(true);
        }
        else {
            this.signingCheck(false);
        }
    }
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
            debugger;
        }
        else {
            alert("Wrong Password or Username");
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
            this.props.SignUps(newData);
            this.props.LoggedIn(username);
            // also we need to store it to the state
            // we need to let the parent state to know we have been logged in
            this.state.modal2On = false;
            this.changeState();
        }
    }




    signOut() {
       // debugger;
        if(this.props.app.Current != null) {
            this.props.LogOut();
            this.signingCheck(false);
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
     // debugger;
     /*
      let something = function(this) {
          debugger;
        
      };
      */
      this.props.Searching(e.target[0].value);
      this.props.history.push({pathname: '/searched'});
      
    //  debugger;
      //browserHistory.push({pathname: '/searched', state: this.props})
    
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
    <div className="bodyHomepage">
        <header>
        </header>
        <nav>
            <div className="topnav" id="myTopnav">
                <a onClick={this.toHome.bind(this)}>Home</a>
                <a href="#" onClick={this.signInOnClick.bind(this)} style={{display: this.state.signInState}}  id="signInModal">Sign In</a>
                <a href="#" onClick={this.signUpOnClick.bind(this)} style={{display: this.state.signUpState}}  id="signUpModal">Sign Up</a>
                <a style={{display: this.state.profileState}} onClick={this.toProfile.bind(this)}>Profile</a>      
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
                            <span className="psw">Forgot <a href="#">password?</a></span>
                        </div>
                </div>
            </div>
        </article>
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
            dispatch({
                type: "SignUps",
                newObject: newObject
            });
        },
        LoggedIn: (username) => {
            dispatch({
                type: "LoggedIn",
                username: username
            });
        },
        Searching: (value) => {
            dispatch({
                type: "Searching",
                value: value
            });
        },
        LogOut: () => {
            dispatch({
                type: "LogOut"
            })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

