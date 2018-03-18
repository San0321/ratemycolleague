import React from 'react';

export default class SearchedResults extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
      if(this.props.item) {
          this.state = {
            h1: this.props.item.Name,
            img: this.props.item.Picture,
            h5: this.props.item.Email,
            p: this.props.item.Description,
            h6: this.props.item.Evaluation
          }
      }
      else {
        this.state = {
            h1: "",
            img: "",
            h5: "",
            h6: "",
            p: ""
          }
      }
      this.setState(this.state);
  }
  // map for buttons this.state.img
  render() {
    let rick = require("./profile.png");
    let picture = require("./bandabi.jpg");
    let rickAndMorty = require("./RM_profile.png");
 
    if(this.state.img === "./profile.png") {
      picture = rick;
    }
    else if (this.state.img === "./RM_profile.png") {
      picture = rickAndMorty;
    }
    else {
      // nothing happens
    }
      return (
          
          <div className={"section"}>
            <h1>{this.state.h1}</h1>
            <img className={"profile"} src={picture}/>
            <button onClick={this.props.AddInvitation}>Send Invitation</button>
            <button onClick={this.props.SendMessage}>Send Message</button>
            <button onClick={this.props.AddEvaluation}>Write Evaluation</button>
            <h5>{this.state.h5}</h5>
            <h6>{this.state.h6}</h6>
            <p>{this.state.p}</p>
          </div>

      );
  }
}