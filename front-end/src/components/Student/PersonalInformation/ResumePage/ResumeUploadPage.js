import React, { Component } from 'react';
import './ResumeUploadPage.css';
import { Redirect } from 'react-router-dom';
import { history } from '../../../../App';
import { openProfileTabOnClick } from '../../../../constants/action-types';
import { connect } from 'react-redux';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updateStudentProfile } from '../../../../constants/action-types';

class ResumeUploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      redirect: null,
      msg: false,
      showPromaryButton: false,
      msg2: false,
      savedResumeUrl: null,
    };
  }

  onchangeFileHandler = (event) => {
    if (event.target.files.length === 1) {
      console.log('file: ', event.target.files[0].name);
      this.setState({
        file: event.target.files[0],
        showPromaryButton: false,
        msg2: false,
        savedResumeUrl: null,
      });
    } else {
      this.setState({ file: null, showPromaryButton: false, msg2: false, savedResumeUrl: null });
    }
  };

  openResumePage = (event) => {
    history.push('/Profile');

    localStorage.setItem('openTab', 'Resumes');
    let payload = { openTab: 'Resumes' };
    this.props.openProfileTabOnClick(payload);
  };

  uploadResume = (event) => {
    event.preventDefault();
    if (this.state.file !== null) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      let formData = new FormData();
      formData.append('file', this.state.file, this.state.file.name);
      formData.append('StudentID', localStorage.getItem('userId'));
      axios({
        method: 'post',
        url: serverUrl + 'student/resumesAdd',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          // console.log('Status Code : ', response.status);
          if (response.status === 200) {
            // console.log('Product Saved');

            this.setState({
              file: null,
              msg: true,
              showPromaryButton: true,
              savedResumeUrl: response.data,
            });
            let studentProfile = { ...this.props.studentInfoStore.studentProfile };
            studentProfile.Resumes.push(response.data);
            const payload = {
              studentProfile,
            };
            this.props.updateStudentProfile(payload);
          } else if (parseInt(response.status) === 400) {
            // console.log(response.data);
          }
        })
        .catch((error) => {
          this.setState({
            msg: true,
          });
        });
    }
  };

  updatePrimaryResume = (event) => {
    event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    let student = { ...this.props.studentInfoStore.studentProfile };
    student.ResumePrimary = this.state.savedResumeUrl;
    axios.post(serverUrl + 'student/profileUpdate', student).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          // studentProfile.AppliedJobs.push(this.props.selectedJob._id);
          this.setState({
            file: null,
            msg: false,
            showPromaryButton: false,
            savedResumeUrl: null,
            msg2: true,
          });
          const payload = {
            studentProfile: student,
          };
          this.props.updateStudentProfile(payload);
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <body className="main flex loggedIn lang-en en-US hollywood  _initOk noTouch desktop">
        {/* <Navbar />*/}
        <div class="pageContentWrapper ">
          <div id="UserProfilePageContent" class="">
            <div id="UserProfile" class="gdGrid container">
              <div class="css-1tgr9d eds5rs80">
                <div class="m-md-xxl m-std">
                  <article class="resumeImportStyle__resumeImportContainer___17nYQ">
                    <div class="p-0 relative">
                      <div class="profileHeaderStyle__profileHeader___1PFKD">
                        <div>
                          <div
                            data-test="coverImageContainer"
                            class="profileHeaderStyle__coverImageContainer___3Wlzw defaultCoverImage"
                          >
                            <div class="profileHeaderStyle__profileImageContainer___r2JtV">
                              <div
                                id="ProfileImage"
                                data-test="profileImageEditableContainer"
                                class="profileHeaderStyle__profileImageEditableContainer___FBk86"
                              >
                                <span class="SVGInline">
                                  <svg
                                    class="SVGInline-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 49 49"
                                    role="img"
                                    aria-labelledby="SVGInline-0-title"
                                  >
                                    <title id="SVGInline-0-title">Profile&nbsp;Image</title>
                                    <desc>Profile&nbsp;Image</desc>
                                    <defs>
                                      <path
                                        d="M24.5 48.35c13.172 0 23.85-10.678 23.85-23.85S37.672.65 24.5.65.65 11.328.65 24.5 11.328 48.35 24.5 48.35z"
                                        id="prefix__a"
                                      ></path>
                                    </defs>
                                    <g fill="none" fill-rule="evenodd">
                                      <path
                                        d="M24.5 32.45c7.96 0 14.748 5.013 17.38 12.054A26.398 26.398 0 0124.5 51c-6.65 0-12.728-2.45-17.38-6.496 2.632-7.04 9.42-12.054 17.38-12.054zm0-23.85c5.854 0 10.6 4.746 10.6 10.6 0 5.854-4.746 10.6-10.6 10.6-5.854 0-10.6-4.746-10.6-10.6 0-5.854 4.746-10.6 10.6-10.6z"
                                        fill="#056B27"
                                        mask="url(#prefix__b)"
                                      ></path>
                                    </g>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div id="resumeUploadPage" class="row mx-0">
                          <div class="d-none d-md-block col-md-4">
                            <a href="#" onClick={this.openResumePage}>
                              <button
                                class="gd-ui-button m-0 p-0 d-flex justify-content-start align-items-center resumeImportStyle__backBtn___3NR7k css-1c2vj07"
                                data-test="backBtn"
                              >
                                <span class="SVGInline mr-xsm backIcon">
                                  <svg
                                    class="SVGInline-svg mr-xsm-svg backIcon-svg"
                                    style={{ width: '10px', height: '12px' }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 10 13"
                                    width="24"
                                  >
                                    <path
                                      stroke-width="2"
                                      d="M9 1L2 6.5 9 12"
                                      fill="none"
                                      stroke="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                                <span>Back</span>
                              </button>
                            </a>
                          </div>
                          <div class="col-12 col-md-4">
                            <div class="">
                              <span>
                                <div class="">
                                  <div class="mb-xxl">
                                    <h1 class="mt-0 mb-xsm resumeImportStyle__heading___1RVvh">
                                      Upload Your Resume
                                    </h1>
                                    <p class="mt-0 resumeImportStyle__caption___38oQb">
                                      Supported file types are: PDF, DOCX, DOC and TXT.
                                    </p>
                                  </div>
                                  <div class="mb-xxl">
                                    <div class="d-flex flex-column justify-content-center align-items-center d-md-block flex-md-row">
                                      <div class="d-block d-md-none FileSelectStyle__fileSelectContainer___1DTiu">
                                        <div class="d-flex justify-content-center align-items-center">
                                          <label
                                            class="d-flex justify-content-center align-items-center FileSelectStyle__selectBtn___11LMC"
                                            data-test="selectFileBtn"
                                            for="resumeSelect"
                                          >
                                            <span class="SVGInline resumeIcon">
                                              <svg
                                                class="SVGInline-svg resumeIcon-svg"
                                                style={{ width: '24px', height: '24px' }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="2 2 20 20"
                                              >
                                                <path
                                                  d="M16 2l4 5h-4zm-6 2.5a2 2 0 00-1.15 3.64 4.14 4.14 0 00-2.74 2.43A.91.91 0 006 11a1 1 0 00.88 1H13a.91.91 0 00.43-.1 1 1 0 00.47-1.33 4.14 4.14 0 00-2.74-2.43A2 2 0 0010 4.5zM17.5 15h-11a.5.5 0 00-.09 1H17.5a.5.5 0 000-1zm0 3h-11a.5.5 0 00-.09 1H17.5a.5.5 0 000-1zM15 2v5a1 1 0 001 1h4v13a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"
                                                  fill="currentColor"
                                                  fill-rule="evenodd"
                                                ></path>
                                              </svg>
                                            </span>
                                            <span class="ml-xxsm">Select File</span>
                                            <input
                                              onChange={this.onchangeFileHandler}
                                              class="FileSelectStyle__hidden___3GP5h"
                                              type="file"
                                              id="resumeSelect"
                                              name="resumeSelect"
                                              accept=".docx,.doc,.pdf,.txt"
                                            />
                                          </label>
                                        </div>
                                      </div>
                                      <div class="d-none d-md-block">
                                        <div class=" FileSelectStyle__desktop___2yYuv css-rh65zj">
                                          <label for="resumeSelect" tabindex="0">
                                            <input
                                              onChange={this.onchangeFileHandler}
                                              type="file"
                                              name="resumeSelect"
                                              accept=".docx,.doc,.pdf,.txt"
                                              id="resumeSelect"
                                              style={{ display: 'none' }}
                                            />
                                            {this.state.file === null ? (
                                              <div class="m-0 d-flex flex-column justify-content-center align-items-center FileSelectStyle__selectedFile___1oIf1">
                                                <span class="SVGInline mb-xl uploadIcon">
                                                  <svg
                                                    class="SVGInline-svg mb-xl-svg uploadIcon-svg"
                                                    style={{ width: '72px', height: '72px' }}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="91"
                                                    height="90"
                                                    viewBox="0 0 91 90"
                                                  >
                                                    <path
                                                      d="M70 71.286a1 1 0 012 0v8.572c0 5.317-5.086 9.761-10.786 9.761H10.16C4.562 89.62 0 85.257 0 79.858V17.381c0-5.4 4.562-9.762 10.16-9.762h39.789a1 1 0 110 2H10.16C5.647 9.62 2 13.106 2 17.381v62.477c0 4.274 3.647 7.761 8.16 7.761h51.054c4.651 0 8.786-3.613 8.786-7.761v-8.572zm-57-36.7h34a1 1 0 010 2H13a1 1 0 110-2zm0 12h46a1 1 0 010 2H13a1 1 0 110-2zm0 12h46a1 1 0 010 2H13a1 1 0 110-2zm0 12h46a1 1 0 010 2H13a1 1 0 110-2zm59-67.22v57.22a1 1 0 11-2 0V3.463L53.371 20.092a1 1 0 11-1.414-1.414L70.342.293a1 1 0 011.414 0l18.385 18.385a1 1 0 01-1.414 1.414L72 3.365z"
                                                      fill="currentColor"
                                                      fill-rule="evenodd"
                                                    ></path>
                                                  </svg>
                                                </span>
                                                <div class="mt-0 mb-xl mx-0 undefined"></div>
                                                <div
                                                  class="m-0 FileSelectStyle__replaceBtn___1budq"
                                                  data-test="selectFileBtn"
                                                >
                                                  Choose a File to Upload
                                                </div>
                                              </div>
                                            ) : (
                                              <div class="m-0 d-flex flex-column justify-content-center align-items-center FileSelectStyle__selectedFile___1oIf1">
                                                <span class="SVGInline mb resumeIcon">
                                                  <svg
                                                    class="SVGInline-svg mb-svg resumeIcon-svg"
                                                    style={{ width: '64px', height: '80px' }}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="2 2 20 20"
                                                  >
                                                    <path
                                                      d="M16 2l4 5h-4zm-6 2.5a2 2 0 00-1.15 3.64 4.14 4.14 0 00-2.74 2.43A.91.91 0 006 11a1 1 0 00.88 1H13a.91.91 0 00.43-.1 1 1 0 00.47-1.33 4.14 4.14 0 00-2.74-2.43A2 2 0 0010 4.5zM17.5 15h-11a.5.5 0 00-.09 1H17.5a.5.5 0 000-1zm0 3h-11a.5.5 0 00-.09 1H17.5a.5.5 0 000-1zM15 2v5a1 1 0 001 1h4v13a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"
                                                      fill="currentColor"
                                                      fill-rule="evenodd"
                                                    ></path>
                                                  </svg>
                                                </span>
                                                <div class="mt-0 mx-0 mb-xl px d-flex justify-content-center align-items-center FileSelectStyle__fileContainer___1iSp8">
                                                  <div
                                                    class="m-0 FileSelectStyle__fileName___2PbC3"
                                                    data-test="selectedFileNameText"
                                                    title="PranjaSagar_Resume.pdf"
                                                  >
                                                    {this.state.file.name}
                                                  </div>
                                                </div>
                                                <div
                                                  class="m-0 FileSelectStyle__replaceBtn___1budq"
                                                  data-test="replaceFileBtn"
                                                >
                                                  Replace
                                                </div>
                                              </div>
                                            )}{' '}
                                            <span class="SVGInline">
                                              <svg
                                                class="SVGInline-svg"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="34"
                                                height="31"
                                                viewBox="0 0 34 31"
                                              >
                                                <g
                                                  fill="none"
                                                  fill-rule="evenodd"
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2"
                                                >
                                                  <path d="M22.608 19.946h5.577c2.56-.183 4.48-2.283 4.48-4.93 0-2.466-1.828-4.475-4.205-4.84v-.365a8.579 8.579 0 00-8.595-8.583c-3.108 0-5.851 1.735-7.405 4.2-.64-.456-1.463-.73-2.377-.73-2.012 0-3.658 1.37-4.023 3.195-2.835.548-4.937 3.014-4.937 5.935 0 3.196 2.468 5.752 5.577 6.026h4.48m5.774-9.267v19.402"></path>
                                                  <path d="M12.78 14.24l4.114-4.11 4.114 4.11"></path>
                                                </g>
                                              </svg>
                                            </span>
                                            <a class="gd-ui-button  css-3ybntp">
                                              Choose a File to Upload
                                            </a>
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ flexDirection: 'column' }}
                                      class="d-flex justify-content-center css-y1gt6f e5i7ex40"
                                    >
                                      {this.state.msg ? (
                                        <span style={{ textAlign: 'center' }}>
                                          Image Uploaded Succesfully!!!
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      {this.state.msg2 ? (
                                        <span style={{ textAlign: 'center' }}>
                                          Primary Resume Updated!!!
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                      <button
                                        style={{ marginTop: '10px' }}
                                        onClick={this.uploadResume}
                                        class="gd-ui-button d-none d-md-block css-uk8w9o"
                                        data-test="uploadResumeBtn"
                                        disabled={this.state.file === null}
                                      >
                                        Upload Resume
                                      </button>
                                    </div>
                                    {this.state.showPromaryButton ? (
                                      <div
                                        style={{ flexDirection: 'column' }}
                                        class="d-flex justify-content-center css-y1gt6f e5i7ex40"
                                      >
                                        <button
                                          style={{ marginTop: '10px' }}
                                          onClick={this.updatePrimaryResume}
                                          class="gd-ui-button d-none d-md-block css-uk8w9o"
                                          data-test="uploadResumeBtn"
                                          disabled={this.state.savedResumeUrl === null}
                                        >
                                          Make last uploaded resume as primary
                                        </button>
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div class="d-none d-md-block col-md-4"></div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

// export default ResumeUploadPage;
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  return {
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

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(ResumeUploadPage);
