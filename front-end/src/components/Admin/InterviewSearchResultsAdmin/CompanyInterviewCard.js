import React, { Component } from 'react';
import moment from 'moment';
// import defaultplaceholder from '../CompanyNavbar/default-placeholder.png';
import { connect } from 'react-redux';
import { switchTab } from '../../../constants/action-types';

class CompanyInterviewCard extends Component {
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
    const interview = this.props.interview;

    return (
      <li class=" empReview cf " id="InterviewReview_24701674">
        <div class="cf">
          <div class="floatLt">
            <time class="date subtle small" datetime="2019-02-14">
              {' '}
              {moment(interview.DatePosted).format('ll')}
            </time>
          </div>
          <p class="helpfulReviews small tightVert floatRt">
            <span class="helpfulCount subtle"> </span> &nbsp;{' '}
          </p>
        </div>
        <div class="tbl fill reviewHdr">
          <div class="row">
            <div class="cell">
              <h2 class="summary strong noMargTop tightTop margBotXs">
                <a onClick={(event) => this.openCompanyTab(event, 'CompanyInterviews')} href="#">
                  <span class="reviewer">{interview.JobTitle}</span> Interview -{' '}
                  {interview.CompanyName}
                </a>
              </h2>
              <div class="tbl reviewMeta">
                <div class="cell">
                  <div class="author minor"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tbl fill margTopMd">
          <div class="row">
            <div style={{ minWidth: '100%' }} class="cell reviewBodyCell">
              <div class="interviewOutcomes">
                <div style={{ display: 'flex' }} class="flex-grid">
                  <div class="tightLt col span-1-3">
                    <div class="middle">
                      <div class="cell">
                        <i
                          class={`sqLed middle sm ${
                            interview.OfferStatus === 'Yes, and I accepted' ? 'green' : 'red'
                          } margRtXs `}
                        ></i>
                      </div>
                      {interview.OfferStatus === 'Yes, and I accepted' ? (
                        <div class="cell">
                          <span class="middle">Accepted Offer</span>
                        </div>
                      ) : interview.OfferStatus === 'Yes, but I declined' ? (
                        <div class="cell">
                          <span class="middle">Declined Offer</span>
                        </div>
                      ) : (
                        <div class="cell">
                          <span class="middle">No Offer</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="tightLt col span-1-3">
                    <div class="middle">
                      <div class="cell">
                        <i
                          class={`sqLed middle sm  ${
                            interview.OverallExperience === 'Positive'
                              ? 'green'
                              : interview.OverallExperience === 'Negative'
                              ? 'red'
                              : 'yellow'
                          } margRtXs `}
                        ></i>
                      </div>
                      {interview.OverallExperience === 'Positive' ? (
                        <div class="cell">
                          <span class="middle">Positive Experience</span>
                        </div>
                      ) : interview.OverallExperience === 'Negative' ? (
                        <div class="cell">
                          <span class="middle">Negative Experience</span>
                        </div>
                      ) : (
                        <div class="cell">
                          <span class="middle">Neutral Experience</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="tightLt col span-1-3">
                    <div class="middle">
                      <div class="cell">
                        <i
                          class={`sqLed middle sm ${
                            interview.Difficulty < 3
                              ? 'green'
                              : interview.Difficulty > 3
                              ? 'red'
                              : 'yellow'
                          } margRtXs `}
                        ></i>
                      </div>

                      {interview.Difficulty < 3 ? (
                        <div class="cell">
                          <span class="middle">Easy Interview</span>
                        </div>
                      ) : interview.Difficulty > 3 ? (
                        <div class="cell">
                          <span class="middle">Difficult Interview</span>
                        </div>
                      ) : (
                        <div class="cell">
                          <span class="middle">Average Interview</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="description ">
                <div
                  class="interviewReviewDetails truncateData"
                  data-animate-after-less="true"
                  data-click-anywhere="true"
                  data-less-str="Show Less"
                  data-more-str="Show More"
                  data-truncate-toggle="true"
                  data-truncate-words="70"
                >
                  <div class="continueReadingWrapper gdGrid contentIsCollapsed">
                    <p class="strong margTopMd tightBot">Interview</p>
                    <p class="interviewDetails continueReading interviewContent mb-xsm ">
                      {interview.Description}
                    </p>
                  </div>
                  <p class="strong margTopMd tightBot">Interview Questions</p>
                  <div class="interviewQuestions">
                    <ul class="undecorated">
                      <li>
                        <span
                          class="interviewQuestion noPadVert truncateThis wrapToggleStr "
                          data-truncate-words="70"
                        >
                          {' '}
                          {interview.InterviewQuestions}
                          <p class="strong margTopMd tightBot">
                            Answer
                            <i class="caret-blue margLtSm rotate180"></i>
                          </p>
                          <div
                            class="userResponses margTopLg borderTop"
                            style={{
                              display: 'block',
                              borderTop: '0px',
                              marginTop: '12px !important',
                            }}
                          >
                            <div class="responseText padTopSm tbl fill">
                              <p
                                style={{ borderBottom: '0px' }}
                                class="cell noMargVert padVert borderBot"
                              >
                                {interview.Answers}
                              </p>
                            </div>
                          </div>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="reviewComments">
          <div class="reviewFooter cf">
            {interview.Status !== 'Not Approved' ? (
              <strong style={{ float: 'right' }}>{interview.Status}</strong>
            ) : (
              ''
            )}
            {interview.Status === 'Not Approved' ? (
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
            {interview.Status === 'Not Approved' ? (
              <div style={{ paddingRight: '2%' }} class="floatRt helpfulBtn margRtMd tightVert">
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
      </li>
    );
  }
}

// export default CompanyInterviewCard;
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInterviewCard);
