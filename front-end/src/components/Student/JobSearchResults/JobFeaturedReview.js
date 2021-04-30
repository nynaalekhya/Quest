import React, { Component } from 'react';
import './JobFeaturedReview.css';
import moment from 'moment';
import axios from 'axios';
import serverUrl from '../../../config';
import { updatespecialReviews } from '../../../constants/action-types';
import { connect } from 'react-redux';
import defaultplaceholder from '../CompanyProfile/CompanyNavbar/default-placeholder.png';

class JobFeaturedReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const selectedJob = this.props.selectedJob;
    // const Rating = 2.0;
    let Rating = 0;
    if (
      selectedJob.jobdetails.length > 0 &&
      selectedJob.jobdetails[0].GeneralReviewCount &&
      selectedJob.jobdetails[0].GeneralReviewCount > 0 &&
      selectedJob.jobdetails[0].TotalGeneralReviewRating &&
      selectedJob.jobdetails[0].TotalGeneralReviewRating > 0
    ) {
      Rating = (
        selectedJob.jobdetails[0].TotalGeneralReviewRating /
        selectedJob.jobdetails[0].GeneralReviewCount
      ).toFixed(1);
    }
    const green = { color: 'rgb(12, 170, 65)' };
    const white = { color: 'rgb(222, 224, 227)' };
    return (
      <div className="tabSection pad" id="ReviewsContainer">
        <header className="margBot">
          <h2 className="h2 tightVert">{selectedJob.CompanyName} Reviews</h2>
        </header>
        <div className="noMargTop padTop noPadHorz noPadBot">
          <div className="reviews-container">
            <div className="reviews-feed-ajax">
              <ol className="empReviews emp-reviews-feed">
                {selectedJob.jobdetails.length > 0 &&
                selectedJob.jobdetails[0].FeaturedReview &&
                selectedJob.jobdetails[0].FeaturedReview.Status === 'Approved' ? (
                  <li className=" empReview cf" id="empReview_37231034">
                    <div>
                      <div className="dateTime">
                        <time className="date">
                          {moment(selectedJob.jobdetails[0].FeaturedReview.DatePosted).format('ll')}
                        </time>
                      </div>
                      <div className="reviewTop">
                        <div className="row">
                          <div className="companyLogo showDesk showTab">
                            <span className="sqLogo">
                              <span>
                                <img
                                  alt="RoadRunner Recycling Logo"
                                  title="RoadRunner Recycling Logo"
                                  src={
                                    selectedJob.jobdetails.length > 0
                                      ? selectedJob.jobdetails[0].ProfileImg
                                        ? selectedJob.jobdetails[0].ProfileImg
                                        : defaultplaceholder
                                      : defaultplaceholder
                                  }
                                />
                              </span>
                            </span>
                          </div>
                          <div className="companyTitle">
                            <h2 className=" h2 strong">
                              <span className="summary padRtSm">
                                {selectedJob.jobdetails[0].FeaturedReview.JobTitle}
                              </span>
                            </h2>
                            <div className="reviewMeta">
                              <div className="gdStarsWrapper"></div>
                              <div className="author">
                                <span className="authorInfo">
                                  <div
                                    font-size="sm"
                                    // className="css-1gf6lcl"
                                    class={`css-1gf6lcl1s`}
                                  >
                                    <span style={Rating >= 1 ? green : white} role="button">
                                      ★
                                    </span>
                                    <span style={Rating >= 2 ? green : white} role="button">
                                      ★
                                    </span>
                                    <span style={Rating >= 3 ? green : white} role="button">
                                      ★
                                    </span>
                                    <span style={Rating >= 4 ? green : white} role="button">
                                      ★
                                    </span>
                                    <span style={Rating >= 5 ? green : white} role="button">
                                      ★
                                    </span>
                                  </div>
                                  <div className="reviewerStatus">
                                    {selectedJob.jobdetails[0].FeaturedReview.EmployeeStatus}{' '}
                                    Employee - {selectedJob.jobdetails[0].FeaturedReview.JobTitle}
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="reviewContent">
                        <div className="row">
                          <div className="cell sqLogoCell showDesk"></div>
                          <div className="reviewBody">
                            <p className="padTopLg noPadBot noMarg">
                              {selectedJob.jobdetails[0].FeaturedReview.Descriptions}
                            </p>
                            <div className="description margTop">
                              <div className="prosConsAdvice">
                                <div className="row">
                                  <div className="cell top">
                                    <p className="strong tightVert">Pros</p>
                                    <p className=" pros mainText">
                                      {selectedJob.jobdetails[0].FeaturedReview.Pros}
                                    </p>
                                  </div>
                                </div>
                                <div className="row padBotLg">
                                  <div className="cell top">
                                    <p className="strong tightVert">Cons</p>
                                    <p className=" cons mainText">
                                      {selectedJob.jobdetails[0].FeaturedReview.Cons}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="outlookEmpReview">
                                <div className="row">
                                  <div className="reviewFooter padTopXl"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  ''
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default JobFeaturedReview;

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
export default connect(mapStateToProps, mapDispatchToProps)(JobFeaturedReview);
