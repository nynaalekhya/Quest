import React, { Component } from 'react';
import './CompanyInterviews.css';
import { PieChart } from 'react-minimal-pie-chart';
import {
  updateCompanyInterviewStore,
  updateStudentProfile,
} from '../../../../constants/action-types';
import { connect } from 'react-redux';
import axios from 'axios';
import serverUrl from '../../../../config';
// import CompanyInterviewCard from './CompanyInterviewCard';
import PaginationComponent from '../../../Student/Common/PaginationComponent';
import CompanyInterviewCard from '../../InterviewSearchResultsAdmin/CompanyInterviewCard';

class CompanyInterviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['a', 'b', 'c'],
      datasets: [
        {
          data: [59, 22, 19],
          backgroundColor: ['red', 'blue', 'green'],
        },
      ],
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/interviewData', {
        params: {
          CompanyID: localStorage.getItem('companyID'),
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('interviewData', response.data);
          let payload = {
            avgDifficulty: response.data.avgDifficulty,
            negative: response.data.negative,
            neutral: response.data.neutral,
            positive: response.data.positive,

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateCompanyInterviewStore(payload);
        },
        (error) => {
          console.log('error', error);
        }
      );

    this.commonFetch();
  }

  commonFetch = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'admin/getCompanyInterviewReviews', {
        params: {
          CompanyID: localStorage.getItem('companyID'),
          PageNo,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('interviewReview', response.data);
          let payload = {
            InterViewList: response.data[0].Review,
            PageNo,
            Totalcount: response.data[1].Count,
            PageCount: Math.ceil(response.data[1].Count / 10),

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateCompanyInterviewStore(payload);
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
          this.commonFetch(this.props.companyInterviewStore.PageNo);
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  render() {
    let positive_percent = 0;
    let negative_percent = 0;
    let neutral_percent = 0;
    if (this.props.companyInterviewStore.Totalcount > 0) {
      positive_percent = Math.round(
        (this.props.companyInterviewStore.positive / this.props.companyInterviewStore.Totalcount) *
          100
      );
      negative_percent = Math.round(
        (this.props.companyInterviewStore.negative / this.props.companyInterviewStore.Totalcount) *
          100
      );
      if (positive_percent > 0 || negative_percent > 0) {
        neutral_percent = 100 - negative_percent - positive_percent;
      }
    }
    let avg = this.props.companyInterviewStore.avgDifficulty;
    let avgRatingGreenColor = avg % 1;
    avg = Number(avg).toFixed(1);
    let styledifficulty = { height: avgRatingGreenColor * 10 };
    return (
      <article id="MainCol">
        <div class="module interviewsWithSgocFiltersv1">
          {' '}
          <div class="module interviewStats ">
            <header>
              <h2>Interviews at {this.props.companyOverviewStore.companyOverview.CompanyName}</h2>
              <div class="fill tbl minor showHH">
                <div class=" cell middle minor">
                  {' '}
                  {this.props.companyInterviewStore.Totalcount} Interview Reviews
                </div>
              </div>
            </header>
            <div class="interviewStatsBody">
              <div class="flexbox fl-between" id="AllStats">
                <div class="cell chartWrapper experience">
                  <h3 class="tightTop hideHH" style={{ height: '24px' }}>
                    {' '}
                    Experience<span class="subtle normal hidden"> &nbsp; 24,977 Ratings</span>
                  </h3>
                  <div class="tbl fill">
                    <div class="row">
                      <div class="cell">
                        <div class="chart" id="ExperienceChart">
                          <svg>
                            {' '}
                            <circle cx="30" cy="30" r="30" fill="#eaeaea"></circle>
                            <PieChart
                              viewBoxSize={[200, 250]}
                              center={[-100, 50]}
                              data={[
                                {
                                  title: 'p',
                                  value: positive_percent,
                                  color: 'rgb(147, 218, 103)',
                                },
                                {
                                  title: 'Nu',
                                  value: neutral_percent,
                                  color: 'rgb(12, 170, 65)',
                                },
                                {
                                  title: 'ThNeree',
                                  value: negative_percent,
                                  color: 'rgb(25, 67, 131)',
                                },
                              ]}
                            />
                            ;
                            {/*<path
                              d="M 30,30 L 30,0 A 30,30 0 1 1 13.950534021574768,55.34589990131286 Z"
                              fill="#93da67"
                            ></path>
                            <path
                              d="M 30,30 L 13.950534021574768,55.34589990131286 A 30,30 0 0 1 2.084673751486921,19.01207205888769 Z"
                              fill="#0caa41"
                            ></path>
                            <path
                              d="M 30,30 L 2.084673751486921,19.01207205888769 A 30,30 0 0 1 29.910000134999954,0.00013499989875143115 Z"
                              fill="#194383"
                            ></path>*/}
                            <circle cx="30" cy="30" r="20.400000000000002" fill="#ffffff"></circle>
                          </svg>{' '}
                        </div>
                      </div>
                      <div class="cell">
                        <div class="tbl dataTbl fill">
                          <div class="showHH margBotSm">
                            <div class="cell tightTop">
                              <div class="h3 tightVert"> Experience</div>
                            </div>
                            <div class="cell"></div>
                          </div>
                          <div class="row" style={{}}>
                            <div class="cell heading">
                              <i
                                class="sqLed middle sm pros top "
                                style={{ backgroundColor: 'rgb(147, 218, 103)' }}
                              ></i>
                              <label class=" pros pct">Positive</label>
                            </div>
                            <div class="cell pct alignRt">
                              <span class="strong num pros pct">{positive_percent}</span>
                              <span class=" pros pct">%</span>
                            </div>
                          </div>
                          <div class="row" style={{}}>
                            <div class="cell heading">
                              <i
                                class="sqLed middle sm pros top "
                                style={{ backgroundColor: 'rgb(12, 170, 65)' }}
                              ></i>
                              <label class=" pros pct">Neutral</label>
                            </div>
                            <div class="cell pct alignRt">
                              <span class="strong num pros pct">{neutral_percent}</span>
                              <span class=" pros pct">%</span>
                            </div>
                          </div>
                          <div class="row" style={{}}>
                            <div class="cell heading">
                              <i
                                class="sqLed middle sm pros top "
                                style={{ backgroundColor: 'rgb(25, 67, 131)' }}
                              ></i>
                              <label class=" pros pct">Negative</label>
                            </div>
                            <div class="cell pct alignRt">
                              <span class="strong num pros pct">{negative_percent}</span>
                              <span class=" pros pct">%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{' '}
                <div class="cell chartWrapper difficulty">
                  <h3 class="tightTop hideHH" style={{ height: '24px' }}>
                    {' '}
                    Difficulty<span class="subtle normal hidden"> &nbsp; 24,977 Ratings</span>
                  </h3>{' '}
                  <div class="tbl dataTbl">
                    <div class="row">
                      <div class="cell middle center subtle difficultyLabelWrapper">
                        <div class="difficultyLabel subtle">{avg}</div> Average
                      </div>
                      <div class="cell ratingBar">
                        <h3 class="tightTop" style={{ height: '24px' }}>
                          {' '}
                          Difficulty
                        </h3>
                        <span class="gdBars gdRatings sm vertical " title="3.0">
                          <div class="row">
                            <i>
                              {avg > 4 ? avg === 5 ? <i></i> : <i style={styledifficulty}></i> : ''}
                            </i>
                            <span class="label pct">Hard</span>
                          </div>
                          <div class="row">
                            <i>
                              {avg > 3 ? avg < 4 ? <i style={styledifficulty}></i> : <i></i> : ''}
                            </i>
                            <span class="label pct"></span>
                          </div>
                          <div class="row">
                            <i>
                              {avg > 2 ? avg < 3 ? <i style={styledifficulty}></i> : <i></i> : ''}
                            </i>
                            <span class="label pct">Average</span>
                          </div>
                          <div class="row">
                            <i>
                              {avg > 1 ? avg < 2 ? <i style={styledifficulty}></i> : <i></i> : ''}
                            </i>
                            <span class="label pct"></span>
                          </div>
                          <div class="row">
                            <i>
                              {avg > 0 ? avg < 1 ? <i style={styledifficulty}></i> : <i></i> : ''}
                            </i>
                            <span class="label pct">Easy</span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="module interviewsAndFilter">
            <div id="EmployerInterviews">
              <ol class="empReviews tightLt">
                {this.props.companyInterviewStore.InterViewList.map((interview) => (
                  <CompanyInterviewCard
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
                ))}
                {/* <div class="hr">
                  <hr />
                </div>*/}
              </ol>
              <div class="margTop">
                <div class="breadcrumbList margTop">
                  <div
                    class="breadcrumb ib "
                    itemscope=""
                    itemtype="http://data-vocabulary.org/Breadcrumb"
                  >
                    <a itemprop="url" href="/Interview/index.htm" data-ga-lbl="">
                      <span itemprop="title">Inter­views</span> &nbsp;&gt;&nbsp;{' '}
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
                        {this.props.companyOverviewStore.companyOverview.CompanyName}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              {this.props.companyInterviewStore.InterViewList.length > 0 ? (
                <PaginationComponent
                  PageCount={this.props.companyInterviewStore.PageCount}
                  PageNo={this.props.companyInterviewStore.PageNo}
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
      </article>
    );
  }
}

// export default CompanyInterviews;

const mapStateToProps = (state) => {
  const { companyInterviewStore, companyOverviewStore } = state.CompanyPageReducer;
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    companyOverviewStore,
    companyInterviewStore,
    studentInfoStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCompanyInterviewStore: (payload) => {
      dispatch({
        type: updateCompanyInterviewStore,
        payload,
      });
    },
    updateStudentProfile: (payload) => {
      dispatch({
        type: updateStudentProfile,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInterviews);
