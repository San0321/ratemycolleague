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
            p: this.props.item.Description
          }
      }
      else {
        this.state = {
            h1: "",
            img: "",
            h5: "",
            p: ""
          }
      }
      this.setState(this.state);
  }
  // map for buttons
  render() {
      return (
          
          <div className={"section"}>
            <h1>{this.state.h1}</h1>
            <img className={"profile"} src={this.state.img}/>
            <button onClick={this.props.AddInvitation}>Send Invitation</button>
            <button onClick={this.props.SendMessage}>Send Message</button>
            <button onClick={this.props.AddEvaluation}>Write Evaluation</button>
            <h5>{this.state.h5}</h5>
            <p>{this.state.p}</p>
          </div>

      );
  }
}