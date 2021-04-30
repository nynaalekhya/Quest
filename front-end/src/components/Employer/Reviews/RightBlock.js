import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../../config.js';
import {
  hideReplyModal,
  showReplyModal,
  updateReviewFeature,
  updateReviewFavorite,
  updateCompanyProfile,
  updateReviewList,
} from '../../../constants/action-types';
import './RightBlock.css';
import ReplyModal from './ReplyModal';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import PaginationComponent from '../../Student/Common/PaginationComponent';
import ReviewCard from './ReviewCard';
import { Redirect } from 'react-router';

class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      reviewsList: [
        {
          CEOApproval: 0,
          CompanyID: 0,
          CompanyName: '',
          Cons: 'banana',
          DatePosted: '',
          Descriptions: '',
          EmployeeStatus: '',
          Favorite: 0,
          Headline: '',
          Helpful: 0,
          ID: 0,
          JobTitle: '',
          JobType: '',
          Pros: '',
          Rating: 0,
          Recommended: 0,
          Response: null,
          Status: '',
          StudentID: 0,
        },
      ],
      authFlag: false,
      cancelUpdate: false,
      feature: 0,
      Favorite: 0,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('userId')) {
      return <Redirect to="/Home" />;
    }
    this.props.fetchReviews();
  }

  onPageClick = (e) => {
    this.props.fetchReviews(e.selected);
  };

  handleFeatured(Id, CompanyId) {
    console.log('Id,', Id);
    this.setFeature(Id, CompanyId);
  }

  saveFeat(Id, CompanyId) {
    console.log('companyid', CompanyId);
    console.log('ID', Id);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post(serverUrl + 'company/reviewFeatured', {
        ID: Id,
        CompanyID: CompanyId,
        ID: Id,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('response', response);
          const index = this.props.reviewListStore.reviewList.findIndex((x) => x.ID === Id);
          if (index >= 0) {
            const FeaturedReview = { ...this.props.reviewListStore.reviewList[index] };
            const companyInfo = this.props.companyInfo;
            companyInfo.FeaturedReview = FeaturedReview;
            const payload = {
              companyInfo,
            };
            this.props.updateCompanyProfile(payload);
          }
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'No Reviews Found',
        });
      });
  }
  setFeature(Id, CompanyId) {
    if (this.state.Feature === 0) {
      console.log('inside if 0');
      this.setState(
        {
          Feature: 1,
        },
        function () {
          this.saveFeat(Id, CompanyId);
        }
      );
    } else {
      console.log('inside if 1');
      console.log('Id,,', Id);
      this.setState(
        {
          Feature: 0,
        },
        function () {
          this.saveFeat(Id, CompanyId);
        }
      );
    }
  }

  handleSaveFavorite(Id, Favorite) {
    this.saveFav(Id, Favorite);
  }

  saveFav(Id, Favorite) {
    console.log('Id1', Id);
    console.log('inside save', this.state.Favorite);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post(serverUrl + 'company/reviewFavorite', {
        ID: Id,
        Favorite,
      })
      .then((response) => {
        if (response.status == 200) {
          console.log('response', response);
          const index = this.props.reviewListStore.reviewList.findIndex((x) => x.ID === Id);
          console.log('index:', index);
          console.log('Favorite:', Favorite);
          if (index >= 0) {
            const reviewList = [...this.props.reviewListStore.reviewList];
            console.log('reviewList:', reviewList);

            const Review = { ...reviewList[index] };
            Review.Favorite = Favorite;
            console.log(' Review.Favorite:', Review);
            reviewList[index] = Review;
            const payload1 = {
              reviewList,
            };
            this.props.updateReviewList(payload1);
          }
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'No Reviews Found',
        });
      });
  }

  setFavorite(Id, Favorite) {
    console.log('Id', Id);
    if (this.state.Favorite === 0) {
      console.log('inside if 0');
      this.setState(
        {
          Favorite: 1,
        },
        function () {
          this.saveFav(Id, Favorite);
        }
      );
    } else {
      console.log('inside if 1');
      this.setState(
        {
          Favorite: 0,
        },
        function (Id) {
          this.saveFav(Id, Favorite);
        }
      );
    }
  }

  render() {
    return (
      <div className="col-12 col-md-8">
        <header class="row justify-content-between align-items-center mb-std">
          <h1 class="eiReviews__EIReviewsPageStyles__pageHeader col-12 col-md-auto m-0">
            {localStorage.getItem('companyName')} Reviews
          </h1>
        </header>
        {this.props.reviewListStore.reviewList &&
        this.props.reviewListStore.reviewList.length > 0 ? (
          <div class="ReviewsRef">
            <div id="ReviewsFeed" class="mt">
              <ol class=" empReviews emp-reviews-feed pl-0">
                {this.props.reviewListStore.reviewList.map((review) => (
                  <li class="empReview cf  " id="empReview_35973660" key={review.ID}>
                    <ReviewCard
                      handleSaveFavorite={(ID, Favorite) => this.saveFav(ID, Favorite)}
                      handleFeatured={() => this.handleFeatured(review.ID, review.CompanyID)}
                      review={review}
                    />
                  </li>
                ))}
              </ol>
            </div>
            <div className="tbl fill padHorz margVert" id="ResultsFooter">
              <div className="cell middle hideMob padVertSm" data-test="page-x-of-y">
                Page {this.props.reviewListStore.PageNo + 1} of{' '}
                {this.props.reviewListStore.PageCount}
              </div>
              <div className="module pt-xxsm">
                <PaginationComponent
                  PageCount={this.props.reviewListStore.PageCount}
                  PageNo={this.props.reviewListStore.PageNo}
                  onPageClick={(e) => {
                    this.onPageClick(e);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <p>No Reviews added yet!</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { replyModalStore, reviewListStore } = state.ReviewReplyReducer;
  const { companyInfo } = state.CompaniesProfileReducer;

  return {
    replyModalStore: replyModalStore,
    reviewListStore: reviewListStore,
    companyInfo,
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
    updateReviewFeature: (payload2) => {
      dispatch({
        type: updateReviewFeature,
        payload2,
      });
    },
    updateReviewFavorite: (payload3) => {
      dispatch({
        type: updateReviewFavorite,
        payload3,
      });
    },
    updateCompanyProfile: (payload3) => {
      dispatch({
        type: updateCompanyProfile,
        payload3,
      });
    },
    updateReviewList: (payload1) => {
      dispatch({
        type: updateReviewList,
        payload1,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RightBlock);
//export default RightBlock;
