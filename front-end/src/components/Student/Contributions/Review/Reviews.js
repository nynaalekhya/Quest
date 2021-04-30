import React, { Component } from 'react';
import PaginationComponent from '../../Common/PaginationComponent';
import '../Salary/Salaries.css';
import RevieCard from './RevieCard';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updateStudentReviewsStore } from '../../../../constants/action-types';
import { connect } from 'react-redux';

class Reviews extends Component {
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
      .get(serverUrl + 'student/studentCompanyReview', {
        params: {
          PageNo,
          StudentID: localStorage.getItem('userId'),
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('studentCompanyReview', response.data);
          let payload = {
            ReviewList: response.data[2],
            PageNo,
            Totalcount: response.data[0].count,
            PageCount: Math.ceil(response.data[0].count / 10),

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateStudentReviewsStore(payload);
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

  delete = (event, GeneralReviewID) => {
    event.preventDefault();
    console.log('GeneralReviewID:', GeneralReviewID);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      GeneralReviewID,
    };
    axios.post(serverUrl + 'student/deleteGeneralReview', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Review Submitted');
          this.commonFetch(this.props.studentReviewsStore.PageNo);
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
        <div class="module">
          <h1>Reviews</h1>
          {/*<a
            href="/mz-survey/start_input.htm?showSurvey=REVIEWS&amp;c=PAGE_MYACCOUNT_TOP"
            id="AddReviews"
            class="gd-btn gd-btn-link gradient gd-btn-1 gd-btn-med ctaButtons margBot"
          >
            <span>Write a Review</span>
            <i class="hlpr"></i>
          </a>*/}
          <p>
            {' '}
            The Glassdoor team reviews every piece of content submitted by users, so please be
            patient. Contributions with the 'Pending' status are being reviewed, and will appear on
            the site once they are approved.
          </p>
          <table class="std fill">
            <thead>
              <tr>
                <th class="summary wide5">Details</th>
                <th class="empStatus hyphenate wrap hideMob center">Employee Status</th>
                <th class="submitted hideMob center">Submitted</th>
                <th class="itemStatus hyphenate hideMob center">
                  {' '}
                  Review Status [
                  <span
                    class="tt link"
                    title="<table id='StatusHelp'> <caption>About Review Status</caption> <tr> <th>Approved</th> <td> The review is currently available on the site.</td> </tr> <tr> <th>Archived</th> <td> The review is no longer available on the site in an effort to reduce out-of-date or duplicate data.</td> </tr> <tr> <th>Pending</th> <td> The review or employer is currently awaiting approval by the Glassdoor team.</td> </tr> <tr> <th>Removed</th> <td> The review is not available on the site due to a violation of our <a href='/about/guidelines.htm' target='guidelines'>Community Guidelines</a> or due to a failure to meet our minimum requirements for review detail.</td> </tr> <tr> <th>Verification Needed</th> <td> The review needs additional verification from you. To do so, please click 'Verification Needed' and you will be taken to a screen with additional directions.</td> </tr> </table>"
                  >
                    ?
                  </span>
                  ]{' '}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.studentReviewsStore.ReviewList.length === 0 ? (
                <tr>
                  <td colspan="4">
                    <p> You have not yet submitted any Review. </p>
                  </td>
                </tr>
              ) : (
                ''
              )}
              {this.props.studentReviewsStore.ReviewList.map((review) => (
                <RevieCard
                  delete={(event) => this.delete(event, review.ID)}
                  review={review}
                  openCompanyProfile={(event) => this.props.openCompanyProfile(event)}
                />
              ))}
            </tbody>
          </table>
          {this.props.studentReviewsStore.ReviewList.length > 0 ? (
            <PaginationComponent
              PageCount={this.props.studentReviewsStore.PageCount}
              PageNo={this.props.studentReviewsStore.PageNo}
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

// export default Reviews;
const mapStateToProps = (state) => {
  const { studentReviewsStore } = state.StudentContributionsReducer;
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    studentReviewsStore,
    studentInfoStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudentReviewsStore: (payload) => {
      dispatch({
        type: updateStudentReviewsStore,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
