import React, { Component } from 'react';
import './RightBlock.css';
import DonutChart from 'react-donut-chart';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import serverUrl from '../../../config.js';
import { connect } from 'react-redux';
import { updateEmployerStats, updateCompanyDemographics } from '../../../constants/action-types';
import PaginationComponent from '../../Student/Common/PaginationComponent';
import DemographicsCard from './DemographicsCard';

class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsData: [],
      disabilityData: [],
      ethinicityData: [],
      genderData: [],
      veteranData: [],
      chartEvents: [],
      showDemographics: false,
    };
  }

  componentDidMount() {
    this.fetchReport(this.props.reportStore.PageNo);
    console.log('componenet did mount', this.props.reportStore.statsList);
  }

  fetchReport = (PageNo = 0) => {
    let eventrow = 0;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'company/report', {
        params: { CompanyID: localStorage.getItem('userId'), PageNo: 0 },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          debugger;
          console.log('response', response.data.statsData);
          let payload = {
            statsList: response.data.statsData,
            PageNo,
            PageCount: Math.ceil(response.data.count / 10),
            Totalcount: response.data.count,
          };
          console.log('payload', payload);
          this.props.updateEmployerStats(payload);
          //this.getBarData(response.data.statsData);
          console.log('inside bar data', response.data.statsData);
          let data1 = [];
          let statsData1 = [];
          data1.push('Jobs');
          data1.push('Applicants Applied');
          data1.push('Applicants Selected');
          data1.push('Applicants Rejected');
          statsData1.push(data1);
          console.log('statsData1', statsData1);
          this.setState({
            statsData: [...this.state.statsData, data1],
            chartEvents: [
              {
                eventName: 'select',
                callback({ chartWrapper }) {
                  console.log(chartWrapper.getChart().getSelection());
                  const chartevent = chartWrapper.getChart().getSelection();
                  eventrow = chartevent[0].row;
                  let JobId = response.data.statsData[eventrow].jobDetails.jobData._id;
                  localStorage.setItem('Jobid', JobId);
                  console.log('Selected ', JobId);
                },
              },
            ],
          });
          console.log('statsData', this.state.statsData);
          let data = [];
          for (var i = 0; i < response.data.statsData.length; i++) {
            // data.push(response.data.statsData[i].jobDetails.jobData.Title);
            // data.push(response.data.statsData[i].Applied.results[0].TotalApplicants);
            // data.push(response.data.statsData[i].Selected.results[0].SelectedApplicants);
            // data.push(response.data.statsData[i].Rejected.results[0].RejectedApplicants);
            debugger;
            data.push(response.data.statsData[i].jobDetails.jobData.Title);
            data.push(response.data.statsData[i].Applied.results[0].TotalApplicants);
            data.push(response.data.statsData[i].Selected.results[0].SelectedApplicants);
            debugger;
            data.push(response.data.statsData[i].Rejected.results[0].RejectedApplicants);
            console.log('data', data);
            debugger;
            statsData1.push(data);
            debugger;
            this.setState({
              statsData: [...this.state.statsData, data],
            });
            data = [];
          }
          console.log('statsData1', statsData1);
          console.log('statsData', this.state.statsData);
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'No Statistics Found',
        });
      });
  };
  onPageClick = (e) => {
    this.fetchReport(e.selected);
  };

  fetchDemographics(event) {
    this.setState({
      showDemographics: true,
    });
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'company/demographicsJob', {
        params: { JobID: localStorage.getItem('Jobid') },
        withCredentials: true,
      })
      .then((response) => {
        debugger;
        if (response.status == 200) {
          console.log('response', response.data);
          let ethnicity = [];
          let demos = [];
          let Ethnicity = [];
          ethnicity.push('Ethnicity');
          ethnicity.push('Count');
          //demos.push(ethnicity);
          Ethnicity.push(ethnicity);
          // this.setState({
          //   ethnicityData: [...this.state.ethinicityData, ethnicity],
          // })

          for (var i = 0; i < response.data.Ethnicity.length; i++) {
            let ethnicity1 = [];
            ethnicity1.push(response.data.Ethnicity[i].Ethnicity);
            ethnicity1.push(response.data.Ethnicity[i].Count);
            Ethnicity.push(ethnicity1);
            // this.setState({
            //   ethnicityData: [...this.state.ethnicityData, ethnicity1],
            // })
          }

          // Ethnicity.push(demos);
          // console.log('demos',Ethnicity);

          let disability = [];
          let Disability = [];
          disability.push('Disability');
          disability.push('Count');
          Disability.push(disability);
          let disability1 = [];
          for (var i = 0; i < response.data.Disability.length; i++) {
            disability1.push(response.data.Disability[i].Disability);
            disability1.push(response.data.Disability[i].Count);
            Disability.push(disability1);
          }

          let gender = [];
          let Gender = [];
          gender.push('Gender');
          gender.push('Count');
          Gender.push(gender);
          let gender1 = [];
          for (var i = 0; i < response.data.Gender.length; i++) {
            gender1.push(response.data.Gender[i].Gender);
            gender1.push(response.data.Gender[i].Count);
            Gender.push(gender1);
            // this.setState({
            //   genderData: [...this.state.genderData, gender1],
            // })
          }

          let veteran = [];
          demos = [];
          let Veteran = [];
          veteran.push('VeteranStatus');
          veteran.push('Count');
          Veteran.push(veteran);

          // this.setState({
          //   veteranData: [...this.state.veteranData, veteran],
          // })
          let veteran1 = [];
          for (var i = 0; i < response.data.VeteranStatus.length; i++) {
            veteran1.push(response.data.VeteranStatus[i].VeteranStatus);
            veteran1.push(response.data.VeteranStatus[i].Count);
            Veteran.push(veteran1);
            // this.setState({
            //   veteranData: [...this.state.veteranData, veteran1],
            // })
          }

          let data = {
            Disability: Disability,
            Ethnicity: Ethnicity,
            Gender: Gender,
            Veteran: Veteran,
          };

          let payload1 = {
            demographics: data,
          };
          console.log('data', payload1);
          this.props.updateCompanyDemographics(payload1);
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'No Demographics Found',
        });
      });
  }
  render() {
    return (
      <div className="col-md-8 px-0">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex flex-column">
            <span class="mb-sm">Jobs Statistics</span>
            {this.props.reportStore.statsList && this.props.reportStore.statsList.length > 0 ? (
              <div class="d-flex">
                <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={this.state.statsData}
                  options={{
                    title: 'Statistics of the Jobs Posted',
                    chartArea: { width: '50%' },
                    isStacked: true,
                    hAxis: {
                      title: 'Total Applicants',
                      minValue: 0,
                    },
                    vAxis: {
                      title: 'Jobs',
                    },
                  }}
                  // For tests
                  rootProps={{ 'data-testid': '3' }}
                  chartEvents={this.state.chartEvents}
                />
              </div>
            ) : (
              'No Jobs found!'
            )}
          </div>
          {this.props.reportStore.statsList && this.props.reportStore.statsList.length > 0 ? (
            <div className="tbl fill padHorz margVert" id="ResultsFooter">
              <div className="cell middle hideMob padVertSm" data-test="page-x-of-y">
                Page {this.props.reportStore.PageNo + 1} of {this.props.reportStore.PageCount}
              </div>
              <div className="module pt-xxsm">
                <PaginationComponent
                  PageCount={this.props.reportStore.PageCount}
                  PageNo={this.props.reportStore.PageNo}
                  onPageClick={(e) => {
                    this.onPageClick(e);
                  }}
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {this.props.reportStore.statsList && this.props.reportStore.statsList.length > 0 ? (
            <div class="justify-content-around justify-content-md-between mt-lg column">
              <div class="d-flex">
                <span>Click on Job Bar to fetch Demographic and click here</span>
                <div class="mr-md">
                  <button
                    class="gd-ui-button  css-glrvaa"
                    onClick={(event) => {
                      this.fetchDemographics(event);
                    }}
                  >
                    Fetch Demographics
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {this.props.reportStore.statsList &&
          this.props.reportStore.statsList.length > 0 &&
          this.state.showDemographics ? (
            // {this.props.demographicsStore.demographics ? (
            <DemographicsCard />
          ) : (
            ''
          )}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmployerStats: (payload) => {
      dispatch({
        type: updateEmployerStats,
        payload,
      });
    },
    updateCompanyDemographics: (payload1) => {
      dispatch({
        type: updateCompanyDemographics,
        payload1,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightBlock);
//export default RightBlock;
