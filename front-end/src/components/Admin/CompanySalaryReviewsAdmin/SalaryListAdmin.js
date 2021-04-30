import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCompanySalariesStore } from '../../../constants/action-types';
import PaginationComponent from '../../Student/Common/PaginationComponent';
// import './interviewList.css';
import axios from 'axios';
import serverUrl from '../../../config';
import { history } from '../../../App';
import SalaryReviewCard from './SalaryReviewCard';
import '../../Student/CompanyProfile/CompanyInterviews/CompanyInterviews.css';
import { Redirect } from 'react-router';

class SalaryListAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { PendingTab: false, ApprovedTab: false, DisapprovedTab: false };
  }

  commonFetch = (
    PageNo = 0,
    Status = '',
    PendingTab = false,
    ApprovedTab = false,
    DisapprovedTab = false
  ) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'admin/getSalaryReviews', {
        params: {
          Status,
          PageNo,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('interview list', response.data);
          let payload = {
            SalaryList: response.data[0].Review,
            PageNo,
            PageCount: Math.ceil(response.data[1].Count / 10),
            Totalcount: response.data[1].Count,
            PendingTab,
            ApprovedTab,
            DisapprovedTab,
            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateCompanySalariesStore(payload);
        },
        (error) => {
          console.log('error', error);
        }
      );
  };

  componentDidMount() {
    localStorage.setItem('companyID', '');
    this.commonFetch();
  }

  onPageClick = (e) => {
    let Status = '';
    if (this.props.companySalariesStore.PendingTab) {
      Status = 'Not Approved';
    } else if (this.props.companySalariesStore.ApprovedTab) {
      Status = 'Approved';
    } else if (this.props.companySalariesStore.DisapprovedTab) {
      Status = 'Disapproved';
    }
    this.commonFetch(
      e.selected,
      Status,
      this.props.companySalariesStore.PendingTab,
      this.props.companySalariesStore.ApprovedTab,
      this.props.companySalariesStore.DisapprovedTab
    );
  };

  openCompanyProfile = (event, CompanyID) => {
    localStorage.setItem('companyID', CompanyID);
    history.push('/CompanyPageAdminView');
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
          if (this.props.companySalariesStore.PendingTab) {
            Status = 'Not Approved';
          } else if (this.props.companySalariesStore.ApprovedTab) {
            Status = 'Approved';
          } else if (this.props.companySalariesStore.DisapprovedTab) {
            Status = 'Disapproved';
          }
          this.commonFetch(
            this.props.companySalariesStore.PageNo,
            Status,
            this.props.companySalariesStore.PendingTab,
            this.props.companySalariesStore.ApprovedTab,
            this.props.companySalariesStore.DisapprovedTab
          );
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  changePendingTab = (event) => {
    event.preventDefault();
    if (this.props.companySalariesStore.PendingTab) {
      this.commonFetch(0, '', false, false, false);
    } else {
      this.commonFetch(0, 'Not Approved', true, false, false);
    }
  };

  changeApprovedTab = (event) => {
    event.preventDefault();
    if (this.props.companySalariesStore.ApprovedTab) {
      this.commonFetch(0, '', false, false, false);
    } else {
      this.commonFetch(0, 'Approved', false, true, false);
    }
  };
  changeDisapprovedTab = (event) => {
    event.preventDefault();
    if (this.props.companySalariesStore.DisapprovedTab) {
      this.commonFetch(0, '', false, false, false);
    } else {
      this.commonFetch(0, 'Disapproved', false, false, true);
    }
  };

  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'company') {
        return <Redirect to="/Employer" />;
      } else if (localStorage.getItem('userrole') === 'student') {
        return <Redirect to="/Home" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    return (
      <body className="main flex loggedIn lang-en en-US hollywood  _initOk noTouch desktop">
        {/*<Navbar />*/}
        <div class="pageContentWrapperStudent ">
          <div id="PageContent">
            <div id="PageBodyContents" class="meat">
              <div class="pageInsideContent cf">
                <div id="nodeReplace">
                  <main class="gdGrid">
                    <div id="EI-Srch">
                      <div id="SearchResults">
                        <div id="InterviewsSearchResults">
                          <div class="flex-aside">
                            <article style={{ position: 'relative' }} id="MainCol" class="mainCol">
                              <div class="module padHorzLg padVertLg">
                                <div id="InterviewQuestionList" class="module">
                                  <header class="lined">
                                    {this.props.companySalariesStore.SalaryList.length === 0 ? (
                                      <h2 class="block" style={{ fontWeight: '400' }}>
                                        No Salary Reviews found, try different seach criteria
                                      </h2>
                                    ) : (
                                      <h2 class="block" style={{ fontWeight: '400' }}>
                                        {localStorage.getItem('SearchString')} Salary Reviews
                                      </h2>
                                    )}
                                  </header>
                                  <div class="lined" id="dynamicFiltersContainer">
                                    <div className="selectContainer">
                                      <div class="button-set ">
                                        <div>
                                          <div
                                            style={{
                                              paddingLeft: '30%',
                                            }}
                                            onClick={this.changePendingTab}
                                            class={
                                              this.props.companySalariesStore.PendingTab
                                                ? 'selected'
                                                : ''
                                            }
                                            tabindex="0"
                                          >
                                            <label
                                              style={{ height: '40px' }}
                                              for="employerUIData.state.employerReview.currentJob_true"
                                            >
                                              Pending
                                            </label>
                                            <input
                                              class="hidden"
                                              type="radio"
                                              name="employerUIData.state.employerReview.currentJob"
                                              id="employerUIData.state.employerReview.currentJob_true"
                                              value="true"
                                              checked=""
                                            />
                                          </div>
                                          <div
                                            onClick={this.changeDisapprovedTab}
                                            class={
                                              this.props.companySalariesStore.DisapprovedTab
                                                ? 'selected'
                                                : ''
                                            }
                                            tabindex="0"
                                          >
                                            <label
                                              style={{ height: '40px' }}
                                              for="employerUIData.state.employerReview.currentJob_false"
                                            >
                                              Disapproved
                                            </label>
                                            <input
                                              class="hidden"
                                              type="radio"
                                              name="employerUIData.state.employerReview.currentJob"
                                              id="employerUIData.state.employerReview.currentJob_false"
                                              value="false"
                                            />
                                          </div>
                                          <div
                                            onClick={this.changeApprovedTab}
                                            class={
                                              this.props.companySalariesStore.ApprovedTab
                                                ? 'selected'
                                                : ''
                                            }
                                            tabindex="0"
                                          >
                                            <label
                                              style={{ height: '40px' }}
                                              for="employerUIData.state.employerReview.currentJob_false"
                                            >
                                              Approved
                                            </label>
                                            <input
                                              class="hidden"
                                              type="radio"
                                              name="employerUIData.state.employerReview.currentJob"
                                              id="employerUIData.state.employerReview.currentJob_false"
                                              value="false"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="module interviewsAndFilter">
                                    <div id="EmployerInterviews">
                                      <ol class="empReviews tightLt">
                                        {this.props.companySalariesStore.SalaryList.map(
                                          (salary) => (
                                            <SalaryReviewCard
                                              openCompanyProfile={(event) =>
                                                this.openCompanyProfile(event, salary.CompanyID)
                                              }
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
                                          )
                                        )}
                                      </ol>
                                      <div class="margTop">
                                        <div class="breadcrumbList margTop">
                                          <div
                                            class="breadcrumb ib "
                                            itemscope=""
                                            itemtype="http://data-vocabulary.org/Breadcrumb"
                                          >
                                            <a
                                              itemprop="url"
                                              href="/Interview/index.htm"
                                              data-ga-lbl=""
                                            >
                                              <span itemprop="title">Inter­views</span>{' '}
                                              &nbsp;&gt;&nbsp;{' '}
                                            </a>
                                          </div>
                                          <div
                                            class="breadcrumb ib "
                                            itemprop="child"
                                            itemscope=""
                                            itemtype="http://data-vocabulary.org/Breadcrumb"
                                          >
                                            <a
                                              itemprop="url"
                                              // href="/Interview/Amazon-Interview-Questions-E6036.htm"
                                              data-ga-lbl=""
                                            >
                                              <span itemprop="title">
                                                {/*
                                                  this.props.companyOverviewStore.companyOverview
                                                    .CompanyName
                                                */}
                                              </span>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="tbl fill margTopSm">
                                    <div class="row alignMid">
                                      <div class="cell span-1-2 drop noWrap middle">
                                        {this.props.companySalariesStore.SalaryList.length > 0 ? (
                                          <div class="margTopSm">
                                            <strong>
                                              {this.props.companySalariesStore.PageNo * 10 + 1}
                                            </strong>
                                            –
                                            <strong>
                                              {' '}
                                              {this.props.companySalariesStore.SalaryList.length +
                                                this.props.companySalariesStore.PageNo * 10}
                                            </strong>{' '}
                                            of{' '}
                                            <strong>
                                              {this.props.companySalariesStore.Totalcount}
                                            </strong>{' '}
                                            Salary Reviews
                                          </div>
                                        ) : (
                                          ''
                                        )}
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
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

// export default interviewList;
const mapStateToProps = (state) => {
  const { companySalariesStore } = state.CompanyPageReducer;

  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(SalaryListAdmin);
