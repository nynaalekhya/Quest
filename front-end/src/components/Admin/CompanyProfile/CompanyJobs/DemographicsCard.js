import React, { Component } from 'react';
//import './RightBlock.css';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
//import { updateEmployerStats, updateCompanyDemographics } from '../../../constants/action-types';


class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsData: [],
      chartEvents: [],
    };
  }

  render() {
          //console.log(this.props.demographicsStore.demographics.Ethnicity[0]);
      
    return (
      <div>
        <div class="d-flex flex-column">
          <span class="mb-sm">
            <strong>Demographics</strong>
          </span>
        </div>
        <div class="d-flex flex-column">
          <span class="mb-sm">Race/Ethnicity</span>
          <div class="d-flex">
            <div>
              <Chart
                width={'300px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={this.props.demographicsStore.demographics.Ethnicity}
                options={{
                  title: 'My Daily Activities',
                  // Just add this option
                  pieHole: 0.4,
                }}
                rootProps={{ 'data-testid': '3' }}
              />
            </div>
          </div>
        </div>
        <div class="d-flex flex-column">
          <span class="mb-sm">Gender</span>
          <div class="d-flex">
            <Chart
              width={'300px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={this.props.demographicsStore.demographics.Gender}
              options={{
                title: 'My Daily Activities',
                // Just add this option
                pieHole: 0.4,
              }}
              rootProps={{ 'data-testid': '3' }}
            />
          </div>
        </div>

        <div class="d-flex flex-column">
          <span class="mb-sm">Disability</span>
          <div class="d-flex">
            <Chart
              width={'300px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={this.props.demographicsStore.demographics.Disability}
              options={{
                title: 'My Daily Activities',
                // Just add this option
                pieHole: 0.4,
              }}
              rootProps={{ 'data-testid': '3' }}
            />
          </div>
        </div>

        <div class="d-flex flex-column">
          <span class="mb-sm">Veteran Status</span>
          <div class="d-flex">
            <Chart
              width={'300px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={this.props.demographicsStore.demographics.Veteran}
              options={{
                title: 'My Daily Activities',
                // Just add this option
                pieHole: 0.4,
              }}
              rootProps={{ 'data-testid': '3' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { reportStore, demographicsStore } = state.EmployerReportStatsReducer;
  console.log(reportStore);
  return {
    reportStore: reportStore,
    demographicsStore: demographicsStore,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateEmployerStats: (payload) => {
//       dispatch({
//         type: updateEmployerStats,
//         payload,
//       });
//     },
//     updateCompanyDemographics: (payload) => {
//       dispatch({
//         type: updateCompanyDemographics,
//         payload,
//       });
//     },
//   };
// };

export default connect(mapStateToProps, null)(RightBlock);
//export default RightBlock;
