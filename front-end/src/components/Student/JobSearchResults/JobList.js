import React, { Component } from 'react';
import Navbar from '../Common/Navbar';
import {
  LowerNavBarOther,
  updateJobFilterStore,
  updateJobListStore,
  updateStudentProfile,
  updateOnFocusJob,
} from '../../../constants/action-types';
import { connect } from 'react-redux';
import './JobList.css';
import JobNavBar from './JobNavBar';
import JobResults from './JobResults';
import axios from 'axios';
import serverUrl from '../../../config';
import { Redirect } from 'react-router';

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toggleFilter = (filter) => {
    let payload = {};
    if (filter === this.props.jobFilterStore.fiterSlected) {
      payload = {
        fiterSlected: '',
      };
    } else {
      payload = {
        fiterSlected: filter,
      };
    }
    this.props.updateJobFilterStore(payload);
  };
  saveJob = (event, JobID) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      JobID,
      StudentID: localStorage.getItem('userId'),
    };
    axios.post(serverUrl + 'student/companyFavouriteJobs', data).then(
      (response) => {
        if (response.status === 200) {
          let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          studentProfile.FavouriteJobs.push(JobID);
          const payload = {
            studentProfile,
          };
          this.props.updateStudentProfile(payload);
        }
      },
      (error) => {}
    );
  };

  unsaveJob = (event, JobID) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      JobID,
      StudentID: localStorage.getItem('userId'),
    };
    axios.post(serverUrl + 'student/removeFavouriteJobs', data).then(
      (response) => {
        if (response.status === 200) {
          let studentProfile = { ...this.props.studentInfoStore.studentProfile };
          var index = studentProfile.FavouriteJobs.indexOf(JobID);
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
      (error) => {}
    );
  };

  filterChangeCall = (JobType, State, SalStart, SalEnd, PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/searchJob', {
        params: {
          SearchString: localStorage.getItem('SearchString'),
          JobType,
          State: localStorage.getItem('Location'),
          SalStart,
          SalEnd,
          PageNo,
        },
        withCredentials: true,
      })
      .then((response) => {
        let payload = {
          jobList: response.data.jobs,
          PageNo,
          PageCount: Math.ceil(response.data.count / 10),
          Totalcount: response.data.count,
          JobType,
          State,
          SalStart,
          SalEnd,
          appliedJobSelected: false,
          favJobSelected: false,
        };
        this.props.updateJobListStore(payload);
        let payload2 = {
          fiterSlected: '',
        };
        this.props.updateJobFilterStore(payload2);

        if (response.data.jobs.length > 0) {
          let payload3 = {
            jobOonFocus: { ...response.data.jobs[0] },
          };
          this.props.updateOnFocusJob(payload3);
        }
      });
  };

  savedJobCall = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/getFavoriteJobs', {
        params: {
          StudentID: localStorage.getItem('userId'),
          PageNo,
        },
        withCredentials: true,
      })
      .then((response) => {
        let payload = {
          jobList: response.data.job,
          PageNo,
          PageCount: Math.ceil(response.data.count.length / 10),
          Totalcount: response.data.count.length,
          JobType: '',
          State: '',
          SalStart: '',
          SalEnd: '',
          appliedJobSelected: false,
          favJobSelected: true,
        };
        this.props.updateJobListStore(payload);
        let payload2 = {
          fiterSlected: '',
        };
        this.props.updateJobFilterStore(payload2);

        // if (response.data.job.length > 0) {
        //   let payload3 = {
        //     jobOonFocus: { ...response.data.job[0] },
        //   };
        //   this.props.updateOnFocusJob(payload3);
        // }
        if (response.data.job.length > 0) {
          let payload3 = {
            jobOonFocus: { ...response.data.job[0] },
          };
          if (
            this.props.studentInfoStore.studentProfile.AppliedJobs.includes(
              payload3.jobOonFocus._id
            )
          ) {
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            axios
              .get(serverUrl + 'student/jobStatus', {
                params: {
                  JobID: payload3.jobOonFocus._id,
                  StudentID: localStorage.getItem('userId'),
                },
                withCredentials: true,
              })
              .then(
                (response) => {
                  console.log('job status:', response.data);
                  // return response.data[0].Status;
                  payload3.jobOonFocus.Status = response.data[0].Status;
                  // let payload3 = {
                  //   jobOonFocus,
                  // };
                  this.props.updateOnFocusJob(payload3);
                },
                (error) => {}
              );
          } else {
            this.props.updateOnFocusJob(payload3);
          }
        }
      });
  };

  appliedJobCall = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/getAppliedJobs', {
        params: {
          StudentID: localStorage.getItem('userId'),
          PageNo,
        },
        withCredentials: true,
      })
      .then((response) => {
        let payload = {
          jobList: response.data.job,
          PageNo,
          PageCount: Math.ceil(response.data.count.length / 10),
          Totalcount: response.data.count.length,
          JobType: '',
          State: '',
          SalStart: '',
          SalEnd: '',
          appliedJobSelected: true,
          favJobSelected: false,
        };
        this.props.updateJobListStore(payload);
        let payload2 = {
          fiterSlected: '',
        };
        this.props.updateJobFilterStore(payload2);

        if (response.data.job.length > 0) {
          let payload3 = {
            jobOonFocus: { ...response.data.job[0] },
          };
          if (
            this.props.studentInfoStore.studentProfile.AppliedJobs.includes(
              payload3.jobOonFocus._id
            )
          ) {
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            axios
              .get(serverUrl + 'student/jobStatus', {
                params: {
                  JobID: payload3.jobOonFocus._id,
                  StudentID: localStorage.getItem('userId'),
                },
                withCredentials: true,
              })
              .then(
                (response) => {
                  console.log('job status:', response.data);
                  // return response.data[0].Status;
                  payload3.jobOonFocus.Status = response.data[0].Status;
                  // let payload3 = {
                  //   jobOonFocus,
                  // };
                  this.props.updateOnFocusJob(payload3);
                },
                (error) => {}
              );
          } else {
            this.props.updateOnFocusJob(payload3);
          }
        }
      });
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
    return (
      <div className="gdGrid pageContentWrapperStudent ">
        <div id="PageContent">
          <div id="PageBodyContents" className="meat">
            <span id="NodePageData"></span>
            <div id="JobSearch">
              <div className="gdGrid noPad">
                {
                  <JobNavBar
                    filterChangeCall={(JobType, State, SalStart, SalEnd, PageNo) =>
                      this.filterChangeCall(JobType, State, SalStart, SalEnd, PageNo)
                    }
                    savedJobCall={this.savedJobCall}
                    appliedJobCall={this.appliedJobCall}
                    toggleFilter={(filter) => this.toggleFilter(filter)}
                  />
                }
                {
                  <JobResults
                    filterChangeCall={(JobType, State, SalStart, SalEnd, PageNo) =>
                      this.filterChangeCall(JobType, State, SalStart, SalEnd, PageNo)
                    }
                    savedJobCall={(PageNo) => this.savedJobCall(PageNo)}
                    appliedJobCall={(PageNo) => this.appliedJobCall(PageNo)}
                    saveJob={(event, JobID) => this.saveJob(event, JobID)}
                    unsaveJob={(event, JobID) => this.unsaveJob(event, JobID)}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default JobList;

const mapStateToProps = (state) => {
  const { jobFilterStore } = state.JobSearchPageReducer;
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  return {
    jobFilterStore,
    studentInfoStore,
  };
};
// export default CompanySearchResults;
const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
    updateJobFilterStore: (payload) => {
      dispatch({
        type: updateJobFilterStore,
        payload,
      });
    },
    updateJobListStore: (payload) => {
      dispatch({
        type: updateJobListStore,
        payload,
      });
    },
    updateStudentProfile: (payload) => {
      dispatch({
        type: updateStudentProfile,
        payload,
      });
    },
    updateOnFocusJob: (payload) => {
      dispatch({
        type: updateOnFocusJob,
        payload,
      });
    },
  };
};
// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(JobList);
