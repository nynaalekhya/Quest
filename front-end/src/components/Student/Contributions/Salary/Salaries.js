import React, { Component } from 'react';
import './Salaries.css';
import { Link } from 'react-router-dom';
import PaginationComponent from '../../Common/PaginationComponent';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updateStudentSalariesStore } from '../../../../constants/action-types';
import { connect } from 'react-redux';
import SalaryCard from './SalaryCard';

class Salaries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.commonFetch();
  }

  commonFetch = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/studentSalaryReview', {
        params: {
          PageNo,
          StudentID: localStorage.getItem('userId'),
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('studentSalaryReview', response.data);
          let payload = {
            SalaryList: response.data.results,
            PageNo,
            Totalcount: response.data.count,
            PageCount: Math.ceil(response.data.count / 10),

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateStudentSalariesStore(payload);
        },
        (error) => {
          console.log('error', error);
        }
      );
  };

  onPageClick = (e) => {
    // console.log('Page Clicked:', e.selected);
    this.commonFetch(e.selected);
  };

  delete = (event, SalaryReviewID) => {
    event.preventDefault();
    // console.log('SalaryReviewID:', SalaryReviewID);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      SalaryReviewID,
    };
    console.log('SalaryReviewID:', data);
    axios.post(serverUrl + 'student/deleteSalaryReview', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Review Submitted');
          this.commonFetch(this.props.studentSalariesStore.PageNo);
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  render() {
    return (
      <div id="MainCol" style={{ paddingBottom: '0px' }} class="col span-3-4 noPadLt padRt">
        <div id="MyAccountSalaries" class="module">
          <h1>Salaries</h1>
          {/*<Link
            // onClick={(event) => this.props.openCommonContributionPage(event, 'salaries')}
            to="/CommonContribute"
            // href="/mz-survey/start_input.htm?showSurvey=SALARIES&amp;c=PAGE_MYACCOUNT_TOP"
            // id="AddSalary"
            class="gd-btn gd-btn-link gradient gd-btn-1 gd-btn-med ctaButtons margBot"
          >
            <span>Add a Salary</span>
            <i class="hlpr"></i>
          </Link>*/}
          <p> All salaries you've posted are displayed below.</p>
          <table class="std fill tbl">
            <thead>
              <tr>
                <th class="summary chubby middle">Details</th>
                <th class="submitted center middle">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {this.props.studentSalariesStore.SalaryList.length === 0 ? (
                <tr>
                  <td colspan="4">
                    <p> You have not yet submitted any Salary Review. </p>
                  </td>
                </tr>
              ) : (
                ''
              )}
              {this.props.studentSalariesStore.SalaryList.map((salary) => (
                <SalaryCard
                  delete={(event) => this.delete(event, salary.SalaryReviewID)}
                  salary={salary}
                  openCompanyProfile={(event) => this.props.openCompanyProfile(event)}
                />
              ))}
            </tbody>
          </table>
          {this.props.studentSalariesStore.SalaryList.length > 0 ? (
            <PaginationComponent
              PageCount={this.props.studentSalariesStore.PageCount}
              PageNo={this.props.studentSalariesStore.PageNo}
              onPageClick={(e) => {
                this.onPageClick(e);
              }}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

// export default Salaries;

const mapStateToProps = (state) => {
  const { studentSalariesStore } = state.StudentContributionsReducer;
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    studentSalariesStore,
    studentInfoStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudentSalariesStore: (payload) => {
      dispatch({
        type: updateStudentSalariesStore,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Salaries);
