import React, { Component } from 'react';
import './LeftBlock.css';
import moment from 'moment';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const job = this.props.job;
    return (
      <div
        class="d-flex flex-column pl-sm css-nq3w9f"
        onClick={(event) => this.props.openJobDetails(event, job._id)}
      >
        <div class="jobHeader d-flex justify-content-between align-items-start">
          <a
            href="#"
            type="button"
            rel="nofollow noopener noreferrer"
            target="_blank"
            class=" css-10l5u4p e1n63ojh0 jobLink"
            style={{ 'pointer-events': 'all' }}
          >
            <span>{job.CompanyName}</span>
          </a>
          <div class="saveJobWrap align-self-end d-flex flex-nowrap align-items-start">
            <span class="save-job-button-3708699629 nowrap" data-test="save-job">
              {/*job.PostedDate.substring(0, 10)*/}
              {moment(job.PostedDate).format('ll')}
            </span>
          </div>
        </div>
        <a
          rel="nofollow noopener noreferrer"
          target="_blank"
          class="jobInfoItem jobTitle css-13w0lq6 eigr9kq1 jobLink"
          style={{ 'pointer-events': 'all' }}
        >
          <span>{job.Title}</span>
        </a>
        <div class="d-flex flex-wrap css-yytu5e e1rrn5ka1">
          <span class="loc css-nq3w9f pr-xxsm">
            {job.City}, {job.State}
          </span>
        </div>
      </div>
    );
  }
}

export default JobCard;
