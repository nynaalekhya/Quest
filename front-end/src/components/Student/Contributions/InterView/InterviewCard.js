import React, { Component } from 'react';
import moment from 'moment';
import { switchTab } from '../../../../constants/action-types';
import { connect } from 'react-redux';

class InterviewCard extends Component {
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
    localStorage.setItem('companyID', this.props.interview.CompanyID);
    this.props.switchTab(payload);
    this.props.openCompanyProfile(event);
  };

  render() {
    const interview = this.props.interview;
    return (
      <tr>
        <td class="summary">
          <a href="#" onClick={(event) => this.openCompanyTab(event, 'CompanyInterviews')}>
            <p>
              <strong>{interview.JobTitle}</strong> at <strong>{interview.CompanyName}</strong>
            </p>
          </a>
          <p>Question: {interview.InterviewQuestions}</p>
          <br />
          <p>Answer: {interview.Answers}</p>
        </td>
        <td class="submitted center"> {moment(interview.DatePosted).format('ll')}</td>
        <td class="itemStatus hideMob center"> {interview.Status}</td>
        {/*<td class="actions center noWrap">
       
          <a href="#" onClick={(event) => this.props.delete(event)}>
            Delete
          </a>
    </td>*/}
      </tr>
    );
  }
}

// export default InterviewCard;
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

export default connect(null, mapDispatchToProps)(InterviewCard);
