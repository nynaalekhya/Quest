import React, { Component } from 'react';
import './LeftPannel.css';
class LeftPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="ACol" class="col span-1-4 padHorz">
        <div class="module snug">
          <ul class="sideNav subNav">
            <a
              onClick={(event) => this.props.switchTab(event, 'Salaries')}
              href="/member/account/salaries_input.htm"
              id="Salaries"
            >
              <li class={this.props.tabOpened === 'Salaries' ? 'current' : ''}>Salaries</li>
            </a>
            <a
              onClick={(event) => this.props.switchTab(event, 'Reviews')}
              href="/member/account/reviews_input.htm"
              id="Reviews"
            >
              <li class={this.props.tabOpened === 'Reviews' ? 'current' : ''}>Reviews</li>
            </a>
            <a
              onClick={(event) => this.props.switchTab(event, 'Interviews')}
              href="/member/account/interviews_input.htm"
              id="Interviews"
            >
              <li class={this.props.tabOpened === 'Interviews' ? 'current' : ''}>Inter­views</li>
            </a>
            <a
              onClick={(event) => this.props.switchTab(event, 'Photos')}
              href="/member/account/photos_input.htm"
              id="Photos"
            >
              <li class={this.props.tabOpened === 'Photos' ? 'current' : ''}>Photos</li>
            </a>
          </ul>
        </div>
      </div>
    );
  }
}

export default LeftPannel;
