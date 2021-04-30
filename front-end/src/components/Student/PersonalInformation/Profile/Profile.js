import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LowerNavBarOther, openProfileTabOnClick } from '../../../../constants/action-types';
import Navbar from '../../Common/Navbar';
import LeftPannel from '../Common/LeftPannel';
import DemographicsPage from '../DemographicsPage/DemographicsPage';
import JobPreferencePage from '../JobPreferencePage/JobPreferencePage';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import ResumeList from '../ResumePage/ResumeList';
import './Profile.css';
import { history } from '../../../../App';
import { Redirect } from 'react-router';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let payload = { openTab: localStorage.getItem('openTab') };
    this.props.openProfileTabOnClick(payload);
    localStorage.setItem('selectedDropDown', '');
  }
  openResumeUploadPage = () => {
    console.log(' this.props.openResumeUploadPage();');
    history.push('/ResumeUploadPage');
  };
  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'company') {
        return <Redirect to="/Employer" />;
      } else if (localStorage.getItem('userrole') === 'admin') {
        return <Redirect to="/AdminHomePage" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    this.props.LowerNavBarOther();
    let tabOpened = <PersonalDetails />;
    switch (this.props.leftPannelStore.openTab) {
      case 'Resumes': {
        tabOpened = <ResumeList openResumeUploadPage={this.openResumeUploadPage} />;
        break;
      }
      case 'Job Preferences': {
        tabOpened = <JobPreferencePage />;
        break;
      }
      case 'Demographics': {
        tabOpened = <DemographicsPage />;
        break;
      }
      default: {
        tabOpened = <PersonalDetails />;
        break;
      }
    }
    return (
      <body className="main flex loggedIn lang-en en-US hollywood  _initOk noTouch desktop">
        {/*<Navbar />*/}
        <div class="pageContentWrapperStudent ">
          <div id="UserProfilePageContent">
            <div id="UserProfile" class="gdGrid container">
              <div class="css-1tgr9d eds5rs80">
                <div class="applicationStyle__profileApplication___Jyu4n">
                  <div class="row flex-column flex-md-row p-0 px-md-lg py-md-xxl" id="profilePage">
                    {<LeftPannel />}
                    {tabOpened}
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

// export default Profile;
const mapStateToProps = (state) => {
  const { leftPannelStore } = state.studentProfileLeftPanelReducer;
  return {
    leftPannelStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
    openProfileTabOnClick: (payload) => {
      dispatch({
        type: openProfileTabOnClick,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
