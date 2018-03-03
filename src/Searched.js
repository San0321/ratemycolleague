import React, { Component } from 'react';

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

            logOutState: 'none'

        };
        debugger;
	}
	ComponentWillMount() {
		debugger;
	}
    ComponentDidMount() {
		debugger;
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

	/*
				// gets the exact data
				processUser();
				// gets the similar data for the searched list
				getResults();

				// modal shows
				let modal = document.getElementById('modal');
				let signIn = document.getElementById('signInModal');
				let signUp = document.getElementById('signUpModal');
				let span1 = document.getElementsByClassName('close')[0];
				let span2 = document.getElementsByClassName('close')[1];

				// opens the modal when user clicks on sign in
				signIn.onclick = () => {
					modal1.style.display = 'block';
				}

				// opens the modal when user clicks on sign up
				signUp.onclick = () => {
					modal2.style.display = 'block';
				}

				// closes the modal when user clicks on X

				span1.onclick = () => {
					modal1.style.display = "none";
					modal2.style.display = "none";
				}
				span2.onclick = () => {
					modal1.style.display = "none";
					modal2.style.display = "none";
				}


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

				//checks whether the user is logged in
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

  processUser()
  {
  	/*
    let parameters = location.search.substring(1);
		let searchValue = parameters.split('&');
		let searchField = "";
		let searchedArray = [];
		// spliting what user is searching and in what field
	//	debugger;
		// catches when user clicks on the list
		if(searchValue.length == 1) {
			 searchValue = searchValue[0].split("=")[1];
		}
		else {
			searchField = searchValue[1].split('=')[1];
			searchValue = searchValue[0].split('=')[1];
		}
	//	debugger;

    searched = unescape(searchValue);

		// removing whitespace from homepage
		if(searchValue.includes("+")) {
			searchedArray = searchValue.split("+");
			searched = "";
			for(let c = 0; c < searchedArray.length; c++) {

				if(1 < searchedArray.length && c < (searchedArray.length -1)) {
					searched += searchedArray[c] + " ";
				}
				else {
					searched += searchedArray[c];
				}
			}
		}


		document.getElementById("searched").value = searched;
	//	debugger;
		let user = document.getElementsByClassName("section")[0];

		// searching only works on name currently
		// needs to support skills, mails
		// plus it needs to show most similar result to screen when exact data is not present

		// show the searched person
		for(let i = 0; i < userdata.length; i++) {
			//debugger;

			if(userdata[i].name.toLowerCase() === searched.toLowerCase()) {
				// add name
				let h1 = document.createElement("h1");
				h1.innerHTML = userdata[i].name;
				user.appendChild(h1);

				// add img
				let img = document.createElement("img");
				let attributes = document.createAttribute('class');
				attributes.value = "profile";
				img.setAttributeNode(attributes);
				img.src = userdata[i].pic;
				user.appendChild(img);


				// add email
				let h4 = document.createElement("h4");
				h4.innerHTML = userdata[i].email;
				user.appendChild(h4);

				// add rating
				let h5 = document.createElement("h5");
				h5.innerHTML = userdata[i].rating;
				user.appendChild(h5);


				// add skills
				for(let a = 0; a < userdata[i].skills.length; a++) {
					//debugger;
					let button = document.createElement("button");
					button.innerHTML = userdata[i].skills[a];
					let attributes = document.createAttribute('class');
					attributes.value = "buttons"; // can be dynamic
					button.setAttributeNode(attributes);
					button.class = 'buttons';
					user.appendChild(button);
				}

				// add description
				let p = document.createElement("p");
				p.innerHTML = userdata[i].description;
				user.appendChild(p);



			}
		}
*/
  	}

	getResults() {
		/*
		// add results
		let result = document.getElementsByClassName("results")[0];
	//	debugger;
		for(let b = 0; b < userdata.length; b++) {
			debugger;
			if(userdata[b].name.toLowerCase().includes(searched.toLowerCase())) {
				let li = document.createElement("li");
				let a = document.createElement("a");
				a.innerHTML = userdata[b].name;
				a.href = "./Searched.html?searched=" + userdata[b].name;
				li.appendChild(a);
				result.appendChild(li);

			}
		}
		*/
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
						<form action='./Searched.html' /* Change this as well*/>
							<input type="text" id="searched" name="searched"></input>
							<button type='submit'>Search</button>
						
							<input type="radio" id="searchChoice1"
						     name="search" value="Name" defaultChecked></input>
						    <label htmlFor="searchChoice1">Name</label>

						    <input type="radio" id="searchChoice2"
						     name="search" value="Skills"></input>
						    <label htmlFor="searchChoice2">Skills</label>

						    <input type="radio" id="searchChoice3"
						     name="search" value="sth"></input>
						    <label htmlFor="searchChoice3">Mail</label>
						</form>

					</div>

					<div>
						<ul>
							<div className="results">
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