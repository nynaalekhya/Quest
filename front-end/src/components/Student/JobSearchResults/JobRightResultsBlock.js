/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import JobCompany from './JobCompany';
import JobFeaturedReview from './JobFeaturedReview';
import JobInfo from './JobInfo';
import './JobRightResultsBlock.css';
import { connect } from 'react-redux';
import axios from 'axios';
import serverUrl from '../../../config';
import { updateStudentProfile } from '../../../constants/action-types';

class JobRightResultsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOpened: 'Job', JobStatus: '' };
  }

  getStatus = () => {
    debugger;
    if (
      this.props.studentInfoStore.studentProfile.AppliedJobs.includes(
        this.props.jobOonFocusStore.jobOonFocus._id
      )
    ) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios
        .get(serverUrl + 'student/jobStatus', {
          params: {
            JobID: this.props.jobOonFocusStore.jobOonFocus._id,
            StudentID: localStorage.getItem('userId'),
          },
          withCredentials: true,
        })
        .then(
          (response) => {
            console.log('job status:', response.data);
            return response.data[0].Status;
            // this.setState({
            //   JobStatus: response.data[0].Status,
            // });
            // let interviewSearchList = response.data.returns.map((inter) => {
            //   return { ...inter.Interview, ProfileImg: inter.ProfileImg };
            // });
            // let payload = {
            //   interviewSearchList: interviewSearchList,
            //   PageNo,
            //   PageCount: Math.ceil(response.data.count / 10),
            //   Totalcount: response.data.count,
            //   // PageCount: Math.ceil(response.data.Totalcount / 3),
            // };
            // this.props.updateInterviewList(payload);
          },
          (error) => {
            return '';
          }
        );
    }
  };

  tabChange = (event, tabOpened) => {
    this.setState({
      tabOpened,
    });
  };

  withdrawJob = (event) => {
    event.preventDefault();

    // event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      StudentID: localStorage.getItem('userId'),
      JobID: this.props.jobOonFocusStore.jobOonFocus._id,
    };
    axios.post(serverUrl + 'student/jobWithdraw', data).then(
      (response) => {
        if (response.status === 200) {
          // this.props.toggle(event);
          let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          const index = studentProfile.AppliedJobs.indexOf(
            this.props.jobOonFocusStore.jobOonFocus._id
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
      (error) => {}
    );
  };

  render() {
    const defaultCoverPic =
      'https://s3-media0.fl.yelpcdn.com/assets/public/defaultBusinessHeaderImage.yji-a94634351a246719545b17b9bddc388f.png';

    const selectedJob = { ...this.props.jobOonFocusStore.jobOonFocus };
    let alreadyFav = false;
    let heartIcon = (
      <path
        d="M12 5.11l.66-.65a5.56 5.56 0 017.71.19 5.63 5.63 0 010 7.92L12 21l-8.37-8.43a5.63 5.63 0 010-7.92 5.56 5.56 0 017.71-.19zm7.66 6.75a4.6 4.6 0 00-6.49-6.51L12 6.53l-1.17-1.18a4.6 4.6 0 10-6.49 6.51L12 19.58z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    );
    if (this.props.studentInfoStore.studentProfile.FavouriteJobs.includes(selectedJob._id)) {
      alreadyFav = true;
      heartIcon = (
        <path
          d="M20.37 4.65a5.57 5.57 0 00-7.91 0l-.46.46-.46-.46a5.57 5.57 0 00-7.91 0 5.63 5.63 0 000 7.92L12 21l8.37-8.43a5.63 5.63 0 000-7.92z"
          fill="currentColor"
          fill-rule="evenodd"
        ></path>
      );
    }

    let avgRating = 0;
    if (
      selectedJob.jobdetails.length > 0 &&
      selectedJob.jobdetails[0].GeneralReviewCount &&
      selectedJob.jobdetails[0].GeneralReviewCount > 0 &&
      selectedJob.jobdetails[0].TotalGeneralReviewRating &&
      selectedJob.jobdetails[0].TotalGeneralReviewRating > 0
    ) {
      avgRating = (
        selectedJob.jobdetails[0].TotalGeneralReviewRating /
        selectedJob.jobdetails[0].GeneralReviewCount
      ).toFixed(1);
    }

    let showBlock = <JobInfo selectedJob={selectedJob} />;
    if (this.state.tabOpened === 'Company') {
      showBlock = <JobCompany selectedJob={selectedJob} />;
    } else if (this.state.tabOpened === 'Reviews') {
      showBlock = <JobFeaturedReview selectedJob={selectedJob} />;
    }
    let alreadyApplied = false;

    if (this.props.studentInfoStore.studentProfile.AppliedJobs.includes(selectedJob._id)) {
      // const JobStatus = this.getStatus();
      // console.log(JobStatus);
      alreadyApplied = true;
    }
    const withdrawJob = (
      <div>
        {this.props.jobOonFocusStore.jobOonFocus.Status !== 'Hired' ? (
          <div style={{ paddingTop: '5px' }} class="applyCTA gdGrid">
            <span style={{ fontSize: 'large' }} class="appliedOnMsg">
              Already Applied! want to{' '}
            </span>
            <span onClick={this.withdrawJob} style={{ fontSize: 'large' }}>
              <a>withdraw?</a>
            </span>
          </div>
        ) : (
          ''
        )}
        <div style={{ paddingTop: '5px' }} class="applyCTA gdGrid">
          <span style={{ fontSize: 'large' }} class="appliedOnMsg">
            Application Status:{' '}
          </span>
          <span style={{ fontSize: 'large' }}>
            <strong>
              {this.props.jobOonFocusStore.jobOonFocus.Status
                ? this.props.jobOonFocusStore.jobOonFocus.Status
                : 'Submitted'}
            </strong>
          </span>
        </div>
      </div>
    );
    return (
      <div id="JDCol" className="noPad opened">
        <div id="JDWrapper">
          <article className="jobDetails scrollable active" data-id="3360350142">
            <div className="jobViewMinimal">
              <div className="intersection-visible-wrapper">
                <div
                  id="HeroHeaderModule"
                  data-brandviews="BRAND:n=jsearch-hero-header:eid=1277356:jlid=3360350142"
                >
                  <div id="HeroHeaderModuleTop"></div>
                  <div id="CompanyBannerWrap" className="">
                    <div id="CompanyBanner" className="content">
                      <img
                        alt="Cover for RoadRunner Recycling"
                        // src={
                        //   selectedJob.jobdetails.length > 0
                        //     ? selectedJob.jobdetails[0].ProfileImg
                        //     : ''
                        // }
                        src={
                          selectedJob.jobdetails.length > 0
                            ? selectedJob.jobdetails[0].CoverPhoto
                              ? selectedJob.jobdetails[0].CoverPhoto
                              : defaultCoverPic
                            : defaultCoverPic
                        }
                      />
                    </div>
                  </div>
                  <div className="empWrapper ctasTest">
                    <div className="empInfo newDetails">
                      <div className="employerName">
                        {selectedJob.CompanyName}
                        <span className="rating">
                          {avgRating}
                          <span className="ratingStar"></span>
                        </span>
                      </div>
                      <div className="title">{selectedJob.Title}</div>
                      <div className="location">
                        {selectedJob.StreetAddress}, {selectedJob.State}
                      </div>
                      <div className="salary">
                        <span className="css-1uyte9r css-hca4ks e1wijj242">
                          {selectedJob.ExpectedSalary}${' '}
                          <span className="css-0 e1wijj240">(Salary Range.)</span>
                          <span className="SVGInline greyInfoIcon">
                            <svg
                              className="SVGInline-svg greyInfoIcon-svg"
                              height="14"
                              viewBox="0 0 14 14"
                              width="14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 14A7 7 0 117 0a7 7 0 010 14zm0-.7A6.3 6.3 0 107 .7a6.3 6.3 0 000 12.6zm-.7-7a.7.7 0 011.4 0v4.2a.7.7 0 01-1.4 0zM7 4.2a.7.7 0 110-1.4.7.7 0 010 1.4z"
                                fill="#505863"
                                fill-rule="evenodd"
                              ></path>
                            </svg>
                          </span>
                          <div className="hidden"></div>
                        </span>
                      </div>
                    </div>
                    <div className="actionSection">
                      <div className="ctasWrap">
                        <div className="ctas2 withHideJob">
                          {alreadyApplied ? (
                            withdrawJob
                          ) : (
                            <div
                              onClick={(event) => this.props.toggle(event)}
                              className="applyCTA gdGrid"
                            >
                              <a
                                className="gd-ui-button noMargRt fillMob d-flex align-items-center justify-content-center applyButton e113dz0m0 css-1c58wfr"
                                href="#"
                                target=""
                                // data-adv-type="EMPLOYER"
                                // data-apply-type=""
                                // data-easy-apply="false"
                                // data-is-organic-job="false"
                                // data-is-sponsored-job="true"
                                // data-job-id="3360350142"
                                // data-job-url="#"
                                rel="nofollow"
                              >
                                <i className="icon-offsite-white margRtSm"></i>
                                <span>Apply Now</span>
                                <i className="hlpr"></i>
                              </a>
                            </div>
                          )}
                          <div className="saveCTA">
                            <button
                              // onClick={(event) =>
                              //   this.props.saveJob(event, selectedJob._id /**JobID */)
                              // }
                              onClick={
                                alreadyFav
                                  ? (event) => this.props.unsaveJob(event, selectedJob._id)
                                  : (event) => this.props.saveJob(event, selectedJob._id)
                              }
                              className="gd-btn gd-btn-2 gd-btn-icon fillMob save-job-button-3360350142"
                              data-ao-id="1131672"
                              data-job-id="3360350142"
                              data-save-hook="JOB_SEARCH_PANE"
                              data-saved-job-id="0"
                              type="button"
                            >
                              <span className="SVGInline heart save margRtXs css-zve8bc">
                                <svg
                                  className="SVGInline-svg heart-svg save-svg margRtXs-svg css-zve8bc-svg"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  {heartIcon}
                                </svg>
                              </span>
                              <span>Save</span>
                            </button>
                            <div className="saveTooltip hidden">
                              <div className="msg">
                                <span className="close"></span>
                                <p className="caption">Save this job for later</p>
                                <p className="subtext">
                                  Easily keep track of jobs you like that you can't apply to right
                                  now
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="css-mwdmnn e9i34c90"></div>
                      </div>
                    </div>
                  </div>
                  <div className="css-17lrvax epgue5a2">
                    <div className="css-bhqyka epgue5a3">
                      <h3 className="css-4t3aaj epgue5a4">Job &amp; Company Insights</h3>
                      <div className="css-dqdcxk epgue5a5">
                        <strong>Job Type:</strong> {selectedJob.JobType}
                      </div>
                      <div className="css-dqdcxk epgue5a5">
                        <strong>Job Function:</strong>{' '}
                        <span className="css-10iahqc"> {selectedJob.Title}</span>
                      </div>
                      <div className="css-dqdcxk epgue5a5">
                        <strong>Industry:</strong>{' '}
                        {selectedJob.jobdetails.length > 0
                          ? selectedJob.jobdetails[0].Industry
                          : ''}
                      </div>
                      <div className="css-dqdcxk epgue5a5">
                        <strong>Size:</strong>{' '}
                        {selectedJob.jobdetails.length > 0 ? selectedJob.jobdetails[0].Size : ''}{' '}
                        Employees approx.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="Details">
                <div className="jobDetailsInfoWrap">
                  <div className="jobDetailsHeader jobDetailsTabs">
                    <div className="scrollableTabContainer">
                      <div className="scrollableTabs">
                        <div
                          onClick={(event) => this.tabChange(event, 'Job')}
                          className={this.state.tabOpened === 'Job' ? 'tab active' : 'tab'}
                          data-test="tab"
                          data-tab-type="job"
                        >
                          <span>Job</span>
                        </div>
                        <div
                          onClick={(event) => this.tabChange(event, 'Company')}
                          className={this.state.tabOpened === 'Company' ? 'tab active' : 'tab'}
                          data-test="tab"
                          data-tab-type="overview"
                        >
                          <span>Company</span>
                        </div>
                        <div
                          onClick={(event) => this.tabChange(event, 'Reviews')}
                          className={this.state.tabOpened === 'Reviews' ? 'tab active' : 'tab'}
                          data-test="tab"
                          data-tab-type="reviews"
                        >
                          <span>Reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>{showBlock}</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  const { jobOonFocusStore } = state.JobSearchPageReducer;
  return {
    studentInfoStore,
    jobOonFocusStore,
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(JobRightResultsBlock);

// export default JobRightResultsBlock;
