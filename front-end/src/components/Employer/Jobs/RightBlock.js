import React, { Component } from 'react';
import './RightBlock.css';
import axios from 'axios';
import serverUrl from '../../../config.js';
import { connect } from 'react-redux';
import {
  showApplicantsModal,
  hideApplicantsModal,
  updateApplicantsList,
} from '../../../constants/action-types';
import ApplicantsList from './ApplicantsList';
//import './../LandingPage/EmployerHome.css';

class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDetails: {},
    };
  }

  fetchApplicants = (PageNo = 0) => {
    console.log('inside componenet did mount');
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'company/jobsApplications', {
        params: {
          JobID: this.props.jobSelectStore.jobsInfo._id,
          applicationPageNo: PageNo,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log('getapplicants', response);
        if (response.data.length > 1) {
          let payload1 = {
            applicantsList: response.data[0],
            PageNo,
            PageCount: Math.ceil(response.data[1][0].TotalCount / 10),
            Totalcount: response.data[1][0].TotalCount,
            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          console.log('payload', payload1);
          this.props.updateApplicantsList(payload1);
        } else {
          localStorage.setItem('message', response.data);
        }
      })
      .catch((error) => {
        console.log('error', error.status);
        let payload1 = {
          applicantsList: [],
          PageNo: 0,
          PageCount: 5,
          Totalcount: 10,
          // PageCount: Math.ceil(response.data.Totalcount / 3),
        };
        console.log('payload', payload1);
        this.props.updateApplicantsList(payload1);
      });
  };
  showApplicantsList = (event, JobId) => {
    localStorage.setItem('currentId', JobId);
    this.props.showApplicantsModal();
  };
  closeApplicantsModal = () => {
    this.props.hideApplicantsModal();
  };

  render() {
    console.log('jobstore', this.props.jobSelectStore.jobsInfo);
    return (
      <div id="JDCol" className="noPad opened transformNone">
        {this.props.applicantsModalStore.popSeen ? (
          <ApplicantsList
            toggle={this.closeApplicantsModal}
            fetchApplicants={(PageNo) => this.fetchApplicants(PageNo)}
          />
        ) : (
          <div id="JDWrapper">
            {JSON.stringify(this.props.jobSelectStore.jobsInfo) === '{}' ? (
              ''
            ) : (
              <article className="jobDetails scrollable active" id="3708699629">
                <div className="jobViewMinimal">
                  <div class="intersection-visible-wrapper">
                    <div
                      id="HeroHeaderModule"
                      data-brandviews="BRAND:n=jsearch-hero-header:eid=148784:jlid=3708699629"
                    >
                      <div id="HeroHeaderModuleTop"></div>
                      <div class="empWrapper ctasTest">
                        <div class="empInfo newDetails">
                          <div class="title">{this.props.jobSelectStore.jobsInfo.Title}</div>
                          <div class="location">
                            {this.props.jobSelectStore.jobsInfo.City},{' '}
                            {this.props.jobSelectStore.jobsInfo.State}
                          </div>
                        </div>
                        <div class="justify-content-around justify-content-md-between mt-lg row">
                          <div class="d-flex">
                            <div class="mr-md">
                              <button
                                class="gd-ui-button  css-glrvaa"
                                onClick={(event) => {
                                  this.showApplicantsList(
                                    event,
                                    this.props.jobSelectStore.jobsInfo._id
                                  );
                                }}
                              >
                                Applicants List ({this.props.jobSelectStore.ApplicantCount})
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="SerpFixedHeader" style={{ display: 'none' }}>
                        <div class="empWrapper ctasTest">
                          <div class="empInfo newDetails">
                            <div class="title">{this.props.jobSelectStore.jobsInfo.Title}</div>
                            <div class="location">
                              {this.props.jobSelectStore.jobsInfo.City},{' '}
                              {this.props.jobSelectStore.jobsInfo.State}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="Details" style={{ 'border-top': '1px solid #DEE0E3' }}>
                    <div class="jobDetailsInfoWrap">
                      <div>
                        <div id="JobDescriptionContainer" class="p-std css-1k5huso e856ufb0">
                          <div id="JobDesc3708699629" class="css-13klhtw e856ufb7">
                            <div class="jobDescriptionContent desc">
                              <strong>Job Description:</strong>
                              <p>{this.props.jobSelectStore.jobsInfo.JobDescription}</p>

                              <ul>
                                <li>
                                  <strong>Qualifications: </strong>
                                  {this.props.jobSelectStore.jobsInfo.Qualifications}
                                </li>
                                <li>
                                  <strong>JobType: </strong>
                                  {this.props.jobSelectStore.jobsInfo.JobType}
                                </li>
                                <li>
                                  <strong>Remote: </strong>
                                  {this.props.jobSelectStore.jobsInfo.Remote}
                                </li>
                                <li>
                                  <strong>Responsibilities: </strong>
                                  {this.props.jobSelectStore.jobsInfo.Responsibilities}
                                </li>
                                <li>
                                  <strong>Salary offered: </strong>$
                                  {this.props.jobSelectStore.jobsInfo.ExpectedSalary}
                                </li>
                                <li>
                                  <strong>JobStatus: </strong>
                                  {this.props.jobSelectStore.jobsInfo.CurrentStatus}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { applicantsModalStore } = state.ApplicantsListModalReducer;
  const { jobSelectStore } = state.JobsListReducer;
  return {
    applicantsModalStore: applicantsModalStore,
    jobSelectStore: jobSelectStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    hideApplicantsModal: (payload) => {
      dispatch({
        type: hideApplicantsModal,
        payload,
      });
    },
    showApplicantsModal: (payload) => {
      dispatch({
        type: showApplicantsModal,
        payload,
      });
    },
    updateApplicantsList: (payload1) => {
      dispatch({
        type: updateApplicantsList,
        payload1,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightBlock);
//export default RightBlock;
