import React, { Component } from 'react';
import './CompanySalaries.css';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updateCompanySalariesStore } from '../../../../constants/action-types';
import { connect } from 'react-redux';
import PaginationComponent from '../../../Student/Common/PaginationComponent';
import SalaryReviewCard from '../../CompanySalaryReviewsAdmin/SalaryReviewCard';

class CompanySalaries extends Component {
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
      .get(serverUrl + 'admin/getCompanySalaryReviews', {
        params: {
          CompanyID: localStorage.getItem('companyID'),
          PageNo,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('Salaryies', response.data);
          let payload = {
            SalaryList: response.data[0].Review,
            PageNo,
            Totalcount: response.data[1].Count,
            PageCount: Math.ceil(response.data[1].Count / 10),

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateCompanySalariesStore(payload);
        },
        (error) => {
          console.log('error', error);
        }
      );
  };

  buttonClicked = (event, Status, SalaryReviewID, CompanyID) => {
    event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      Status,
      SalaryReviewID,
      CompanyID,
    };
    axios.post(serverUrl + 'admin/updateSalaryReviews', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.commonFetch(this.props.companySalariesStore.PageNo);
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  onPageClick = (e) => {
    // console.log('Page Clicked:', e.selected);
    this.commonFetch(e.selected);
  };

  render() {
    return (
      <article id="MainCol">
        <div id="nodeReplace">
          <main class="gdGrid">
            <div data-test="ei-salaries">
              <div class="eiSalaries__EISalariesStyle__salariesContainer module ">
                <div id="SalariesRef">
                  {this.props.companySalariesStore.SalaryList.length === 0 ? (
                    <tr>
                      <td colspan="4">
                        <p>Employees haven't posted any Salary review yet </p>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  <div data-test="salary-list-items">
                    {this.props.companySalariesStore.SalaryList.map((salary) => (
                      <ol class="empReviews tightLt">
                        <SalaryReviewCard
                          buttonClicked={(event, Status) =>
                            this.buttonClicked(
                              event,
                              Status,
                              salary.SalaryReviewID,
                              salary.CompanyID
                            )
                          }
                          salary={salary}
                        />
                      </ol>
                    ))}
                  </div>
                </div>
                {this.props.companySalariesStore.SalaryList.length > 0 ? (
                  <PaginationComponent
                    PageCount={this.props.companySalariesStore.PageCount}
                    PageNo={this.props.companySalariesStore.PageNo}
                    onPageClick={(e) => {
                      this.onPageClick(e);
                    }}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </main>
        </div>
      </article>
    );
  }
}

// export default CompanySalaries;

const mapStateToProps = (state) => {
  const { companyOverviewStore, companySalariesStore } = state.CompanyPageReducer;

  return {
    companyOverviewStore,
    companySalariesStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCompanySalariesStore: (payload) => {
      dispatch({
        type: updateCompanySalariesStore,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanySalaries);
