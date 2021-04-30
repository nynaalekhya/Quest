import React, { Component } from 'react';
import moment from 'moment';
import defaultplaceholder from '../CompanyNavbar/default-placeholder.png';
import { connect } from 'react-redux';

class CompanyInterviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const interview = this.props.interview;
    let alreadyHelpful = false;
    if (
      this.props.studentInfoStore.studentProfile.HelpfullInterviewReviews.includes(
        interview.InterviewReviewID
      )
    ) {
      alreadyHelpful = true;
    }
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
            <span class="helpfulCount subtle">
              {' '}
              Helpful ({interview.Helpful ? interview.Helpful : 0})
            </span>{' '}
            &nbsp;{' '}
          </p>
        </div>
        <div class="tbl fill reviewHdr">
          <div class="row">
            <div class="cell sqLogoCell showDesk">
              <span class="sqLogo tighten smSqLogo logoOverlay">
                <img
                  src={
                    this.props.companyOverviewStore.companyOverview.ProfileImg
                      ? this.props.companyOverviewStore.companyOverview.ProfileImg
                      : defaultplaceholder
                  }
                  class="lazy lazy-loaded"
                  data-retina-ok="true"
                  alt=" Logo"
                  title=""
                  style={{ opacity: '1' }}
                />
              </span>
            </div>
            <div class="cell">
              <h2 class="summary strong noMargTop tightTop margBotXs">
                <a href="/Interview/Amazon-Interview-RVW24701674.htm">
                  <span class="reviewer">{interview.JobTitle}</span> Interview
                </a>
              </h2>
              <div class="tbl reviewMeta">
                <div class="cell">
                  <div class="author minor">
                    {' '}
                    Anonymous Employee in
                    <span class="padLtSm">
                      <i class="flag us"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tbl fill margTopMd">
          <div class="row">
            <div class="cell sqLogoCell showDesk"></div>
            <div class="cell reviewBodyCell">
              <div class="interviewOutcomes">
                <div class="flex-grid">
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
                            style={{ display: 'block' }}
                          >
                            <div class="responseText padTopSm tbl fill">
                              <p class="cell noMargVert padVert borderBot">{interview.Answers}</p>
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
            <div class="floatRt helpfulBtn margRtMd tightVert">
              <span
                class="block voteHelpful"
                data-member="true"
                data-type="INTERVIEW_REVIEW"
                data-id="31683611"
                data-count="189"
              >
                <button
                  onClick={this.props.helpfulClicked}
                  type="button"
                  class={`tight gd-btn gd-btn-button gd-btn-2 gd-btn-sm gradient ${
                    alreadyHelpful ? 'gd-btn-3' : ''
                  }`}
                >
                  <span>
                    Helpful
                    <span class="count">
                      {' '}
                      (<span>{interview.Helpful ? interview.Helpful : 0}</span>)
                    </span>
                  </span>
                  <i class="hlpr"></i>
                </button>
              </span>
            </div>
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

export default connect(mapStateToProps, null)(CompanyInterviewCard);
