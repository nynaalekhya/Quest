import React, { Component } from 'react';
import { hideReplyModal, showReplyModal } from '../../../constants/action-types';
import './RightBlock.css';
import ReplyModal from './ReplyModal';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import defaultplaceholder from '../../Student/CompanyProfile/CompanyNavbar/default-placeholder.png';

class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popSeen: false,
      Favorite: 0,
      Feature: 0,
    };
  }

  saveFavorite(ID, Favorite) {
    // this.setState((prevState) => ({
    //   Favorite: !prevState.Favorite,
    // }));
    this.props.handleSaveFavorite(ID, Favorite);
  }

  saveFeatured(ID, companyID) {
    console.log('inside save featured', ID);

    this.props.handleFeatured(ID, companyID);
  }
  showReply = (Id) => {
    // localStorage.setItem('currentId', Id);
    // this.props.showReplyModal();
    this.setState({
      popSeen: true,
    });
  };

  closeReplyModal = () => {
    // this.props.hideReplyModal();
    this.setState({
      popSeen: false,
    });
  };

  render() {
    const review = this.props.review;
    return (
      <div class="gdReview">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <time
              class="date subtle small"
              datetime="Thu Oct 01 2020 15:33:44 GMT-0700 (Pacific Daylight Time)"
            >
              {review.DatePosted.substring(0, 10)}
            </time>
          </div>
        </div>
        <div class="row mt">
          <div class="col-sm-1">
            <span class="sqLogo smSqLogo logoOverlay">
              <img
                alt="Wipro Logo"
                class="lazy lazy-loaded"
                data-retina-ok="true"
                // src="https://media.glassdoor.com/sql/9936/wipro-squarelogo-1562144900841.png"
                style={{ opacity: '1' }}
                title=""
                src={
                  this.props.companyInfo.ProfileImg
                    ? this.props.companyInfo.ProfileImg
                    : defaultplaceholder
                }
              />
            </span>
          </div>
          <div class="col-sm-11 pl-sm-lg  mx-0">
            <div class="">
              <h2 class="h2 summary strong mt-0 mb-xsm">
                <a href="/Reviews/Employee-Review-Wipro-RVW35973660.htm" class="reviewLink">
                  {review.Headline}
                </a>
              </h2>
              <div class="mr-xsm d-lg-inline-block">
                <span class="gdStars gdRatings subRatings__SubRatingsStyles__gdStars">
                  <div class=" v2__EIReviewsRatingsStylesV2__ratingInfoWrapper">
                    <div class="v2__EIReviewsRatingsStylesV2__ratingInfo" rel="nofollow">
                      <div class="v2__EIReviewsRatingsStylesV2__ratingNum v2__EIReviewsRatingsStylesV2__small">
                        {review.Rating}.0
                      </div>
                      <span class="gdStars gdRatings common__StarStyles__gdStars">
                        <span class="rating">
                          <span title="rating"></span>
                        </span>
                        <StarRatings
                          rating={review.Rating}
                          starRatedColor="#0caa41"
                          numberOfStars={5}
                          name="rating"
                          starDimension="12px"
                          starSpacing="1px"
                        />
                      </span>
                    </div>
                  </div>
                </span>
              </div>
              <div class="d-lg-inline-block">
                <div class="author minor">
                  <span class="authorInfo">
                    <span class="authorJobTitle middle">{review.JobTitle}</span>
                  </span>
                </div>
              </div>
              <div>
                <div class="row reviewBodyCell recommends">
                  <div class="col-sm-4 d-flex align-items-center">
                    <i
                      class="sqLed middle sm mr-xsm"
                      style={{
                        backgroundColor: review.Recommended ? 'green' : 'red',
                      }}
                    ></i>
                    <span>Recommends</span>
                  </div>

                  <div class="col-sm-4 d-flex align-items-center">
                    <i
                      class="sqLed sm mr-xsm"
                      onClick={() =>
                        this.props.handleSaveFavorite(review.ID, review.Favorite === 1 ? 0 : 1)
                      }
                      style={{
                        backgroundColor: review.Favorite === 1 ? '#1861bf' : '#ececec',
                      }}
                    ></i>
                    <span>Save Favorite</span>
                  </div>
                  <div class="col-sm-4 d-flex align-items-center">
                    <i
                      class="sqLed sm mr-xsm"
                      onClick={() => this.saveFeatured(review.ID, review.CompanyID)}
                      style={{
                        backgroundColor: this.props.companyInfo.FeaturedReview
                          ? this.props.companyInfo.FeaturedReview.ID === review.ID
                            ? '#1861bf'
                            : '#ececec'
                          : '#ececec',
                      }}
                    ></i>
                    <span>Make Featured</span>
                  </div>
                </div>
              </div>
              <p class="mainText mb-0">{review.descriptions}</p>
            </div>
            <div class="">
              <div class="v2__EIReviewDetailsV2__fullWidth v2__EIReviewDetailsV2__clickable">
                <p class="strong mb-0 mt-xsm">Pros</p>
                <p class="mt-0 mb-xsm v2__EIReviewDetailsV2__bodyColor v2__EIReviewDetailsV2__lineHeightLarge v2__EIReviewDetailsV2__isCollapsed v2__EIReviewDetailsV2__singleLine ">
                  <span data-test="pros">{review.Pros}</span>
                </p>
              </div>
              <div class="v2__EIReviewDetailsV2__fullWidth v2__EIReviewDetailsV2__clickable">
                <p class="strong mb-0 mt-xsm">Cons</p>
                <p class="mt-0 mb-xsm v2__EIReviewDetailsV2__bodyColor v2__EIReviewDetailsV2__lineHeightLarge v2__EIReviewDetailsV2__isCollapsed v2__EIReviewDetailsV2__singleLine ">
                  <span data-test="cons">{review.Cons}</span>
                </p>
              </div>
              <div class="row mt-xsm mx-0"></div>
              {review.Response ? (
                <div class="v2__EIReviewDetailsV2__fullWidth v2__EIReviewDetailsV2__clickable">
                  <p class="strong mb-0 mt-xsm">You Replied</p>
                  <p class="mt-0 mb-xsm v2__EIReviewDetailsV2__bodyColor v2__EIReviewDetailsV2__lineHeightLarge v2__EIReviewDetailsV2__isCollapsed v2__EIReviewDetailsV2__singleLine ">
                    <span data-test="cons">{review.Response}</span>
                  </p>
                </div>
              ) : (
                <div class="justify-content-around justify-content-md-between mt-lg row">
                  <div class="d-flex">
                    <div class="mr-md">
                      <button
                        class="gd-ui-button  css-glrvaa"
                        onClick={() => this.showReply(review.ID)}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div>
                {this.state.popSeen ? (
                  <ReplyModal toggle={this.closeReplyModal} reviewID={review.ID} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    replyModalStore,
    reviewListStore,
    reviewFeatureStore,
    reviewFavoriteStore,
  } = state.ReviewReplyReducer;
  const { companyInfo } = state.CompaniesProfileReducer;
  return {
    replyModalStore: replyModalStore,
    reviewListStore: reviewListStore,
    reviewFeatureStore: reviewFeatureStore,
    reviewFavoriteStore: reviewFavoriteStore,
    companyInfo: companyInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    hideReplyModal: (payload) => {
      dispatch({
        type: hideReplyModal,
        payload,
      });
    },
    showReplyModal: (payload) => {
      dispatch({
        type: showReplyModal,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCard);
//export default RightBlock;
