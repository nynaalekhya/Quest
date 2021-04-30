import React, { Component } from 'react';
import './JobInfo.css';

class JobInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const selectedJob = this.props.selectedJob;
    return (
      <div id="JobDescriptionContainer" className="tabSection pad">
        <div id="JobDesc3360350142" className="jobDesc">
          <div className="jobDescriptionContent desc">
            <div>
              <div>
                <ul>
                  <li>
                    {selectedJob.StreetAddress}, {selectedJob.State}, {selectedJob.Country}
                  </li>
                  <li>{selectedJob.JobType}</li>
                </ul>{' '}
              </div>
            </div>
            <br />

            <div>
              <div>
                <h3>THE GIG</h3>
                <br />
                <br />
                {selectedJob.JobDescription}
              </div>
              <br />

              <div>
                <h3>
                  <br />
                  REQUIREMENTS
                </h3>

                <ul>{selectedJob.Responsibilities}</ul>
              </div>
              <br />

              <div>
                <h3>Qualifications</h3>

                {selectedJob.Qualifications}
              </div>
            </div>
            <br />
            <div>
              {selectedJob.CompanyName} Inc.
              <br />
              {selectedJob.jobdetails.length > 0 ? selectedJob.jobdetails[0].Website : ''}
            </div>
            <br />
          </div>
          <p>
            <p>Apply Now: click Apply Now</p>
          </p>
        </div>
      </div>
    );
  }
}

export default JobInfo;
