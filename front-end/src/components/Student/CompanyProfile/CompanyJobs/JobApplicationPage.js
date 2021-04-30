import React, { Component } from 'react';
import {
  LowerNavBarOther,
  updateCompanyOverview,
  updateStudentProfile,
} from '../../../../constants/action-types';
import { connect } from 'react-redux';
import './JobApplicationPage.css';
import defaultplaceholder from '../CompanyNavbar/default-placeholder.png';
import axios from 'axios';
import serverUrl from '../../../../config';
import { Redirect } from 'react-router';

class JobApplicationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Company: {},
      Job: {},
      resume: { url: '', name: '' },
      coverLetter: { url: '', name: '' },
      errormsg: false,
      name: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('application_job_id') && localStorage.getItem('companyID')) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios
        .get(serverUrl + 'student/fillJobApplication', {
          params: {
            JobID: localStorage.getItem('application_job_id'),
            CompanyID: localStorage.getItem('companyID'),
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log('fill aplication: ', response.data);
          this.setState({
            Company: response.data.Company[0],
            Job: response.data.Job[0],
            name: this.props.studentInfoStore.studentProfile.Name,
          });
        });
    }
  }

  onChangeResumeHandler = (event) => {
    if (event.target.files.length === 1) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      event.preventDefault();
      let formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
      const resumeName = event.target.files[0].name;
      axios({
        method: 'post',
        url: serverUrl + 'student/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          // console.log('Status Code : ', response.status);
          if (response.status === 200) {
            // console.log('Product Saved');
            const resume = { url: response.data, name: resumeName };

            this.setState({
              resume,
              errormsg: false,
            });
          } else if (parseInt(response.status) === 400) {
            // console.log(response.data);
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
      const coverLetterName = event.target.files[0].name;
      axios({
        method: 'post',
        url: serverUrl + 'student/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          // console.log('Status Code : ', response.status);
          if (response.status === 200) {
            // console.log('Product Saved');
            const coverLetter = { url: response.data, name: coverLetterName };

            this.setState({
              coverLetter,
              errormsg: false,
            });
          } else if (parseInt(response.status) === 400) {
            // console.log(response.data);
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
      this.state.resume.name === '' ||
      this.state.coverLetter.name === '' ||
      this.state.name === ''
    ) {
      this.setState({
        errormsg: true,
      });
    } else {
      // event.preventDefault();
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      const data = {
        StudentID: localStorage.getItem('userId'),
        JobID: localStorage.getItem('application_job_id'),
        StudentName: this.state.name,
        ResumeURL: this.state.resume.url,
        CoverLetterURL: this.state.coverLetter.url,
        Ethnicity: this.props.studentInfoStore.studentProfile.Ethnicity,
        Gender: this.props.studentInfoStore.studentProfile.Gender,
        Disability: this.props.studentInfoStore.studentProfile.Disability,
        VeteranStatus: this.props.studentInfoStore.studentProfile.VeteranStatus,
      };
      axios.post(serverUrl + 'student/companyApplyJob', data).then(
        (response) => {
          console.log('Status Code : ', response.status);
          if (response.status === 200) {
            let studentProfile = { ...this.props.studentInfoStore.studentProfile };
            studentProfile.AppliedJobs.push(localStorage.getItem('application_job_id'));
            const payload = {
              studentProfile,
            };
            this.props.updateStudentProfile(payload);
            this.setState({
              resume: { url: '', name: '' },
              coverLetter: { url: '', name: '' },
              errormsg: false,
            });
          }
        },
        (error) => {
          console.log('error:', error.response);
        }
      );
    }
  };

  withdrawJob = (event) => {
    event.preventDefault();
    // console.log('withdraw job, jobid:', this.props.jobOonFocusStore.jobOonFocus._id);

    // event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      StudentID: localStorage.getItem('userId'),
      JobID: localStorage.getItem('application_job_id'),
    };
    axios.post(serverUrl + 'student/jobWithdraw', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // this.props.toggle(event);
          let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          const index = studentProfile.AppliedJobs.indexOf(
            localStorage.getItem('application_job_id')
          );
          if (index >= 0) {
            studentProfile.AppliedJobs.splice(index, 1);
          }
          const payload = {
            studentProfile,
          };
          this.props.updateStudentProfile(payload);
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  saveJob = (event) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      JobID: localStorage.getItem('application_job_id'),
      StudentID: localStorage.getItem('userId'),
    };
    axios.post(serverUrl + 'student/companyFavouriteJobs', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data);

          let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          studentProfile.FavouriteJobs.push(localStorage.getItem('application_job_id'));
          const payload = {
            studentProfile,
          };
          this.props.updateStudentProfile(payload);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  unsaveJob = (event) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      JobID: localStorage.getItem('application_job_id'),
      StudentID: localStorage.getItem('userId'),
    };
    axios.post(serverUrl + 'student/removeFavouriteJobs', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data);

          let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          var index = studentProfile.FavouriteJobs.indexOf(
            localStorage.getItem('application_job_id')
          );
          if (index !== -1) {
            studentProfile.FavouriteJobs.splice(index, 1);
          }
          // studentProfile.FavouriteJobs.push(JobID);
          const payload = {
            studentProfile,
          };
          this.props.updateStudentProfile(payload);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  onNameChangeHandeler = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'company') {
        return <Redirect to="/Employer" />;
      } else if (localStorage.getItem('userrole') === 'admin') {
        return <Redirect to="/AdminHomePage" />;
      } else if (
        !localStorage.getItem('companyID') ||
        !localStorage.getItem('application_job_id')
      ) {
        return <Redirect to="/Home" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    let avgRating = 0;
    if (this.state.Company.GeneralReviewCount > 0) {
      avgRating = Number(
        this.state.Company.TotalGeneralReviewRating / this.state.Company.GeneralReviewCount
      ).toFixed(1);
    }
    let alreadyApplied = false;
    if (
      this.props.studentInfoStore.studentProfile.AppliedJobs.includes(
        localStorage.getItem('application_job_id')
      )
    ) {
      alreadyApplied = true;
    }
    let alreadyFav = false;
    let heartIcon = (
      <path
        d="M12 5.11l.66-.65a5.56 5.56 0 017.71.19 5.63 5.63 0 010 7.92L12 21l-8.37-8.43a5.63 5.63 0 010-7.92 5.56 5.56 0 017.71-.19zm7.66 6.75a4.6 4.6 0 00-6.49-6.51L12 6.53l-1.17-1.18a4.6 4.6 0 10-6.49 6.51L12 19.58z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    );
    if (
      this.props.studentInfoStore.studentProfile.FavouriteJobs.includes(
        localStorage.getItem('application_job_id')
      )
    ) {
      alreadyFav = true;
      heartIcon = (
        <path
          d="M20.37 4.65a5.57 5.57 0 00-7.91 0l-.46.46-.46-.46a5.57 5.57 0 00-7.91 0 5.63 5.63 0 000 7.92L12 21l8.37-8.43a5.63 5.63 0 000-7.92z"
          fill="currentColor"
          fill-rule="evenodd"
        ></path>
      );
    }
    this.props.LowerNavBarOther();
    const defaultCoverPic =
      'https://s3-media0.fl.yelpcdn.com/assets/public/defaultBusinessHeaderImage.yji-a94634351a246719545b17b9bddc388f.png';

    const withdrawJob = (
      <div style={{ paddingTop: '14px' }} class="applyCTA gdGrid">
        <span style={{ fontSize: 'large' }} class="appliedOnMsg">
          Already Applied! want to{' '}
        </span>
        <span onClick={this.withdrawJob} style={{ fontSize: 'large' }}>
          <a>withdraw?</a>
        </span>
      </div>
    );
    return (
      <div class="gdGrid pageContentWrapperStudent ">
        <div style={{ width: '1024px' }} id="PageContent" class="">
          <div id="PageBodyContents" class="meat">
            <div id="JobView">
              <div class="css-1snhjc9 ejc001y0">
                <div id="EmpHero" class=" css-8phuvf et5pnof0">
                  <div
                    class="content css-1btihuh et5pnof1"
                    data-employer-id="100431"
                    data-test="company-banner"
                  >
                    <img
                      alt="Cover for Amazon"
                      class="lazy"
                      src={
                        this.state.Company.CoverPhoto
                          ? this.state.Company.CoverPhoto
                          : defaultCoverPic
                      }
                    />
                  </div>
                </div>
                <div class="" style={{}}>
                  <div style={{}}>
                    <div class="ctasTest d-block p-0 css-13kzq25 efy8art0">
                      <div class="d-flex flex-column px pt m-0 smarterBannerEmpInfo false">
                        <div class="d-flex">
                          <div class="d-flex pb css-29jl6 efy8art3">
                            <div class="css-f4rs18 css-7xi6we epu0oo20">
                              <a
                                class="mt-0 css-1sltc87 epu0oo21"
                                href="/Overview/Working-at-Amazon-EI_IE6036.11,17.htm"
                                target="_blank"
                              >
                                <span class="css-13u5hxa epu0oo22">
                                  <img
                                    alt="Amazon Logo"
                                    class="lazy"
                                    src={
                                      this.state.Company.ProfileImg
                                        ? this.state.Company.ProfileImg
                                        : defaultplaceholder
                                    }
                                  />
                                </span>
                              </a>
                            </div>
                            <div class="css-f4rs18 css-1e169oc efy8art2">
                              <div class="d-flex flex-column">
                                <div class="css-ur1szg e11nt52q0">
                                  <div class="css-16nw49e e11nt52q1">
                                    {this.state.Job.CompanyName}
                                    <span class="css-1pmc6te e11nt52q4">
                                      {avgRating}
                                      <span class="css-mfns2c e11nt52q5">★</span>
                                    </span>
                                  </div>
                                  <div class="css-17x2pwl e11nt52q6">{this.state.Job.Title}</div>
                                  <div class="css-1v5elnn e11nt52q2">
                                    {this.state.Job.City}, {this.state.Job.State}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="css-1yurns8 efy8art1">
                            <div class="css-radise een4i1m1">
                              <div class="css-1niemjw een4i1m0">
                                {alreadyApplied ? (
                                  withdrawJob
                                ) : (
                                  <div class="css-0 e1h54cx80">
                                    <a
                                      class="gd-ui-button applyButton e1ulk49s0 css-1m0gkmt"
                                      onClick={this.applyJob}
                                      href="#"
                                      rel="nofollow"
                                    >
                                      <i class="icon-offsite-white mr-sm"></i>
                                      <span>Apply Now</span>
                                      <i class="hlpr"></i>
                                    </a>
                                  </div>
                                )}
                                {alreadyApplied ? (
                                  ''
                                ) : (
                                  <div style={{ paddingLeft: '16px' }} class="css-0 e1h54cx80">
                                    <a
                                      class="gd-ui-button applyButton e1ulk49s0 css-1m0gkmt"
                                      href="#"
                                      rel="nofollow"
                                    >
                                      <label style={{ width: '100%' }} for="resumeUpload">
                                        <span>Upload Resume</span>

                                        <input
                                          onChange={this.onChangeResumeHandler}
                                          id="resumeUpload"
                                          name="resumeUpload"
                                          type="file"
                                          aria-labelledby="submit"
                                          class="hidden"
                                          accept=".doc, .docx,.pdf"
                                        />
                                      </label>
                                    </a>
                                  </div>
                                )}
                                {alreadyApplied ? (
                                  ''
                                ) : (
                                  <div style={{ paddingLeft: '16px' }} class="css-0 e1h54cx80">
                                    <a
                                      class="gd-ui-button applyButton e1ulk49s0 css-1m0gkmt"
                                      href="#"
                                      rel="nofollow"
                                    >
                                      <label style={{ width: '100%' }} for="coverLetterUpload">
                                        <span>Upload Cover Letter</span>

                                        <input
                                          onChange={this.onChangeCoverLetterHandler}
                                          id="coverLetterUpload"
                                          name="coverLetterUpload"
                                          type="file"
                                          aria-labelledby="submit"
                                          class="hidden"
                                          accept=".doc, .docx,.pdf"
                                        />
                                      </label>
                                    </a>
                                  </div>
                                )}
                                <div class="css-3nnrip et4swdz0">
                                  <button
                                    onClick={
                                      alreadyFav
                                        ? (event) => this.unsaveJob(event)
                                        : (event) => this.saveJob(event)
                                    }
                                    // onClick={(event) => this.props.saveJob(event)}
                                    class="gd-ui-button save-job-button gradient fillMob hideHH css-3ybntp"
                                    data-test="desktop-btn"
                                  >
                                    <span class="SVGInline heart unsave mr-xsm">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                      >
                                        {heartIcon}
                                      </svg>
                                    </span>
                                    <span>Saved</span>
                                    <i class="hlpr"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="css-15asexb e18tf5om0">
                <div class="css-u9c4ai e18tf5om1">
                  <span class="css-fdajvm e18tf5om5">Job Application Files </span>
                  {this.state.errormsg ? (
                    <span style={{ color: 'red' }} class="css-fdajvm e18tf5om5">
                      Missing fields
                    </span>
                  ) : (
                    ''
                  )}
                  <div class="css-qiuq2n e18tf5om3"></div>
                  <div class="css-1hb8zec e18tf5om2">
                    <div>
                      <div class="css-1ieo3ql e18tf5om7">
                        <span class="css-1vg6q84 e18tf5om6">Name:&nbsp;</span>
                        <span class="css-sr4ps0 e18tf5om4">
                          <div style={{ width: '180px' }} className="icl-TextInput-wrapper">
                            <input
                              style={{ minWidth: '180px', height: '22px' }}
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
                        </span>
                      </div>
                      <div class="css-1ieo3ql e18tf5om7">
                        <span class="css-1vg6q84 e18tf5om6">Resume: &nbsp;</span>
                        <span class="css-sr4ps0 e18tf5om4">{this.state.resume.name}</span>
                      </div>
                      <div class="css-1ieo3ql e18tf5om7">
                        <span class="css-1vg6q84 e18tf5om6">Cover Letter:&nbsp;</span>
                        <span class="css-o4d739 e18tf5om4">{this.state.coverLetter.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="css-15asexb e18tf5om0">
                <div class="css-u9c4ai e18tf5om1">
                  <span class="css-fdajvm e18tf5om5">Job &amp; Company Insights</span>
                  <div class="css-qiuq2n e18tf5om3"></div>
                  <div class="css-1hb8zec e18tf5om2">
                    <div>
                      <div class="css-1ieo3ql e18tf5om7">
                        <span class="css-1vg6q84 e18tf5om6">Job Type:&nbsp;</span>
                        <span class="css-sr4ps0 e18tf5om4">{this.state.Job.JobType}</span>
                      </div>
                      <div class="css-1ieo3ql e18tf5om7">
                        <span class="css-1vg6q84 e18tf5om6">Job Function:&nbsp;</span>
                        <span class="css-o4d739 e18tf5om4">{this.state.Job.Title}</span>
                      </div>
                    </div>
                    <div>
                      <div class="css-1ieo3ql e18tf5om7">
                        <span class="css-1vg6q84 e18tf5om6">Industry:&nbsp;</span>
                        <span class="css-sr4ps0 e18tf5om4">{this.state.Job.Industry}</span>
                      </div>
                      <div class="css-1ieo3ql e18tf5om7">
                        <span class="css-1vg6q84 e18tf5om6">Size:&nbsp;</span>
                        <span class="css-sr4ps0 e18tf5om4">
                          {this.state.Company.Size}+ Employees
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="css-jfggi0 e1eh6fgm2">
                <div>
                  <div id="JobDescriptionContainer" class="tabSection p-std mt-0">
                    <div id="JobDesc3738626687" class="css-ndcerj ecgq1xb3">
                      <div class="desc css-58vpdc ecgq1xb4">
                        <b>Job Description</b>
                        <br />
                        <br />
                        {this.state.Job.JobDescription}
                        <br />
                        <br />
                        <b>Job Responsilities</b>
                        <br />
                        <br />
                        {this.state.Job.Responsibilities}
                        <br />
                        <br />
                        <b>Basic Qualifications</b>
                        <br />
                        <br />
                        {this.state.Job.Qualifications}
                      </div>
                    </div>
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

// export default JobApplicationPage;

const mapStateToProps = (state) => {
  const { companyNavbarStore } = state.CompanyResultPageReducer;
  const { companyOverviewStore } = state.CompanyPageReducer;
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  return {
    companyNavbarStore,
    companyOverviewStore,
    studentInfoStore,
  };
};

// export default CompanyPage;
const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
    updateCompanyOverview: (payload) => {
      dispatch({
        type: updateCompanyOverview,
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
export default connect(mapStateToProps, mapDispatchToProps)(JobApplicationPage);
