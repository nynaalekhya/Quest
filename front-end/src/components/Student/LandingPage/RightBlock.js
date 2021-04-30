import React, { Component } from 'react';
import JobSuggestion from './JobSuggestion';
import './RightBlock.css';

class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { loop: [1, 2, 3, 4] };
  }

  render() {
    return (
      <div className="d-flex flex-column col-lg-8 col-12 mt-lg-0">
        <div className="order-lg-1 order-md-1 order-sm-1"></div>
        <div className="order-lg-2 order-md-2 order-sm-2"></div>
        <div className="mt-lg-0 order-lg-3 order-md-3 order-sm-3">
          <div data-test="recommend-jobs-tiles-container">
            <div className="d-flex flex-row align-items-center">
              <div className="col">
                <h1 data-test="job-location-title">Jobs Near San Jose,CA</h1>
              </div>
            </div>
            <div className="css-56kyx5 mt-xsm mb-lg">
              <span className="">Recommendations are based on your job preferences.</span>
            </div>
            <div className="mt-std css-1i303cs egi2yce0">
              {this.props.jobList.map((job) => (
                <JobSuggestion key={job._id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RightBlock;
