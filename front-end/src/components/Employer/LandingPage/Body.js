import React, { Component } from 'react';
import './Body.css';
import LeftBlock from './LeftBlock.js';
import RightBlock from './RightBlock.js';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="row  flex-md-row p-0 px-md-lg py-md-xxl">
        {<LeftBlock handleClick={this.props.handleClick()}/>}
        {<RightBlock />}
      </div>
    );
  }
}

export default Body;
