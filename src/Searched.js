import React, { Component } from 'react';
import SearchedResultList from './SearchedResultLists.js';
import SearchedResults from './SearchedResults.js';


class Searched extends Component {
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
			
			Searched: []

        };
        debugger;
	}

	componentWillMount() {
        if(this.props.Current != null) {
            this.signingCheck(true);
        }
        else {
            this.signingCheck(false);
		}
		debugger;
		this.state.Searched = this.props.Searched;
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
		// debugger;
		 if(this.props.Current != null) {
			 this.props.LogOut();
			 this.signingCheck(false);
		 }
	 }


    signUpFunc() {
        let username = this.state.idValue;
        let password = this.state.passwordValue;
        
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
		  debugger;
		//  debugger;
	   // <Link to= {{pathname: '/searched'}}/>
		  //browserHistory.push({pathname: '/searched', state: this.props})
		  this.props.searching()
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
			<div>
				<header>

					<div className="topnav" id="myTopnav">
						<a href="homepage.html"/* change this*/ className="active">Home</a>
						<a href="#" onClick={this.signInOnClick.bind(this)} style={{display: this.state.signInState}} id="signInModal">Sign In</a>
	  					<a href="#" onClick={this.signUpOnClick.bind(this)} style={{display: this.state.signUpState}} id ="signUpModal">Sign Up</a>
								<a href="profile.html" id='profile' style={{display: this.state.profileState}}>Profile</a>
								<a href="#" id="logoutButton" onClick={this.signOut.bind(this)}>Log Out</a>
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
								{this.state.Searched.map(item => (
									<SearchedResultList key={item.Name} data={item}/>
								))}
							</div>
						

						</ul>
					</div>
				</nav>
				<article>
					<div className = "section">
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
								<input type="text" name="username" className="su-un" placeholder="Enter Username"></input>
								<label htmlFor="password"><b>Password</b></label>
								<input type="password" name="password" className="su-pw" placeholder="Enter Password"></input>
								<button type='button' className="signup" onClick={this.signUpFunc.bind(this)}>Sign Up</button>
							</form>
						</div>
						<div className="container" style={moduleContainerStyle}>
							 <button type="button" onClick={this.closeOnClick.bind(this)} className="cancelbtn">Cancel</button>
							 <span className="psw">Forgot <a href="#">password?</a></span>
						 </div>
					</div>
			</div>
		</div>
		);
	}
			
}

export default Searched;