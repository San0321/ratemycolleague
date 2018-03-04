import React from 'react';

export default class SearchedResults extends React.Component {
  constructor(props) {
    super(props);
    debugger;
    if(this.props.item) {
        this.setState({
            h1: this.props.item.Name,
            img: this.props.item.Picture,
            h5: this.props.item.Email,
            p: this.props.item.Description
        })
    }
    else {
        this.setState({
            h1: "",
            img: "",
            h5: "",
            p: ""
        })
    }
  }
  componentDidMount() {
      this.setState({
          h1: this.props.item.Name,
          img: this.props.item.Picture,
          h5: this.props.item.Email,
          p: this.props.item.Description
      })
  }
  // map for buttons
  render() {
      return (
          
          <div>
            <h1>{this.state.h1}</h1>
            <img src={this.state.img}/>
            <h5>{this.state.h5}</h5>
            <p>{this.state.p}</p>
          </div>

      );
  }
}