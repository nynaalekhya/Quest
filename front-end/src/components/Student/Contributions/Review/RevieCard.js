import React, { Component } from 'react';
import moment from 'moment';
import { switchTab } from '../../../../constants/action-types';
import { connect } from 'react-redux';

class RevieCard extends Component {
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
    localStorage.setItem('companyID', this.props.review.CompanyID);
    this.props.switchTab(payload);
    this.props.openCompanyProfile(event);
  };

  render() {
    const review = this.props.review;
    const stars = [];
    for (let i = 1; i <= review.Rating; i++) {
      stars.push(i);
    }
    console.log('stars', stars);
    return (
      <tr>
        <td class="summary">
          <p>
            <a onClick={(event) => this.openCompanyTab(event, 'GeneralReview')} href="#">
              <span class="strong">{review.JobTitle}</span> at {review.CompanyName}
            </a>
          </p>
          <p class="rating">
            <span class="gdStars gdRatings med ">
              {stars.map((star) => (
                <i>
                  <i></i>
                  <i class="star">
                    <span>Star</span>
                  </i>
                </i>
              ))}
            </span>
          </p>
          <p class="strong"> {review.Description}</p>
          <br />
          Pros: <p class="strong"> {review.Pros}</p>
          <br />
          Cons: <p class="strong"> {review.Cons}</p>
        </td>
        <td class="empStatus noWrap hideMob center"> {review.EmployeeStatus}</td>
        <td class="submitted noWrap hideMob center">{moment(review.DatePosted).format('ll')}</td>
        <td class="itemStatus noWrap hideMob center"> {review.Status}</td>
        {/*<td class="actions noWrap center">
       
          <a href="#" onClick={(event) => this.props.delete(event)}>
            Delete
          </a>
              </td>*/}
      </tr>
    );
  }
}

// export default RevieCard;
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

export default connect(null, mapDispatchToProps)(RevieCard);
