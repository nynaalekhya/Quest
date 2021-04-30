import React, { Component } from 'react';
//import './RightBlock.css';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import serverUrl from '../../../../config.js';
import { connect } from 'react-redux';
//import { updateEmployerStats, updateCompanyDemographics } from '../../../constants/action-types';
import DemographicsCard from './DemographicsCard';

class CompanyJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsData: [],
      disabilityData: [],
      ethnicityData: [],
      genderData: [],
      veteranData: [],
      chartEvents: [],
    };
  }

  componentDidMount() {
    this.fetchReport();    
  }

  fetchReport = () => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'admin/jobStats', {
        params: { CompanyID: localStorage.getItem('companyID') },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          console.log('response', response.data);
          // let payload = {
          //   statsList: response.data.statsData,
          //   PageNo,
          //   PageCount: Math.ceil(response.data.count / 10),
          //   Totalcount: response.data.count,
          // }
          // console.log('payload', payload);
          // this.props.updateEmployerStats(payload);
          //this.getBarData(response.data.statsData);
          let data1 = [];
          let statsData1 = [];
          data1.push('Jobs');
          data1.push('Applicants Applied');
          data1.push('Applicants Selected');
          data1.push('Applicants Rejected');
          statsData1.push(data1);
          this.setState({
            statsData: [...this.state.statsData, data1],
          });
     
          let data = [];
          data.push(response.data.JobCount[0].NumberOfJobs);
          data.push(response.data.TotalApplicants[0].TotalApplicants);
          data.push(response.data.HiredApplicants[0].SelectedApplicants);
          data.push(response.data.RejectedApplicants[0].RejectedApplicants);
          // data.push(response.data.statsData[i].jobDetails.jobData.Title);
          // data.push(12);
          // data.push(6);
          // data.push(6);
          console.log('data', data);
          statsData1.push(data);
          this.setState({
            statsData: [...this.state.statsData, data],
          });
          console.log('statsData1', statsData1);
          console.log('statsData', this.state.statsData);
          this.fetchDemographics(response.data);
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'No Statistics Found',
        });
      });
  };

  fetchDemographics = (demoInfo) => {
    
          console.log('demoInfo', demoInfo);
          let ethnicity = [];
          let demos = [];
          let Ethnicity = [];
          ethnicity.push('Ethnicity');
          ethnicity.push('Count');
          //demos.push(ethnicity);
          Ethnicity.push(ethnicity);
          this.setState({
            ethnicityData: [...this.state.ethnicityData, ethnicity],
          })

          for(var i = 0; i < demoInfo.Ethnicity.length; i++) {
            let ethnicity1 = []
            ethnicity1.push(demoInfo.Ethnicity[i].Ethnicity);
            ethnicity1.push(demoInfo.Ethnicity[i].Count);
            Ethnicity.push(ethnicity1);
            this.setState({
              ethnicityData: [...this.state.ethnicityData, ethnicity1],
            })
          }

          // Ethnicity.push(demos);
          // console.log('demos',Ethnicity);

          let disability = [];
          let Disability = [];
          disability.push('Disability');
          disability.push('Count');
          Disability.push(disability);
          this.setState({
            disabilityData: [...this.state.disabilityData, disability],
          })
          
          for(var i = 0; i < demoInfo.Disability.length; i++) {
            let disability1 = [];
            disability1.push(demoInfo.Disability[i].Disability);
            disability1.push(demoInfo.Disability[i].Count);
            Disability.push(disability1);
            this.setState({
              disabilityData: [...this.state.disabilityData, disability1],
            })
          }

          let gender = [];
          let Gender = [];
          gender.push('Gender');
          gender.push('Count');
          Gender.push(gender);
          this.setState({
            genderData: [...this.state.genderData, gender],
          })
         
    for (var i = 0; i < demoInfo.Gender.length; i++) {
             let gender1 = []
            gender1.push(demoInfo.Gender[i].Gender);
            gender1.push(demoInfo.Gender[i].Count);
            Gender.push(gender1);
            this.setState({
              genderData: [...this.state.genderData, gender1],
            })
          }

          let veteran = [];
          demos = [];
          let Veteran = [];
          veteran.push('VeteranStatus');
          veteran.push('Count');
          Veteran.push(veteran);
          this.setState({
            veteranData: [...this.state.veteranData, veteran],
          })
          
    for (var i = 0; i < demoInfo.VeteranStatus.length; i++) {
            let veteran1 = [];
            veteran1.push(demoInfo.VeteranStatus[i].VeteranStatus);
            veteran1.push(demoInfo.VeteranStatus[i].Count);
            Veteran.push(veteran1);
            this.setState({
              veteranData: [...this.state.veteranData, veteran1],
            })
          }

          // let data = {
          //   Disability : Disability,
          //   Ethnicity : Ethnicity,
          //   Gender: Gender,
          //   Veteran: Veteran

          // }

          // let payload1 = {
          //   demographics: data
          // }
          // console.log('data', payload1);
          // this.props.updateCompanyDemographics(payload1);
        }      
  
  render() {
    return (
      <div>
      <div class="col-12 col-md-4 pr-md-xxl">
        <div class="d-none d-md-block">
          <div class="d-flex flex-column">
            <span class="mb-sm">Jobs Statistics</span>
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
              />
            </div>
          </div>
          <div className="tbl fill padHorz margVert" id="ResultsFooter">        
         
        </div>
          </div>
          </div>
          <div class="col-12 col-md-8 pr-md-xxl">
        <div class="d-none d-md-block">
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
                data={this.state.ethnicityData}
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
              data={this.state.genderData}
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
              data={this.state.disabilityData}
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
              data={this.state.veteranData}
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
          </div>           
          </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { reportStore, demographicsStore } = state.EmployerReportStatsReducer;
//   console.log(reportStore);
//   return {
//     reportStore: reportStore,
//     demographicsStore: demographicsStore
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateEmployerStats: (payload) => {
//       dispatch({
//         type: updateEmployerStats,
//         payload,
//       });
//     },
//     updateCompanyDemographics: (payload1) => {
//       dispatch({
//         type: updateCompanyDemographics,
//         payload1,
//       });
//     },
//   };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(CompanyJobs);
export default CompanyJobs;
