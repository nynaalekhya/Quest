import React, { Component } from 'react';
import SpecialReview from '../CompanyReviews/SpecialReview';
import './CompanyOverView.css';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updatespecialReviews } from '../../../../constants/action-types';
import { connect } from 'react-redux';
import moment from 'moment';

class CompanyOverView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'student/featureReview', {
        params: { CompanyID: localStorage.getItem('companyID') },
        withCredentials: true,
      })
      .then((response) => {
        console.log('compsnyData:', response.data);
        const payload = {
          featuredReview: { ...response.data.featuredReview },
          positiveReview: { ...response.data.positiveReview },
          negatieReview: { ...response.data.negativeReview },
        };
        this.props.updatespecialReviews(payload);
      });
  }
  render() {
    let recomendPercentage = 0;
    if (this.props.companyOverviewStore.companyOverview.recommendedcount > 0) {
      recomendPercentage = Math.round(
        (this.props.companyOverviewStore.companyOverview.recommendedcount /
          this.props.companyOverviewStore.companyOverview.GeneralReviewCount) *
          100
      );
    }

    let approvCEOPercentage = 0;
    if (this.props.companyOverviewStore.companyOverview.approveCEOcount > 0) {
      approvCEOPercentage = Math.round(
        (this.props.companyOverviewStore.companyOverview.approveCEOcount /
          this.props.companyOverviewStore.companyOverview.GeneralReviewCount) *
          100
      );
    }
    let rating = 0;
    if (this.props.companyOverviewStore.companyOverview.GeneralReviewCount > 0) {
      rating = Math.round(
        this.props.companyOverviewStore.companyOverview.TotalGeneralReviewRating /
          this.props.companyOverviewStore.companyOverview.GeneralReviewCount
      );
    }
    return (
      <article id="MainCol">
        <div className="gdGrid">
          <div id="EIOverviewContainer">
            <div className="css-ifw56c">
              <div
                className="  gd-ui-module css-lcvd8h"
                data-brandviews="MODULE:n=eiOverview-baseOverview:eid=6036"
                data-test="employerOverviewModule"
              >
                <header className="d-flex align-items-center justify-content-between mb-std">
                  <h2 className="my-0" data-test="employerOverviewHeader">
                    {this.props.companyOverviewStore.companyOverview.CompanyName} Overview
                  </h2>
                </header>
                <ul id="companyOverView" className="css-155za0w row px-0 m-0">
                  <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-xxsm">
                    <label className="css-1f0lhlt ecl3kjh0">Website:</label>
                    <a
                      href={`//${this.props.companyOverviewStore.companyOverview.Website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="css-1hg9omi"
                      data-test="employer-website"
                    >
                      {this.props.companyOverviewStore.companyOverview.Website}
                    </a>
                  </li>
                  <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                    <label className="css-1f0lhlt ecl3kjh0">Headquarters:</label>
                    <div data-test="employer-headquarters">
                      {' '}
                      {this.props.companyOverviewStore.companyOverview.Headquarter}
                    </div>
                  </li>
                  <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                    <label className="css-1f0lhlt ecl3kjh0">Size:</label>
                    <div data-test="employer-size">
                      {this.props.companyOverviewStore.companyOverview.Size}+ Employees
                    </div>
                  </li>
                  <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                    <label className="css-1f0lhlt ecl3kjh0">Founded:</label>
                    <div data-test="employer-founded">
                      {this.props.companyOverviewStore.companyOverview.Founded
                        ? moment(this.props.companyOverviewStore.companyOverview.Founded).format(
                            'YYYY'
                          )
                        : ''}
                    </div>
                  </li>
                  <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                    <label className="css-1f0lhlt ecl3kjh0">Type:</label>
                    <div data-test="employer-type">
                      Company - {this.props.companyOverviewStore.companyOverview.Type}
                    </div>
                  </li>
                  <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                    <label className="css-1f0lhlt ecl3kjh0">Industry:</label>
                    <div data-test="employer-industry">
                      {this.props.companyOverviewStore.companyOverview.Industry}
                    </div>
                  </li>
                  <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                    <label className="css-1f0lhlt ecl3kjh0">Revenue:</label>
                    <div data-test="employer-revenue">
                      ${this.props.companyOverviewStore.companyOverview.Revenue}+ billion (USD)
                    </div>
                  </li>
                </ul>
                <div className="my-std css-1raszzq e16x8fv01">
                  <p className="strong"></p>
                  <span data-test="employerDescription">
                    {this.props.companyOverviewStore.companyOverview.CompanyDescription}
                  </span>
                </div>
                <hr className="my-std css-1g9ch1j e1keu4zk0" />
              </div>
              <div className="mt-std gd-ui-module css-lcvd8h" data-test="wwwu-component">
                <h2 data-brandviews="MODULE:n=eiOverview-wwwu:eid=6036" data-test="wwwu-header">
                  Amazon - Why Work With Us?
                </h2>
                <div className="css-79elbk e1uqj0m80">
                  <div className="css-14aw92t">
                    <div className="mt-xxl mb-std css-btxr0m e1uqj0m81">
                      <div data-test="wwwu-textContent">
                        <p>
                          <strong>Our mission: </strong>
                        </p>
                        <p>{this.props.companyOverviewStore.companyOverview.CompanyMission}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-std gd-ui-module css-lcvd8h">
                <h2 className="title css-1bqzjlu">Amazon Reviews</h2>
                <header className="item m-0">
                  <span className="hidden fn">Amazon</span>
                  <span className="hidden count">
                    {this.props.companyOverviewStore.companyOverview.GeneralReviewCount}
                  </span>
                </header>
                <div className="mb-md-md mb-xsm d-flex justify-content-center align-items-center">
                  <div className="mr-xsm css-1udf4qc eky1qiu0">{rating}</div>
                  <div font-size="md" className={`css-1nka8iu${rating}s`}>
                    <span role="button">★</span>
                    <span role="button">★</span>
                    <span role="button">★</span>
                    <span role="button">★</span>
                    <span role="button">★</span>
                  </div>
                </div>
                <div className="row d-flex align-items-start">
                  <div
                    className="col-4 d-flex justify-content-center"
                    data-percentage="76"
                    id="EmpStats_Recommend"
                  >
                    <div className="d-table">
                      <div className="d-lg-table-cell posRl middle css-1h8alnk e1chagab0">
                        <svg
                          width="66"
                          height="66"
                          className="donutChart d-block"
                          style={{ fill: 'transparent' }}
                        >
                          <circle
                            r="29"
                            cx="33"
                            cy="33"
                            transform="rotate(-90 33,33)"
                            className="track"
                            style={{ stroke: 'rgb(222, 224, 227)', strokeWidth: '8' }}
                          ></circle>
                          <circle
                            r="29"
                            cx="33"
                            cy="33"
                            transform="rotate(-90 33,33)"
                            className="indicator"
                            style={{
                              stroke: 'rgb(12, 170, 65)',
                              strokeDasharray: `${182 * recomendPercentage * 0.01}, 182.212`,
                              strokeWidth: '8',
                            }}
                          ></circle>
                          <text
                            className="text"
                            x="33"
                            y="33"
                            text-anchor="middle"
                            style={{ fill: 'rgb(12, 170, 65)' }}
                          >
                            <tspan
                              alignment-baseline="middle"
                              className="textVal"
                              style={{ fontSize: '18px' }}
                            >
                              {recomendPercentage}
                            </tspan>
                            <tspan
                              alignment-baseline="middle"
                              baseline-shift="-25%"
                              className="textPercent"
                              style={{ fontSize: '9px' }}
                            >
                              %
                            </tspan>
                          </text>
                        </svg>
                      </div>
                      <div className="d-lg-table-cell middle posRl pt-sm pt-lg-0 px-lg-sm css-ydn16 e1msvi8i0">
                        Recommend to a Friend
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-4 d-flex justify-content-center"
                    data-brandviews="MODULE:n=eiOverview-ceoApproval:eid=6036"
                  >
                    <div className="mx-sm-std" data-percentage="83" id="EmpStats_Approve">
                      <div className="d-table">
                        <div className="d-lg-table-cell posRl middle css-1h8alnk e1chagab0">
                          <svg
                            width="66"
                            height="66"
                            className="donutChart d-block"
                            style={{ fill: 'transparent' }}
                          >
                            <circle
                              r="29"
                              cx="33"
                              cy="33"
                              transform="rotate(-90 33,33)"
                              className="track"
                              style={{ stroke: 'rgb(222, 224, 227)', strokeWidth: '8' }}
                            ></circle>
                            <circle
                              r="29"
                              cx="33"
                              cy="33"
                              transform="rotate(-90 33,33)"
                              className="indicator"
                              style={{
                                stroke: 'rgb(12, 170, 65)',
                                strokeDasharray: `${182 * approvCEOPercentage * 0.01}, 182.212`,
                                strokeWidth: '8',
                              }}
                            ></circle>
                            <text
                              className="text"
                              x="33"
                              y="33"
                              text-anchor="middle"
                              style={{ fill: 'rgb(12, 170, 65)' }}
                            >
                              <tspan
                                alignment-baseline="middle"
                                className="textVal"
                                style={{ fontSize: '18px' }}
                              >
                                {approvCEOPercentage}
                              </tspan>
                              <tspan
                                alignment-baseline="middle"
                                baseline-shift="-25%"
                                className="textPercent"
                                style={{ fontSize: '9px' }}
                              >
                                %
                              </tspan>
                            </text>
                          </svg>
                        </div>
                        <div className="d-lg-table-cell middle posRl pt-sm pt-lg-0 px-lg-sm css-ydn16 e1msvi8i0">
                          Approve of CEO
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 d-flex flex-column flex-lg-row align-items-center d-table css-qr6okv e1khaexh0">
                    <div className="d-lg-table-cell ceoName pt-sm pt-lg-0 px-lg-sm">
                      CEO: {this.props.companyOverviewStore.companyOverview.CEO}
                      <div className="numCeoRatings">{/*26,648 Ratings*/}</div>
                    </div>
                  </div>
                </div>
                {JSON.stringify(this.props.companyOverviewStore.featuredReview) !== '{}' ? (
                  <SpecialReview
                    review={this.props.companyOverviewStore.featuredReview}
                    reviewType={'Featured Review'}
                  />
                ) : (
                  ''
                )}
                {JSON.stringify(this.props.companyOverviewStore.positiveReview) !== '{}' ? (
                  <SpecialReview
                    review={this.props.companyOverviewStore.positiveReview}
                    reviewType={'Most Helpful Positive Review'}
                  />
                ) : (
                  ''
                )}
                {JSON.stringify(this.props.companyOverviewStore.negatieReview) !== '{}' ? (
                  <SpecialReview
                    review={this.props.companyOverviewStore.negatieReview}
                    reviewType={'Most Helpful Negative Review'}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

// export default CompanyOverView;

const mapStateToProps = (state) => {
  const { companyOverviewStore } = state.CompanyPageReducer;

  return {
    companyOverviewStore,
  };
};
// export default CompanySearchResults;
const mapDispatchToProps = (dispatch) => {
  return {
    updatespecialReviews: (payload) => {
      dispatch({
        type: updatespecialReviews,
        payload,
      });
    },
  };
};

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(CompanyOverView);
