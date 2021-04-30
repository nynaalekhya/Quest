import React, { Component } from 'react';
import LeftBlock from './LeftBlock.js';
import RightBlock from './RightBlock.js';
import axios from 'axios';
import serverUrl from '../../../config.js';
import { connect } from 'react-redux';
import { updateJobList, updateJobSelectList } from '../../../constants/action-types';
import './JobsHome.css';
import { Redirect } from 'react-router';

class JobsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  jobFetch = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'company/jobs', {
        params: {
          CompanyID: localStorage.getItem('userId'),
          PageNo,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('getJobs', response.data);
          let payload1 = {
            jobsList: response.data.jobs,
            PageNo,
            PageCount: Math.ceil(response.data.count / 10),
            Totalcount: response.data.count,
            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateJobList(payload1);

          if (response.data.jobs.length > 0) {
            let payload2 = {
              jobsInfo: { ...response.data.jobs[0] },
            };

            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            axios
              .get(serverUrl + 'company/applicantCount', {
                params: {
                  JobID: payload2.jobsInfo._id,
                },
                withCredentials: true,
              })
              .then(
                (response) => {
                  console.log('applicant count', response.data);

                  payload2.ApplicantCount = response.data.ApplicantNumber.appcount;
                  this.props.updateJobSelectList(payload2);
                },
                (error) => {
                  console.log('error', error);
                }
              );
          }
        },
        (error) => {
          console.log('error', error);
        }
      );
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
        <div className="gdGrid pageContentWrapper">
          <div id="PageContent" className>
            <div id="PageBodyContents" class="meat">
              <span id="NodePageData"> </span>
              <div id="JobSearch">
                <div className="gdGrid noPad">
                  <div id="JobResults" className="module noPad">
                    {<LeftBlock jobFetch={(PageNo) => this.jobFetch(PageNo)} />}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateJobList: (payload1) => {
      dispatch({
        type: updateJobList,
        payload1,
      });
    },
    updateJobSelectList: (payload2) => {
      dispatch({
        type: updateJobSelectList,
        payload2,
      });
    },
  };
};

//   const mapStateToProps = (state) => {
//     const { jobListStore } = state.JobsListReducer;
//     return {
//       jobListStore: jobListStore,
//     };
//   };

export default connect(null, mapDispatchToProps)(JobsHome);
//export default JobsPage;
