import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LeftBlock.css';
import PaginationComponent from '../../Student/Common/PaginationComponent';
import {
  showPostJobModal,
  hidePostJobModal,
  updateJobSelectList,
} from '../../../constants/action-types';
import PostJobModal from './PostJobModal';
import JobCard from './JobCard';
import RightBlock from './RightBlock';
import axios from 'axios';
import serverUrl from '../../../config.js';

class LeftBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  openJobDetails = (event, Jobid) => {
    //event.preventDefault();
    const index = this.props.jobsStore.jobsList.findIndex((x) => x._id === Jobid);
    const selectedJob = {
      ...this.props.jobsStore.jobsList[index],
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'company/applicantCount', {
        params: {
          JobID: Jobid,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('applicant count', response.data);
          let payload2 = {
            ApplicantCount: response.data.ApplicantNumber.appcount,
          };
          this.props.updateJobSelectList(payload2);
        },
        (error) => {
          console.log('error', error);
        }
      );
    let payload2 = {
      jobsInfo: selectedJob,
    };
    this.props.updateJobSelectList(payload2);
  };

  showPostJob = () => {
    this.props.showPostJobModal();
  };
  closePostJob = () => {
    this.props.jobFetch(this.props.jobsStore.PageNo);
    this.props.hidePostJobModal();
  };
  componentDidMount() {
    console.log('props', this.props);
    this.props.jobFetch(this.props.jobsStore.PageNo);
  }

  onPageClick = (e) => {
    this.props.jobFetch(e.selected);
  };

  render() {
    console.log('joblist', this.props.jobsStore.jobsList.length);
    return (
      <section class="flexbox" id="PanesWrap">
        <article id="MainCol" class="noPad">
          <ul class="jlGrid hover p-0 ">
            {this.props.jobsStore.jobsList.map((job) => (
              <li
                class="jl react-job-listing gdGrid selected"
                data-brandviews="BRAND:n=jsearch-job-listing:eid=148784:jlid=3708699629"
                data-id="3708699629"
                data-adv-type="EMPLOYER"
                data-is-organic-job="false"
                data-ad-order-id="897464"
                data-sgoc-id="1005"
                data-is-easy-apply="false"
                data-normalize-job-title="Teller"
                data-job-loc="Madison, WI"
                data-job-loc-id="1133470"
                data-job-loc-type="C"
                key={job._id}
              >
                <JobCard
                  openJobDetails={(event) => this.openJobDetails(event, job._id)}
                  job={job}
                />
              </li>
            ))}
          </ul>
          {this.props.jobsStore.jobsList && this.props.jobsStore.jobsList.length > 0 ? (
            <div className="tbl fill padHorz margVert" id="ResultsFooter">
              <div className="cell middle hideMob padVertSm" data-test="page-x-of-y">
                Page {this.props.jobsStore.PageNo + 1} of {this.props.jobsStore.PageCount}
              </div>
              <div className="module pt-xxsm">
                <PaginationComponent
                  PageCount={this.props.jobsStore.PageCount}
                  PageNo={this.props.jobsStore.PageNo}
                  onPageClick={(e) => {
                    this.onPageClick(e);
                  }}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          <div class="justify-content-around justify-content-md-between mt-lg row">
            <div class="d-flex">
              <div class="mr-md">
                <button
                  class="gd-ui-button  css-glrvaa"
                  onClick={() => {
                    this.showPostJob();
                  }}
                >
                  Post New Job
                </button>
              </div>
            </div>
          </div>
          {this.props.postJobModalStore.popSeen ? (
            <PostJobModal closePostJob={this.closePostJob} />
          ) : (
            ''
          )}
        </article>
        {<RightBlock />}
      </section>
    );
  }
}

//export default LeftBlock;
const mapDispatchToProps = (dispatch) => {
  return {
    hidePostJobModal: (payload) => {
      dispatch({
        type: hidePostJobModal,
        payload,
      });
    },
    showPostJobModal: (payload) => {
      dispatch({
        type: showPostJobModal,
        payload,
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

const mapStateToProps = (state) => {
  const { postJobModalStore } = state.PostJobModalReducer;
  const { jobsStore } = state.JobsListReducer;
  return {
    jobsStore: jobsStore,
    postJobModalStore: postJobModalStore,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftBlock);
