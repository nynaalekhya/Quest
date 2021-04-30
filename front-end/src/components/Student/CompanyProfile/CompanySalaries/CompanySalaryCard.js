import React, { Component } from 'react';
import defaultplaceholder from '../CompanyNavbar/default-placeholder.png';
import { connect } from 'react-redux';

class CompanySalaryCard extends Component {
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

  getGraphPoint = (AverageSalary, MinSalary, MaxSalary) => {
    console.log('AverageSalary', AverageSalary);
    console.log('MinSalary', MinSalary);
    console.log('MaxSalary', MaxSalary);
    const minleft = -3;
    const length = 238;
    const minMaxdifference = MaxSalary - MinSalary;
    const avgDifference = AverageSalary - MinSalary;
    const ratingGraphPoint = (avgDifference / minMaxdifference) * length + minleft;
    return ratingGraphPoint;
  };
  render() {
    const salary = this.props.salary;
    const AverageSalary = this.abbrNum(Number(salary.average));
    const MinSalary = this.abbrNum(salary.min);
    const MaxSalary = this.abbrNum(salary.max);
    let ratingGraphPoint =
      MinSalary === MaxSalary
        ? 119
        : this.getGraphPoint(Number(salary.average), salary.min, salary.max);
    console.log('ratingGraphPoint', ratingGraphPoint);
    const styleGraph = { left: ratingGraphPoint };
    return (
      <div
        class="row no-gutters mx-0 py align-items-center css-1u4lhyp"
        data-test="salary-row"
        data-brandviews="BRAND:n=salaries-salariesByCompany:eid=9079"
      >
        <div style={{ maxWidth: '35%' }} class="col-md-6">
          <div class="d-flex">
            <div class="undefined mr-sm">
              <a href="/Salary/Google-Salaries-E9079.htm">
                <span class="common__SqLogoStyle__sqLogo common__SqLogoStyle__sm tighten">
                  <img
                    alt="Google"
                    class="lazy lazy-loaded sm"
                    src={
                      this.props.companyOverviewStore.companyOverview.ProfileImg
                        ? this.props.companyOverviewStore.companyOverview.ProfileImg
                        : defaultplaceholder
                    }
                  />
                </span>
              </a>
            </div>
            <div class="" data-test="job-info">
              <p style={{ marginTop: '13%' }}>
                <a href="/Salary/Google-Software-Engineer-San-Jose-Salaries-EJI_IE9079.0,6_KO7,24_IL.25,33_IM761.htm">
                  {salary._id}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div class="col-2 d-none d-md-flex flex-row justify-content-end">
          <strong>${AverageSalary}</strong>/yr
        </div>
        <div style={{ marginLeft: '18.333333%' }} class="col-3 offset-1 d-none d-md-block">
          <div class="common__RangeBarStyle__rangeBar undefined undefined ">
            <div class="d-none d-md-block">
              <div class="common__RangeBarStyle__meanIndicator" style={styleGraph}></div>
              <div class="common__RangeBarStyle__bar"></div>
            </div>
            <div class="common__RangeBarStyle__values common__flex__justifySpaceBetween common__flex__container ">
              <span>${MinSalary}</span>
              <span>${MaxSalary}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default CompanySalaryCard;
const mapStateToProps = (state) => {
  const { companyOverviewStore } = state.CompanyPageReducer;

  return {
    companyOverviewStore,
  };
};

export default connect(mapStateToProps, null)(CompanySalaryCard);
