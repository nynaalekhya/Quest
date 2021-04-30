import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LowerNavBarOther, updateInterviewList } from '../../../constants/action-types';
import PaginationComponent from '../../Student/Common/PaginationComponent';
// import './interviewList.css';
import axios from 'axios';
import serverUrl from '../../../config';
import { history } from '../../../App';
import CompanyInterviewCard from './CompanyInterviewCard';
import '../../Student/CompanyProfile/CompanyInterviews/CompanyInterviews.css';
import { Redirect } from 'react-router';

class InterviewListAdmin extends Component {
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
      .get(serverUrl + 'admin/getInterviewReviews', {
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
            interviewSearchList: response.data[0].Review,
            PageNo,
            PageCount: Math.ceil(response.data[1].Count / 10),
            Totalcount: response.data[1].Count,
            PendingTab,
            ApprovedTab,
            DisapprovedTab,
            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateInterviewList(payload);
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
    if (this.props.interviewListStore.PendingTab) {
      Status = 'Not Approved';
    } else if (this.props.interviewListStore.ApprovedTab) {
      Status = 'Approved';
    } else if (this.props.interviewListStore.DisapprovedTab) {
      Status = 'Disapproved';
    }
    this.commonFetch(
      e.selected,
      Status,
      this.props.interviewListStore.PendingTab,
      this.props.interviewListStore.ApprovedTab,
      this.props.interviewListStore.DisapprovedTab
    );
  };

  openCompanyProfile = (event, CompanyID) => {
    localStorage.setItem('companyID', CompanyID);
    history.push('/CompanyPageAdminView');
  };

  buttonClicked = (event, Status, InterviewReviewID, CompanyID) => {
    event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      Status,
      InterviewReviewID,
      CompanyID,
    };
    axios.post(serverUrl + 'admin/updateInterviewReviews', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          if (this.props.interviewListStore.PendingTab) {
            Status = 'Not Approved';
          } else if (this.props.interviewListStore.ApprovedTab) {
            Status = 'Approved';
          } else if (this.props.interviewListStore.DisapprovedTab) {
            Status = 'Disapproved';
          }
          this.commonFetch(
            this.props.interviewListStore.PageNo,
            Status,
            this.props.interviewListStore.PendingTab,
            this.props.interviewListStore.ApprovedTab,
            this.props.interviewListStore.DisapprovedTab
          );
          // let InterViewList = [...this.props.interviewListStore.interviewSearchList];
          // const index = InterViewList.findIndex((x) => x.InterviewReviewID === InterviewReviewID);
          // let interview = { ...InterViewList[index] };

          // interview.Status = Status;
          // InterViewList[index] = interview;
          // let payload = {
          //   interviewSearchList: InterViewList,
          // };

          // this.props.updateInterviewList(payload);
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  changePendingTab = (event) => {
    event.preventDefault();
    if (this.props.interviewListStore.PendingTab) {
      // this.setState({ PendingTab: false, ApprovedTab: false, DisapprovedTab: false });
      this.commonFetch(0, '', false, false, false);
    } else {
      // this.setState({
      //   PendingTab: true,
      //   ApprovedTab: false,
      //   DisapprovedTab: false,
      // });
      this.commonFetch(0, 'Not Approved', true, false, false);
      // this.commonFetch(0, 'Not Approved');
    }
  };

  changeApprovedTab = (event) => {
    event.preventDefault();
    if (this.props.interviewListStore.ApprovedTab) {
      // this.setState({ PendingTab: false, ApprovedTab: false, DisapprovedTab: false });
      this.commonFetch(0, '', false, false, false);
    } else {
      // this.setState({
      //   PendingTab: false,
      //   ApprovedTab: true,
      //   DisapprovedTab: false,
      // });
      this.commonFetch(0, 'Approved', false, true, false);
      // this.commonFetch(0, 'Approved');
    }
  };
  changeDisapprovedTab = (event) => {
    event.preventDefault();
    if (this.props.interviewListStore.DisapprovedTab) {
      // this.setState({ PendingTab: false, ApprovedTab: false, DisapprovedTab: false });
      this.commonFetch(0, '', false, false, false);
    } else {
      // this.setState({
      //   PendingTab: false,
      //   ApprovedTab: false,
      //   DisapprovedTab: true,
      // });
      // this.commonFetch(0, 'Disapproved');
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
                                    {this.props.interviewListStore.interviewSearchList.length ===
                                    0 ? (
                                      <h2 class="block" style={{ fontWeight: '400' }}>
                                        No interviews found, try different seach criteria
                                      </h2>
                                    ) : (
                                      <h2 class="block" style={{ fontWeight: '400' }}>
                                        {localStorage.getItem('SearchString')} Interview Questions
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
                                              this.props.interviewListStore.PendingTab
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
                                              this.props.interviewListStore.DisapprovedTab
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
                                              this.props.interviewListStore.ApprovedTab
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
                                        {this.props.interviewListStore.interviewSearchList.map(
                                          (interview) => (
                                            <CompanyInterviewCard
                                              openCompanyProfile={(event) =>
                                                this.openCompanyProfile(event, interview.CompanyID)
                                              }
                                              buttonClicked={(event, Status) =>
                                                this.buttonClicked(
                                                  event,
                                                  Status,
                                                  interview.InterviewReviewID,
                                                  interview.CompanyID
                                                )
                                              }
                                              interview={interview}
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
                                        {this.props.interviewListStore.interviewSearchList.length >
                                        0 ? (
                                          <div class="margTopSm">
                                            <strong>
                                              {this.props.interviewListStore.PageNo * 10 + 1}
                                            </strong>
                                            –
                                            <strong>
                                              {' '}
                                              {this.props.interviewListStore.interviewSearchList
                                                .length +
                                                this.props.interviewListStore.PageNo * 10}
                                            </strong>{' '}
                                            of{' '}
                                            <strong>
                                              {this.props.interviewListStore.Totalcount}
                                            </strong>{' '}
                                            Interview Questions
                                          </div>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                      {this.props.interviewListStore.interviewSearchList.length >
                                      0 ? (
                                        <PaginationComponent
                                          PageCount={this.props.interviewListStore.PageCount}
                                          PageNo={this.props.interviewListStore.PageNo}
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
  const { interviewListStore } = state.InterviewListReducer;

  return {
    interviewListStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LowerNavBarOther: (payload) => {
      dispatch({
        type: LowerNavBarOther,
        payload,
      });
    },
    updateInterviewList: (payload) => {
      dispatch({
        type: updateInterviewList,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterviewListAdmin);
