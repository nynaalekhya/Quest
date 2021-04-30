import React, { Component } from 'react';
import './LeftPannel.css';
import { connect } from 'react-redux';
import { openProfileTabOnClick } from '../../../../constants/action-types';
import ImageUploadModal from './ImageUploadModal';
import { updateStudentProfile } from '../../../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../../../config';

class LeftPannel extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = { redirect: null, showImageUploadModal: false };
  }

  openPage = (page) => {
    // this.setState({
    //   redirect: page,
    // });
    localStorage.setItem('openTab', page);
    let payload = { openTab: page };
    this.props.openProfileTabOnClick(payload);
  };
  openImageModal = (event) => {
    this.setState({
      showImageUploadModal: !this.state.showImageUploadModal,
    });
  };

  handleClick = (event) => {
    this.inputElement.current.click();
  };

  updateStudentProfileInDB = (student) => {
    // event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

    axios.post(serverUrl + 'student/profileUpdate', student).then(
      (response) => {
        if (response.status === 200) {
          // let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          // studentProfile.AppliedJobs.push(this.props.selectedJob._id);
          const payload = {
            studentProfile: student,
          };
          this.props.updateStudentProfile(payload);
          this.setState({
            showImageUploadModal: false,
          });
        }
      },
      (error) => {}
    );
  };

  render() {
    // const hiddenFileInput = React.useRef(null);
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />;
    // }
    // console.log('this.props.location.pathname', this.props.location.pathname);
    return (
      <div className="col-12 col-md-4 pr-md-xxl">
        <div className="d-none d-md-block">
          <div data-test="profilePhoto" id="ProfilePhoto">
            <div className="profilePhotoStyle__profilePhoto___CTVQw">
              <div className="d-inline-flex justify-content-start align-items-center profilePhotoStyle__photoContainer___3itOq">
                <div className="mr-xsm">
                  {this.props.studentInfoStore.studentProfile.ProfilePicURL &&
                  this.props.studentInfoStore.studentProfile.ProfilePicURL.length > 0 ? (
                    <div
                      id="ProfileImage"
                      data-test="profileImageEditableContainer"
                      className="profilePhotoStyle__editableContainer___3auRr"
                    >
                      <img
                        src={this.props.studentInfoStore.studentProfile.ProfilePicURL}
                        alt="Profile Image"
                      />
                      <div>
                        <i className="icon-camera"></i>
                      </div>
                    </div>
                  ) : (
                    <span className="SVGInline profilePhotoStyle__icon___1H_01">
                      <svg
                        className="SVGInline-svg profilePhotoStyle__icon___1H_01-svg"
                        style={{ width: '55px', height: '55px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  )}
                </div>
                <div className="profilePhotoBadge"></div>
                <div onClick={this.openImageModal} className="profilePhotoStyle__caption___HtLE-">
                  {this.props.studentInfoStore.studentProfile.ProfilePicURL &&
                  this.props.studentInfoStore.studentProfile.ProfilePicURL.length > 0 ? (
                    <span>Change photo</span>
                  ) : (
                    <span>Add a photo</span>
                  )}
                </div>
              </div>
              {this.state.showImageUploadModal ? (
                <ImageUploadModal
                  updateStudentProfileInDB={(student) => this.updateStudentProfileInDB(student)}
                  openImageModal={this.openImageModal}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className="navigationStyle__nav___1PF4F gd-ui-tab css-o9yci5">
          <ul role="tablist">
            <li
              onClick={() => this.openPage('Profile')}
              role="tab"
              className={
                this.props.leftPannelStore.openTab === 'Profile'
                  ? 'active css-1h7a53u'
                  : 'css-1h7a53u'
              }
              // className={
              // this.props.location.pathname === '/Profile' ? 'active css-1h7a53u' : 'css-1h7a53u'
              // }
              aria-selected="true"
              tabindex="0"
            >
              <div className="customItem css-wks0vk">
                <div className="d-flex flex-row justify-content-start align-items-center">
                  Profile
                </div>
              </div>
            </li>
            <li
              // className={
              //   this.props.location.pathname === '/Resume' ? 'active css-1h7a53u' : 'css-1h7a53u'
              // }
              onClick={() => this.openPage('Resumes')}
              role="tab"
              className={
                this.props.leftPannelStore.openTab === 'Resumes'
                  ? 'active css-1h7a53u'
                  : 'css-1h7a53u'
              }
              aria-selected="false"
              tabindex="0"
            >
              <div className="customItem css-wks0vk">
                <div className="d-flex flex-row justify-content-start align-items-center">
                  Resumes
                </div>
              </div>
            </li>
            <li
              onClick={() => this.openPage('Job Preferences')}
              role="tab"
              className={
                this.props.leftPannelStore.openTab === 'Job Preferences'
                  ? 'active css-1h7a53u'
                  : 'css-1h7a53u'
              }
              aria-selected="false"
              tabindex="0"
            >
              <div className="customItem css-wks0vk">
                <div className="d-flex flex-row justify-content-start align-items-center">
                  Job Preferences
                </div>
              </div>
            </li>
            <li
              onClick={() => this.openPage('Demographics')}
              role="tab"
              className={
                this.props.leftPannelStore.openTab === 'Demographics'
                  ? 'active css-1h7a53u'
                  : 'css-1h7a53u'
              }
              aria-selected="false"
              tabindex="0"
            >
              <div className="customItem css-wks0vk">
                <div className="d-flex flex-row justify-content-start align-items-center">
                  Demographics
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// export default withRouter(LeftPannel);
const mapStateToProps = (state) => {
  const { leftPannelStore } = state.studentProfileLeftPanelReducer;
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    leftPannelStore,
    studentInfoStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openProfileTabOnClick: (payload) => {
      dispatch({
        type: openProfileTabOnClick,
        payload,
      });
    },
    updateStudentProfile: (payload) => {
      dispatch({
        type: updateStudentProfile,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPannel);
