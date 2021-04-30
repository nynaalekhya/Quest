import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../../config';
import ChartsPage from './ChartsPage';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topCompanyListDataBar: {},
      topAverageListDataBar: {},
      topStudentListDataBar: {},
      topCEOCompanyListDataBar: {},
      topViewCompanyListDataBar: {},
      reviewData: 0,
    };
  }
  componentDidMount() {
    const borderColor = [
      'rgba(255, 134, 159, 1)',
      'rgba(98,  182, 239, 1)',
      'rgba(255, 218, 128, 1)',
      'rgba(113, 205, 205, 1)',
      'rgba(170, 128, 252, 1)',
      'rgba(255, 177, 101, 1)',
      'rgba(255, 134, 159, 1)',
      'rgba(98,  182, 239, 1)',
      'rgba(255, 218, 128, 1)',
      'rgba(113, 205, 205, 1)',
    ];
    const backgroundColor = [
      'rgba(255, 134,159,0.4)',
      'rgba(98,  182, 239,0.4)',
      'rgba(255, 218, 128,0.4)',
      'rgba(113, 205, 205,0.4)',
      'rgba(170, 128, 252,0.4)',
      'rgba(255, 177, 101,0.4)',
      'rgba(255, 134,159,0.4)',
      'rgba(98,  182, 239,0.4)',
      'rgba(255, 218, 128,0.4)',
      'rgba(113, 205, 205,0.4)',
    ];
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'admin/analytics', {
        params: { StudentID: localStorage.getItem('userId') },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        /******************************topCompanyList*************************************************************/

        const topCompanyListLabels = [];
        const topCompanyListData = [];
        const topCompanyListBackgroundColor = [];
        const topCompanyListBorderColor = [];
        let i = 0;
        for (let company of response.data.topCompanyList) {
          topCompanyListLabels.push(company.CompanyName);
          topCompanyListData.push(company.GeneralReviewCount);
          topCompanyListBackgroundColor.push(backgroundColor[i]);
          topCompanyListBorderColor.push(borderColor[i]);
          i = i + 1;
        }
        const topCompanyListDataBar = {
          labels: topCompanyListLabels,
          datasets: [
            {
              label: 'Top 5 most reviewed company',
              data: topCompanyListData,
              backgroundColor: topCompanyListBackgroundColor,
              borderWidth: 2,
              borderColor: topCompanyListBorderColor,
            },
          ],
        };
        /******************************topAverageList*************************************************************/

        const topAverageListLabels = [];
        const topAverageListData = [];
        const topAverageListBackgroundColor = [];
        const topAverageListBorderColor = [];
        i = 0;
        for (let company of response.data.topAverageList) {
          topAverageListLabels.push(company.CompanyName);
          topAverageListData.push(
            company.GeneralReviewCount > 0
              ? company.TotalGeneralReviewRating / company.GeneralReviewCount
              : 0
          );
          topAverageListBackgroundColor.push(backgroundColor[i]);
          topAverageListBorderColor.push(borderColor[i]);
          i = i + 1;
        }
        const topAverageListDataBar = {
          labels: topAverageListLabels,
          datasets: [
            {
              label: 'Top 5 company based on average rating',
              data: topAverageListData,
              backgroundColor: topAverageListBackgroundColor,
              borderWidth: 2,
              borderColor: topAverageListBorderColor,
            },
          ],
        };
        /********************************topStudentList***********************************************************/
        const topStudentListLabels = [];
        const topStudentListData = [];
        const topStudentListBackgroundColor = [];
        const topStudentListBorderColor = [];
        i = 0;
        for (let student of response.data.topStudentList) {
          topStudentListLabels.push(student.Name ? student.Name : student.Email);
          topStudentListData.push(student.AcceptedReviewCount);
          topStudentListBackgroundColor.push(backgroundColor[i]);
          topStudentListBorderColor.push(borderColor[i]);
          i = i + 1;
        }
        const topStudentListDataBar = {
          labels: topStudentListLabels,
          datasets: [
            {
              label: 'Top 5 students based on total accepted reviews made',
              data: topStudentListData,
              backgroundColor: topStudentListBackgroundColor,
              borderWidth: 2,
              borderColor: topStudentListBorderColor,
            },
          ],
        };

        /********************************topCEOCompanyList***********************************************************/

        const topCEOCompanyListLabels = [];
        const topCEOCompanyListData = [];
        const topCEOCompanyListBackgroundColor = [];
        const topCEOCompanyListBorderColor = [];
        i = 0;
        for (let company of response.data.topCEOCompanyList) {
          topCEOCompanyListLabels.push(`${company.CompanyName}: ${company.CEO ? company.CEO : ''}`);
          topCEOCompanyListData.push(company.approveCEOcount);
          topCEOCompanyListBackgroundColor.push(backgroundColor[i]);
          topCEOCompanyListBorderColor.push(borderColor[i]);
          i = i + 1;
        }
        const topCEOCompanyListDataBar = {
          labels: topCEOCompanyListLabels,
          datasets: [
            {
              label: 'Top 10 CEO’s based on rating',
              data: topCEOCompanyListData,
              backgroundColor: topCEOCompanyListBackgroundColor,
              borderWidth: 2,
              borderColor: topCEOCompanyListBorderColor,
            },
          ],
        };
        /********************************topViewCompanyList***********************************************************/

        const topViewCompanyListLabels = [];
        const topViewCompanyListData = [];
        const topViewCompanyListBackgroundColor = [];
        const topViewCompanyListBorderColor = [];
        i = 0;
        for (let company of response.data.topViewCompanyList) {
          topViewCompanyListLabels.push(company.CompanyName);
          topViewCompanyListData.push(company.ViewCount);
          topViewCompanyListBackgroundColor.push(backgroundColor[i]);
          topViewCompanyListBorderColor.push(borderColor[i]);
          i = i + 1;
        }
        const topViewCompanyListDataBar = {
          labels: topViewCompanyListLabels,
          datasets: [
            {
              label: 'Top 10 company based on viewed per day',
              data: topViewCompanyListData,
              backgroundColor: topViewCompanyListBackgroundColor,
              borderWidth: 2,
              borderColor: topViewCompanyListBorderColor,
            },
          ],
        };

        this.setState({
          reviewData: response.data.reviewData,
          topCompanyListDataBar,
          topAverageListDataBar,
          topStudentListDataBar,
          topCEOCompanyListDataBar,
          topViewCompanyListDataBar,
        });
      });
  }

  render() {
    return (
      <div>
        <div>
          <div id="ProfilePageBannerContainer"></div>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
            data-test="AboutMeSection"
            id="AboutCompany"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <h3 data-test="profileHeading">No of reviews per day : {this.state.reviewData}</h3>
              </div>
            </div>
          </section>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
            data-test="MissionSection"
            id="CompanyMission"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <h3 data-test="profileHeading">Top 5 most reviewed company</h3>
              </div>
            </div>

            <p
              data-test="description"
              class="m-0 preWrap"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <ChartsPage dataBar={this.state.topCompanyListDataBar} />
            </p>
          </section>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
            data-test="AboutMeSection"
            id="AboutCompany"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <h3 data-test="profileHeading">Top 5 company based on average rating</h3>
              </div>
            </div>
            <p
              data-test="description"
              class="m-0 preWrap"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <ChartsPage dataBar={this.state.topAverageListDataBar} />
            </p>
          </section>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
            data-test="MissionSection"
            id="CompanyMission"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <h3 data-test="profileHeading">
                  Top 5 students based on total accepted reviews made
                </h3>
              </div>
            </div>
            <p
              data-test="description"
              class="m-0 preWrap"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <ChartsPage dataBar={this.state.topStudentListDataBar} />
            </p>
          </section>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
            data-test="AboutMeSection"
            id="AboutCompany"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <h3 data-test="profileHeading">Top 10 CEO’s based on rating</h3>
              </div>
            </div>
            <p
              data-test="description"
              class="m-0 preWrap"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <ChartsPage dataBar={this.state.topCEOCompanyListDataBar} />
            </p>
          </section>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
            data-test="MissionSection"
            id="CompanyMission"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <h3 data-test="profileHeading">Top 10 company based on viewed per day</h3>
              </div>
            </div>
            <p
              data-test="description"
              class="m-0 preWrap"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <ChartsPage dataBar={this.state.topViewCompanyListDataBar} />
            </p>
          </section>
        </div>
      </div>
    );
  }
}

export default Body;
