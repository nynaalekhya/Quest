import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LowerNavBarOther } from '../../../../constants/action-types';
import Navbar from '../../Common/Navbar';
import LeftPannel from '../Common/LeftPannel';
import JobPreferencePage from '../JobPreferencePage/JobPreferencePage';
import './Profile.css';

class JobPreference extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    this.props.LowerNavBarOther();

    return (
      <body className="main flex loggedIn lang-en en-US hollywood  _initOk noTouch desktop">
        <Navbar />
        <div class="pageContentWrapperStudent ">
          <div id="UserProfilePageContent">
            <div id="UserProfile" class="gdGrid container">
              <div class="css-1tgr9d eds5rs80">
                <div class="applicationStyle__profileApplication___Jyu4n">
                  <div class="row flex-column flex-md-row p-0 px-md-lg py-md-xxl" id="profilePage">
                    <LeftPannel />
                    <JobPreferencePage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

// export default JobPreference;
const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(JobPreference);
