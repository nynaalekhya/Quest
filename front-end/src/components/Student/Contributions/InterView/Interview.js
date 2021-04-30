import React, { Component } from 'react';
import '../Salary/Salaries.css';
import PaginationComponent from '../../Common/PaginationComponent';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updateStudentInterviewStore } from '../../../../constants/action-types';
import { connect } from 'react-redux';
import InterviewCard from './InterviewCard';

class Interview extends Component {
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
      .get(serverUrl + 'student/studentInterviewReview', {
        params: {
          PageNo,
          StudentID: localStorage.getItem('userId'),
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('studentInterviewReview', response.data);
          let payload = {
            InterViewList: response.data.results,
            PageNo,
            Totalcount: response.data.count,
            PageCount: Math.ceil(response.data.count / 10),

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateStudentInterviewStore(payload);
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

  delete = (event, InterviewReviewID) => {
    event.preventDefault();
    console.log('InterviewReviewID:', InterviewReviewID);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      InterviewReviewID,
    };
    axios.post(serverUrl + 'student/deleteInterviewReview', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.commonFetch(this.props.studentInterviewStore.PageNo);
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  render() {
    return (
      <div id="MainCol" class="col span-3-4 noPadLt padRt">
        <div class="module" id="MyAccountSalaries">
          <h1>Inter­views</h1>
          {/*<a
            href="/mz-survey/start_input.htm?showSurvey=INTERVIEWS&amp;c=PAGE_MYACCOUNT_TOP"
            id="AddInterview"
            class="gd-btn gd-btn-link gradient gd-btn-1 gd-btn-med ctaButtons margBot"
          >
            <span>Share an Interview</span>
            <i class="hlpr"></i>
          </a>*/}
          <p>
            {' '}
            The Glassdoor team reviews every piece of content submitted by users, so please be
            patient. Contributions with the 'Pending' status are being reviewed, and will appear on
            the site once they are approved.
          </p>
          <p>
            <strong>Please Note:</strong> Inter­views older than 30 days may not be edited.
          </p>
          <table class="std fill tbl">
            <thead>
              <tr>
                <th class="summary wide11">Details</th>
                <th class="submitted center">Submitted</th>
                <th class="itemStatus hideMob center">
                  {' '}
                  Review Status [
                  <span
                    class="tt link"
                    title="<table id='StatusHelp'> <caption>About Interview Status</caption> <tr> <th>Approved</th> <td> The interview is currently available on the site.</td> </tr> <tr> <th>Archived</th> <td> The interview is no longer available on the site in an effort to reduce out-of-date or duplicate data.</td> </tr> <tr> <th>Pending</th> <td> The interview is currently awaiting approval by the Glassdoor team.</td> </tr> <tr> <th>Removed</th> <td> The interview is not available on the site due to a violation of our <a href='/about/guidelines.htm' target='guidelines'>Community Guidelines</a> or due to a failure to meet our minimum requirements for review detail.</td> </tr> <tr> <th>Verification Needed</th> <td> The interview needs additional verification from you. To do so, please click 'Verification Needed' and you will be taken to a screen with additional directions.</td> </tr> </table>"
                  >
                    ?
                  </span>
                  ]{' '}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.studentInterviewStore.InterViewList.length === 0 ? (
                <tr>
                  <td colspan="4">
                    <p> You have not yet submitted any Interview review. </p>
                  </td>
                </tr>
              ) : (
                ''
              )}
              {this.props.studentInterviewStore.InterViewList.map((interview) => (
                <InterviewCard
                  delete={(event) => this.delete(event, interview.InterviewReviewID)}
                  interview={interview}
                  openCompanyProfile={(event) => this.props.openCompanyProfile(event)}
                />
              ))}
            </tbody>
          </table>
          {this.props.studentInterviewStore.InterViewList.length > 0 ? (
            <PaginationComponent
              PageCount={this.props.studentInterviewStore.PageCount}
              PageNo={this.props.studentInterviewStore.PageNo}
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

// export default Interview;

const mapStateToProps = (state) => {
  const { studentInterviewStore } = state.StudentContributionsReducer;
  const { studentInfoStore } = state.StudentCompleteInfoReducer;

  return {
    studentInterviewStore,
    studentInfoStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudentInterviewStore: (payload) => {
      dispatch({
        type: updateStudentInterviewStore,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Interview);
