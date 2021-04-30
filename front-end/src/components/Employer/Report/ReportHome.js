import React, { Component } from 'react';
import LeftBlock from '../LandingPage/LeftBlock.js';
import '../LandingPage/Body.css';
import './ReportHome.css';
import RightBlock from './RightBlock.js';
import axios from 'axios';
import serverUrl from '../../../config.js';
import { connect } from 'react-redux';
import { updateEmployerStats } from '../../../constants/action-types';
import { history } from '../../../App';
import { Redirect } from 'react-router';

class ReportHome extends Component {
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
      default: {
        break;
      }
    }
  };

  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'student') {
        return <Redirect to="/Home" />;
      } else if (localStorage.getItem('userrole') === 'admin') {
        return <Redirect to="/AdminHomePage" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div id="UserProfilePageContent" class>
          <div id="UserProfile" class="gdGrid Container">
            <div class="css-1tgr9d eds5rs80">
              <div
                class="applicationStyle__profileApplication___Jyu4n"
                // style={{ 'max-width': '1280px' }}
              >
                <div
                  class="row flex-md-row p-0 px-md-lg py-md-xxl"
                  style={{ display: 'flex !important' }}
                >
                  {<LeftBlock handleClick={(selectedOption) => this.handleClick(selectedOption)} />}
                  {<RightBlock fetchReport={this.fetchReport} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateEmployerStats: (payload) => {
//       dispatch({
//         type: updateEmployerStats,
//         payload,
//       });
//     },
//   };
// };

//export default connect(null, mapDispatchToProps)(ReportHome);
export default ReportHome;
