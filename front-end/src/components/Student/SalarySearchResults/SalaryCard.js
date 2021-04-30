import React, { Component } from 'react';
import defaultplaceholder from '../CompanyProfile/CompanyNavbar/default-placeholder.png';
import { connect } from 'react-redux';
import { switchTab } from '../../../constants/action-types';

class SalaryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    const reviewCount = this.abbrNum(Number(salary.SalaryReviewCount));
    return (
      <div
        id="salaryCardFlex"
        class="row mx-0 py-std css-l8rlna e8dz1vs0"
        data-test="employer-salary-tile"
      >
        <div class="col-auto pl-0">
          <a class="css-1hwaofw e1jqxwq80">
            <img
              src={salary.ProfileImg ? salary.ProfileImg : defaultplaceholder}
              // src={salary.ProfileImg}
              alt="Amazon"
            />
          </a>
        </div>
        <div class="col d-flex justify-content-between pl-std">
          <div>
            <a onClick={(event) => this.openCompanyTab(event, 'CompanySalaries')} href="#">
              <h3 class="link m-0 css-1v81xpy e8dz1vs2">{salary.CompanyName}</h3>
            </a>
            <div class="css-1uyte9r e8dz1vs1">{salary.Website}</div>
          </div>
          <a
            onClick={(event) => this.openCompanyTab(event, 'CompanySalaries')}
            href="#"
            class="d-flex flex-column align-items-center"
          >
            <h3 class="m-0 css-1v81xpy e8dz1vs2">{reviewCount}</h3>
            <span>Salaries</span>
          </a>
        </div>
      </div>
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
