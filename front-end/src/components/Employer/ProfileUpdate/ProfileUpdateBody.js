import React, { Component } from 'react';
import LeftBlock from '../LandingPage/LeftBlock';
import './ProfileUpdateBody.css';
// import LeftBlock from './LeftBlock.js';
import RightBlock from './RightBlock.js';
import { history } from '../../../App';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (selectedOption = 'Profile') => {
    //console.log('selected option', selectedOption);
    //let selectedOption = localStorage.getItem('selectedOption');
    switch (selectedOption) {
      case 'Profile': {
        console.log('selected option profile');
        history.push('/Employer');
        break;
      }
      case 'Report': {
        console.log('selected option reports');
        history.push('/EmployerReport');
        break;
      }
      case 'updateProfile': {
        console.log('selected option reports');
        history.push('/EmployerProfile');
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    return (
      <div class="row flex-md-row p-0 px-md-lg py-md-xxl">
        {<LeftBlock handleClick={(selectedOption) => this.handleClick(selectedOption)} />}
        {<RightBlock handleClick={(selectedOption) => this.handleClick(selectedOption)} />}
      </div>
    );
  }
}

export default Body;
