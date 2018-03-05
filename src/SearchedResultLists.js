import React from 'react';

export default class SearchedResultLists extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    debugger;
    if(this.props.data) {
        this.state = {
            li: this.props.data.Name
        };
    }
    else {
        this.state = {
            li: ''
        };
    }
    this.setState(this.state);
  }
  render() {
    return (
        <div>
            <li>{this.state.li}
            </li>
        </div>

    );
}
}