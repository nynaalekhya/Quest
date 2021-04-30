import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
// import defaultplaceholder from '../CompanyNavbar/default-placeholder.png';
import { switchTab } from '../../../constants/action-types';

class AllReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  openCompanyTab = (event, tab) => {
    const payload = {
      selectedTab: tab,
    };
    //CompanySalaries
    //CompanyInterviews
    //GeneralReview
    this.props.switchTab(payload);
    this.props.openCompanyProfile(event);
  };
  render() {
    const review = this.props.review;

    return (
      <li class="empReview cf  " id="empReview_9642081">
        <div class="gdReview">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <time
                class="date subtle small"
                datetime="Sat Feb 20 2016 18:05:10 GMT-0800 (Pacific Standard Time)"
              >
                {moment(review.DatePosted).format('ll')}
              </time>
            </div>
            <div class="helpfulReviews helpfulCount small subtle"></div>
          </div>
          <h1 class="h2 summary strong mt-0 mb-xsm">
            <a
              onClick={(event) => this.openCompanyTab(event, 'GeneralReview')}
              href="#"
              class="reviewLink"
            >
              {review.CompanyName}{' '}
            </a>
          </h1>
          <div id="companyReview" class="row mt">
            <div class="col-sm-11 pl-sm-lg  mx-0">
              <div class="">
                <h2 class="h2 summary strong mt-0 mb-xsm">
                  <a class="reviewLink">{review.Headline} </a>
                </h2>
                <div class="mr-xsm d-lg-inline-block">
                  <span class="gdStars gdRatings subRatings__SubRatingsStyles__gdStars">
                    <div class=" v2__EIReviewsRatingsStylesV2__ratingInfoWrapper">
                      <div class="v2__EIReviewsRatingsStylesV2__ratingInfo" rel="nofollow">
                        <div class="v2__EIReviewsRatingsStylesV2__ratingNum v2__EIReviewsRatingsStylesV2__small">
                          {review.Rating}
                        </div>
                        <span class="gdStars gdRatings common__StarStyles__gdStars">
                          <span class="rating">
                            <span title="3.0"></span>
                          </span>
                          <div font-size="sm" class={`css-9iyzoc${review.Rating}s`}>
                            <span role="button">★</span>
                            <span role="button">★</span>
                            <span role="button">★</span>
                            <span role="button">★</span>
                            <span role="button">★</span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </span>
                </div>
                <div class="d-lg-inline-block">
                  <div class="author minor">
                    <span class="authorInfo">
                      <span class="authorJobTitle middle">
                        {review.EmployeeStatus} Employee - {review.JobTitle}
                      </span>
                    </span>
                  </div>
                </div>
                <div>
                  <div id="companyReview" class="row reviewBodyCell recommends">
                    <div class="col-sm-4 d-flex align-items-center">
                      <i
                        class={`sqLed middle sm mr-xsm ${review.Recommended ? 'green' : 'red'}`}
                      ></i>
                      <span>Recommends</span>
                    </div>

                    <div class="col-sm-4 d-flex align-items-center">
                      <i
                        class={`sqLed middle sm mr-xsm ${review.CEOApproval ? 'green' : 'red'}`}
                      ></i>
                      <span>Approves of CEO</span>
                    </div>
                  </div>
                </div>
                <p class="mainText mb-0">{review.Descriptions}</p>
              </div>
              <div class="">
                <div class="v2__EIReviewDetailsV2__fullWidth v2__EIReviewDetailsV2__clickable">
                  <p class="strong mb-0 mt-xsm">Pros</p>
                  <p class="mt-0 mb-xsm v2__EIReviewDetailsV2__bodyColor v2__EIReviewDetailsV2__lineHeightLarge v2__EIReviewDetailsV2__isCollapsed  ">
                    <span data-test="pros">{review.Pros}</span>
                  </p>
                </div>
                <div class="v2__EIReviewDetailsV2__fullWidth v2__EIReviewDetailsV2__clickable">
                  <p class="strong mb-0 mt-xsm">Cons</p>
                  <p class="mt-0 mb-xsm v2__EIReviewDetailsV2__bodyColor v2__EIReviewDetailsV2__lineHeightLarge v2__EIReviewDetailsV2__isCollapsed  ">
                    <span data-test="cons">{review.Cons}</span>
                  </p>
                </div>
                <div class="row mt-xsm mx-0"></div>
                {/*<div
                  id="companyReview"
                  class="justify-content-around justify-content-md-between mt-lg row"
                >
                  <div
                    style={{ visibility: 'hidden' }}
                    class="shareContent d-flex justify-content-center"
                  >
                    <div class="share-callout-inline">
                      <div class="callout-container">
                        <ul class="d-table social-share-icon-list p-0">
                          <li class="cell">
                            <a
                              class="social-share-icon facebook-share"
                              href="#shareOnFacebook"
                              data-url="undefined/Reviews/Employee-Review-Amazon-RVW9642081.htm"
                              data-label="facebook"
                            >
                              <span class="offScreen">Share on Facebook</span>
                            </a>
                          </li>
                          <li class="cell">
                            <a
                              class="social-share-icon twitter-share"
                              href="https://twitter.com/share?url=undefined/Reviews/Employee-Review-Amazon-RVW9642081.htm&amp;text=Amazon+review+on+%23Glassdoor%3A+%22Exciting Work, Abusive Culture%22"
                              data-label="twitter"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <span class="offScreen">Share on Twitter</span>
                            </a>
                          </li>
                          <li class="cell whatsapp">
                            <a
                              class="social-share-icon whatsapp-share"
                              href="whatsapp://send?text=undefined/Reviews/Employee-Review-Amazon-RVW9642081.htm"
                              data-action="share/whatsapp/share"
                              data-label="whatsapp"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <span class="offScreen">Share on WhatsApp</span>
                            </a>
                          </li>
                          <li class="cell">
                            <a
                              class="social-share-icon email-share"
                              href="mailto:?Subject=Amazon review on Glassdoor&amp;body=Read this review of Amazon on Glassdoor. %22Exciting Work, Abusive Culture%22&nbsp;undefined/Reviews/Employee-Review-Amazon-RVW9642081.htm"
                              data-label="email"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <span class="offScreen">Share via Email</span>
                            </a>
                          </li>
                          <li class="cell">
                            <a
                              class="social-share-icon link-share"
                              href="undefined/Reviews/Employee-Review-Amazon-RVW9642081.htm"
                              data-label="link"
                            >
                              <span class="offScreen">Copy Link</span>
                            </a>
                          </li>
                          <li class="cell linkCopySuccess">
                            <span class="social-share-icon icon-check showDesk"></span>
                            <span>Link Copied!</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="mr-md">
                      <button
                        onClick={this.props.helpfulClicked}
                        // class="gd-ui-button  css-glrvaa"
                        class={`gd-ui-button ${
                          this.props.studentInfoStore.studentProfile.HelpfullGeneralReviews.includes(
                            review.ID
                          )
                            ? 'css-1s91m8l'
                            : 'css-glrvaa'
                        }`}
                      >
                        Helpful ({review.Helpful})
                      </button>
                    </div>
                  </div>
                </div>
                      */}
                <div class="reviewComments">
                  <div class="reviewFooter cf">
                    {review.Status !== 'Not Approved' ? (
                      <strong style={{ float: 'right' }}>{review.Status}</strong>
                    ) : (
                      ''
                    )}
                    {review.Status === 'Not Approved' ? (
                      <div class="floatRt helpfulBtn margRtMd tightVert">
                        <span
                          class="block voteHelpful"
                          data-member="true"
                          data-type="INTERVIEW_REVIEW"
                          data-id="31683611"
                          data-count="189"
                        >
                          <button
                            style={{ backgroundColor: '#1861bf' }}
                            onClick={(event) => this.props.buttonClicked(event, 'Approved')}
                            type="button"
                            class="tight gd-btn gd-btn-button gd-btn-2 gd-btn-sm gradient"
                          >
                            <span>
                              Approve
                              <span class="count"></span>
                            </span>
                            <i class="hlpr"></i>
                          </button>
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                    {review.Status === 'Not Approved' ? (
                      <div
                        style={{ paddingRight: '2%' }}
                        class="floatRt helpfulBtn margRtMd tightVert"
                      >
                        <span
                          class="block voteHelpful"
                          data-member="true"
                          data-type="INTERVIEW_REVIEW"
                          data-id="31683611"
                          data-count="189"
                        >
                          <button
                            style={{ backgroundColor: '#1861bf' }}
                            onClick={(event) => this.props.buttonClicked(event, 'Disapproved')}
                            type="button"
                            class="tight gd-btn gd-btn-button gd-btn-2 gd-btn-sm gradient"
                          >
                            <span>
                              Disappove
                              <span class="count"></span>
                            </span>
                            <i class="hlpr"></i>
                          </button>
                        </span>
                      </div>
                    ) : (
                      ''
                    )}{' '}
                  </div>
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

// export default AllReview;
const mapStateToProps = (state) => {
  const { companyOverviewStore } = state.CompanyPageReducer;
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    companyOverviewStore,
    studentInfoStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (payload) => {
      dispatch({
        type: switchTab,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllReview);
