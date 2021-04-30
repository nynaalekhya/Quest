import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  selectFilter = (event, JobType) => {
    this.props.filterChangeCall(
      JobType,
      this.props.jobListStore.State,
      this.props.jobListStore.SalStart,
      this.props.jobListStore.SalEnd,
      0
    );
  };
  render() {
    return (
      <ul className="css-1dv4b0s ew8xong0">
        <li
          style={{ cursor: 'pointer' }}
          value="all"
          onClick={(event) => this.selectFilter(event, '')}
          className={this.props.jobListStore.JobType === '' ? 'selected' : ''}
        >
          <span className="label">All Job Types</span>
          <span className="labelTick"></span>
        </li>
        {this.props.masterData.JobType.map((job) => (
          <li
            style={{ cursor: 'pointer' }}
            value={job}
            onClick={(event) => this.selectFilter(event, job)}
            className={this.props.jobListStore.JobType === job ? 'selected' : ''}
          >
            <span className="label">{job}</span>
            <span className="labelTick"></span>
          </li>
        ))}
      </ul>
    );
  }
}

// export default JobTypes;
const mapStateToProps = (state) => {
  const { jobListStore } = state.JobSearchPageReducer;
  const { masterData } = state.staticDataReducer;

  return {
    jobListStore,
    masterData,
  };
};
export default connect(mapStateToProps, null)(JobTypes);
