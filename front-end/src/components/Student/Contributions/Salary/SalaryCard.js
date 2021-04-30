import React, { Component } from 'react';
import moment from 'moment';
import { switchTab } from '../../../../constants/action-types';
import { connect } from 'react-redux';

class SalaryCard extends Component {
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
    localStorage.setItem('companyID', this.props.salary.CompanyID);
    this.props.switchTab(payload);
    this.props.openCompanyProfile(event);
  };

  abbrNum = (number, decPlaces = 2) => {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);
    // Enumerate number abbreviations
    var abbrev = ['k', 'm', 'b', 't'];
    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);
      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round((number * decPlaces) / size) / decPlaces;

        // Handle special case where we round up to the next abbreviation
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }

        // Add the letter for the abbreviation
        number += abbrev[i];

        // We are done... stop
        break;
      }
    }

    return number;
  };

  render() {
    const salary = this.props.salary;
    const salaryValue = this.abbrNum(salary.BaseSalary + salary.Bonuses);
    return (
      <tr>
        <td class="summary">
          <a href="#" onClick={(event) => this.openCompanyTab(event, 'CompanySalaries')}>
            {' '}
            <p class="job">
              <strong>{salary.JobTitle}</strong> at {salary.CompanyName}
              <br />
            </p>
          </a>
          <p class="desc">
            {' '}
            {salaryValue} $<span> yearly</span>
          </p>
        </td>
        <td class="submitted center nowrap middle"> {moment(salary.DatePosted).format('ll')}</td>
        {/*<td class="actions center noWrap middle">
         
          <a href="" onClick={(event) => this.props.delete(event)}>
            Delete
          </a>
    </td>*/}
      </tr>
    );
  }
}

// export default SalaryCard;
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

export default connect(null, mapDispatchToProps)(SalaryCard);
