import React, { Component } from 'react';
import moment from 'moment';
// import defaultplaceholder from '../CompanyNavbar/default-placeholder.png';
import { connect } from 'react-redux';
import { switchTab } from '../../../constants/action-types';

class SalaryReviewCard extends Component {
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
    const salary = this.props.salary;

    return (
      <li class=" empReview cf " id="InterviewReview_24701674">
        <div class="cf">
          <div class="floatLt">
            <time class="date subtle small" datetime="2019-02-14">
              {' '}
              {moment(salary.DatePosted).format('ll')}
            </time>
          </div>
        </div>
        <div class="tbl fill reviewHdr">
          <div class="row">
            <div class="cell">
              <h2 class="summary strong noMargTop tightTop margBotXs">
                <a onClick={(event) => this.openCompanyTab(event, 'CompanySalaries')} href="#">
                  <span class="reviewer">{salary.JobTitle}</span> - {salary.CompanyName}
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
            <div class="cell sqLogoCell showDesk"></div>
            <div style={{ minWidth: '100%' }} class="cell reviewBodyCell">
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
                    <p class="strong margTopMd tightBot">Base Salary: {salary.BaseSalary}</p>
                    {/* <p class="interviewDetails continueReading interviewContent mb-xsm ">
                      {salary.BaseSalary}
    </p>*/}
                  </div>
                  <div class="continueReadingWrapper gdGrid contentIsCollapsed">
                    <p class="strong margTopMd tightBot">
                      Bonus: {salary.Bonuses ? salary.Bonuses : '-'}
                    </p>
                    {/*<p class="interviewDetails continueReading interviewContent mb-xsm ">
                      {salary.Bonuses}
    </p>*/}
                  </div>
                  <div class="continueReadingWrapper gdGrid contentIsCollapsed">
                    <p class="strong margTopMd tightBot">Year of Experience: {salary.Years}</p>{' '}
                    {/*<span>{salary.Years}</span>
                    <p class="interviewDetails continueReading interviewContent mb-xsm ">
                      {salary.Years}
    </p>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="reviewComments">
          <div class="reviewFooter cf">
            {salary.Status !== 'Not Approved' ? (
              <strong style={{ float: 'right' }}>{salary.Status}</strong>
            ) : (
              ''
            )}
            {salary.Status === 'Not Approved' ? (
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
            {salary.Status === 'Not Approved' ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(SalaryReviewCard);
