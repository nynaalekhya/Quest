import React, { Component } from 'react';
import './JobApplyModal.css';
import { connect } from 'react-redux';
import axios from 'axios';
import serverUrl from '../../../config';
import {
  LowerNavBarOther,
  updateCompanyOverview,
  updateStudentProfile,
} from '../../../constants/action-types';

class JobApplyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Resumes: [],
      name: '',
      selectedResume: '',
      uploadedResume: '',
      uploadCoverLetter: '',
      errormsg: false,
    };
  }

  componentDidMount() {
    const name = this.props.studentInfoStore.studentProfile.Name;
    const Resumes = this.props.studentInfoStore.studentProfile.Resumes;
    const selectedResume = this.props.studentInfoStore.studentProfile.ResumePrimary
      ? this.props.studentInfoStore.studentProfile.ResumePrimary
      : '';
    this.setState({
      name,
      Resumes,
      selectedResume,
    });
  }

  onNameChangeHandeler = (event) => {
    this.setState({
      name: event.target.value,
      errormsg: false,
    });
  };

  selectResume = (e) => {
    this.setState({
      selectedResume: e.target.value,
      uploadedResume: '',
      errormsg: false,
    });
  };

  onChangeResumeHandler = (event) => {
    if (event.target.files.length === 1) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      event.preventDefault();
      let formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
      axios({
        method: 'post',
        url: serverUrl + 'student/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              uploadedResume: response.data,
              selectedResume: '',
              errormsg: false,
            });
          } else if (parseInt(response.status) === 400) {
          }
        })
        .catch((error) => {
          this.setState({
            errorMsg: error.message,
            authFlag: false,
          });
        });
    }
  };

  onChangeCoverLetterHandler = (event) => {
    if (event.target.files.length === 1) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      event.preventDefault();
      let formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
      axios({
        method: 'post',
        url: serverUrl + 'student/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              uploadCoverLetter: response.data,
              errormsg: false,
            });
          } else if (parseInt(response.status) === 400) {
          }
        })
        .catch((error) => {
          this.setState({
            errorMsg: error.message,
            authFlag: false,
          });
        });
    }
  };

  applyJob = (event) => {
    event.preventDefault();
    if (
      this.state.name === '' ||
      this.state.uploadCoverLetter === '' ||
      (this.state.selectedResume === '' && this.state.uploadedResume === '')
    ) {
      this.setState({
        errormsg: true,
      });
    } else {
      // event.preventDefault();
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      const data = {
        StudentID: localStorage.getItem('userId'),
        JobID: this.props.selectedJob._id,
        StudentName: this.state.name,
        ResumeURL: this.state.uploadedResume
          ? this.state.uploadedResume
          : this.state.selectedResume,
        CoverLetterURL: this.state.uploadCoverLetter,
        Ethnicity: this.props.studentInfoStore.studentProfile.Ethnicity,
        Gender: this.props.studentInfoStore.studentProfile.Gender,
        Disability: this.props.studentInfoStore.studentProfile.Disability,
        VeteranStatus: this.props.studentInfoStore.studentProfile.VeteranStatus,
      };
      axios.post(serverUrl + 'student/companyApplyJob', data).then(
        (response) => {
          if (response.status === 200) {
            this.props.toggle(event);
            let studentProfile = { ...this.props.studentInfoStore.studentProfile };
            studentProfile.AppliedJobs.push(this.props.selectedJob._id);
            const payload = {
              studentProfile,
            };
            this.props.updateStudentProfile(payload);
          }
        },
        (error) => {}
      );
    }
  };

  render() {
    const selectedJob = this.props.selectedJob;
    return (
      <div id="LoginModal">
        <div className="gdUserLogin gdGrid" data-test="authModalContainer">
          <div className="gd-ui-modal css-mgpgck">
            <div className="background-overlay" aria-label="Background Overlay"></div>
            <div className="modal_main actionBarMt0">
              <span alt="Close" className="SVGInline modal_closeIcon">
                <svg
                  onClick={(event) => this.props.toggle(event)}
                  className="SVGInline-svg modal_closeIcon-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <div className="topShadow"></div>
              <div className="fullContent">
                <div className="modal_title">
                  {selectedJob.Title} - {selectedJob.CompanyName}
                </div>
                <div className="modal_content">
                  <div className="signup  ">
                    <div>
                      <div
                        id="signupmodal"
                        style={{}}
                        className="mt-xsm mt-sm-md d-flex flex-column flex-sm-row flex-sm-wrap"
                      >
                        <div className=" pr-xxsm  pl-sm-std mw-400">
                          <div className="">
                            <form
                              name="application_form"
                              novalidate=""
                              action="/indeedapply/applyv2?hl=en_US"
                              method="POST"
                              enctype="multipart/form-data"
                            >
                              <input type="hidden" name="ms" />
                              <input type="hidden" name="autoString" />
                              <input type="hidden" name="requestTrackingUid" />
                              <div>
                                <div>
                                  <div className="ia-ApplyFormScreen-userFields">
                                    <div className="ia-UserFields">
                                      <div className="ia-UserFields-fragment"></div>
                                      <div className="ia-UserFields-secondary">
                                        <div className="ia-UserFields-fragment">
                                          <div className="icl-u-textSize6 icl-u-textColor--secondary icl-u-xs-mb--sm">
                                            * These fields are required
                                          </div>
                                          <div className="ia-ResumePreviewWithInputFields-container">
                                            <div className="ia-ResumePreviewWithInputFields-inputFields">
                                              <div>
                                                <div className="UserField-Name">
                                                  <div className="ia-TextInput">
                                                    <div className="icl-TextInput">
                                                      <div
                                                        id="label-input-applicant.name"
                                                        className="icl-TextInput-labelWrapper"
                                                      >
                                                        <label
                                                          className="icl-TextInput-label icl-TextInput-label--sm"
                                                          for="input-applicant.name"
                                                        >
                                                          <span>
                                                            <span>Name *</span>
                                                            <span className="icl-u-visuallyHidden">
                                                              (required)
                                                            </span>
                                                          </span>
                                                        </label>
                                                      </div>
                                                      <div className="icl-TextInput-wrapper">
                                                        <input
                                                          onChange={this.onNameChangeHandeler}
                                                          required="true"
                                                          type="text"
                                                          aria-labelledby="label-input-applicant.name"
                                                          id="input-applicant.name"
                                                          name="applicant.name"
                                                          className="icl-TextInput-control icl-TextInput-control--sm"
                                                          value={this.state.name}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="ia-ResumePreviewWithInputFields-inputFields">
                                              <div>
                                                <div className="UserField-Name">
                                                  <div className="ia-TextInput">
                                                    <div className="icl-TextInput">
                                                      <div
                                                        id="label-input-applicant.name"
                                                        className="icl-TextInput-labelWrapper"
                                                      >
                                                        <label
                                                          className="icl-TextInput-label icl-TextInput-label--sm"
                                                          for="input-applicant.name"
                                                        >
                                                          <span>
                                                            <span>Resume *</span>
                                                            <span className="icl-u-visuallyHidden">
                                                              (required)
                                                            </span>
                                                          </span>
                                                        </label>
                                                      </div>
                                                      <div className="icl-TextInput-wrapper">
                                                        <select
                                                          onChange={this.selectResume}
                                                          //   defaultValue={this.state.selectedResume}
                                                          required="true"
                                                          type="text"
                                                          aria-labelledby="label-input-applicant.name"
                                                          id="input-applicant.name"
                                                          name="applicant.name"
                                                          className="icl-TextInput-control icl-TextInput-control--sm"
                                                        >
                                                          {' '}
                                                          <option
                                                            className="Dropdown-menu"
                                                            key=""
                                                            value=""
                                                          ></option>
                                                          {this.state.Resumes.map((resume) => (
                                                            <option
                                                              selected={
                                                                resume === this.state.selectedResume
                                                              }
                                                              className="Dropdown-menu"
                                                              key={resume}
                                                              value={resume}
                                                            >
                                                              {resume.split(/[/ ]+/).pop()}
                                                            </option>
                                                          ))}
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="ia-FilePicker">
                                            <label
                                              className="ia-FilePicker-label"
                                              for="ia-FilePicker-resume"
                                            >
                                              <div className="ia-UserFieldLabel">
                                                <span>
                                                  <span>Resume *</span>
                                                  <span className="icl-u-visuallyHidden">
                                                    (required)
                                                  </span>
                                                </span>
                                              </div>
                                            </label>
                                            <div className="ia-FilePicker-inputContainer">
                                              <div className="ia-NewResumeFilePicker">
                                                <div className="ia-ControlledFilePicker ia-ControlledFilePicker--integrated">
                                                  <input
                                                    onChange={this.onChangeResumeHandler}
                                                    className="ia-ControlledFilePicker-control icl-u-visuallyHidden"
                                                    type="file"
                                                    name="applicant.fileUpload"
                                                    id="ia-CustomFilePicker-resume"
                                                    tabindex="0"
                                                    required=""
                                                    accept=".rtf,.pdf,.txt,.docx,.doc"
                                                  />
                                                  <label
                                                    className="ia-ControlledFilePicker-fakeControl ia-ControlledFilePicker-fakeControl--integrated"
                                                    for="ia-CustomFilePicker-resume"
                                                  >
                                                    Choose file
                                                  </label>
                                                  <span className="ia-ControlledFilePicker-info">
                                                    {this.state.uploadedResume
                                                      ? this.state.uploadedResume
                                                          .split(/[/ ]+/)
                                                          .pop()
                                                      : 'No file chosen'}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="icl-u-textSize6 icl-u-textColor--secondary icl-u-xs-my--sm"></div>
                                        </div>
                                        <div className="ia-AddCoverLetter">
                                          <button
                                            style={{
                                              border: '0',
                                              backgroundColor: 'transparent',
                                            }}
                                            className="icl-Button icl-Button--transparent icl-Button--sm ia-AddCoverLetter-button"
                                            size="sm"
                                            type="button"
                                          >
                                            <input
                                              style={{ visibility: 'hidden' }}
                                              onChange={this.onChangeCoverLetterHandler}
                                              className="ia-ControlledFilePicker-control icl-u-visuallyHidden"
                                              type="file"
                                              name="coverLetterPicker"
                                              id="coverLetterPicker"
                                              tabindex="0"
                                              required=""
                                              accept=".rtf,.pdf,.txt,.docx,.doc"
                                            />
                                            <label className="" for="coverLetterPicker">
                                              Add cover letter
                                            </label>
                                          </button>
                                          <span class="ia-ControlledFilePicker-info">
                                            {this.state.uploadCoverLetter
                                              ? this.state.uploadCoverLetter.split(/[/ ]+/).pop()
                                              : ' No file chosen'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ia-ApplyFormScreen-nonApplicationFields">
                                <div></div>
                                <div
                                  style={{ paddingLeft: '5rem' }}
                                  className="ia-FormActionButtons"
                                >
                                  <button
                                    className="icl-Button icl-Button--primary icl-Button--lg icl-u-xs-my--sm ia-FormActionButtons-continue"
                                    id="form-action-continue"
                                    size="lg"
                                    type="button"
                                    onClick={this.applyJob}
                                  >
                                    Submit
                                  </button>
                                  <a
                                    onClick={(event) => this.props.toggle(event)}
                                    id="form-action-cancel"
                                    className="icl-u-xs-ml--md"
                                    href="#"
                                  >
                                    Cancel
                                  </a>
                                </div>
                              </div>
                            </form>{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottomShadow"></div>
              <div className="actionBar">
                <div className="authFooter d-flex justify-content-center w-100pct mb-neg16 mt-lg">
                  <div style={{ color: 'red' }} className="center description py-xsm ">
                    {this.state.errormsg ? 'Please update all necessary fields to apply' : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default JobApplyModal;

const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  return {
    studentInfoStore,
  };
};

// export default CompanyPage;
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudentProfile: (payload) => {
      dispatch({
        type: updateStudentProfile,
        payload,
      });
    },
  };
};

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(JobApplyModal);
