import React, { Component } from 'react';
import './CompanySearchResults.css';
import defaultplaceholder from '../CompanyProfile/CompanyNavbar/default-placeholder.png';
import { switchTab } from '../../../constants/action-types';
import { connect } from 'react-redux';

class CompanyCard extends Component {
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

  // update tab values according to admin page
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
    const company = this.props.company;
    let AvgRating = 0;
    if (
      company.GeneralReviewCount &&
      company.GeneralReviewCount > 0 &&
      company.TotalGeneralReviewRating &&
      company.TotalGeneralReviewRating > 0
    ) {
      AvgRating = (company.TotalGeneralReviewRating / company.GeneralReviewCount).toFixed(1);
    }
    const defaultImage =
      'https://s3-media0.fl.yelpcdn.com/assets/public/user_60_square.yji-514f6997a3184af475d5adc800b6d0b1.png';

    return (
      <div
        id="companycard"
        className="row justify-content-between"
        style={{ display: 'flex !important' }}
      >
        <div className="col-lg-7">
          <div id="companycard" className="row justify-content-start">
            <div className="col-3 logo-and-ratings-wrap">
              <a data-ajax="true" className="sqLogoLink">
                <span className="sqLogo tighten medSqLogo logoOverlay">
                  <img
                    src={company.ProfileImg ? company.ProfileImg : defaultplaceholder}
                    className=""
                    alt=" Logo"
                    title=""
                  />
                </span>
              </a>
            </div>
            <div className="col-9 pr-0">
              <h2>
                <a onClick={(event) => this.props.openCompanyProfile(event)} href="#">
                  {company.CompanyName}
                </a>
                <div className="ratingsSummary cf">
                  <span>
                    <span className="bigRating strong margRtSm h2">{AvgRating}</span>
                    <span className="gdStars gdRatings sm ">
                      <i>
                        <i></i>
                        <i className="star">
                          <span>Star</span>
                        </i>
                      </i>
                    </span>
                  </span>
                </div>
              </h2>
              <div className="web-and-address-wrap">
                <p className="hqInfo adr m-0">
                  <span className="value">
                    {company.City}, {company.State}
                  </span>
                </p>
                <p className="webInfo mb-0 mt-xxsm">
                  <span className="url">
                    <a target="blank" href={`https://${company.Website}`}>
                      {company.Website}
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 ei-contributions-count-wrap mt-std">
          <div id="companycard" className="row justify-content-between">
            <div className="ei-contribution-wrap col-4 pl-lg-0 pr-0">
              <a
                onClick={(event) => this.openCompanyTab(event, 'GeneralReview')}
                className="eiCell cell reviews d-inline-block py-sm"
                href="#"
                // href="/Reviews/Amazon-San-Jose-Reviews-EI_IE6036.0,6_IL.7,15_IM761.htm"
                data-label=""
              >
                <span className="num h2">
                  {company.GeneralReviewCount ? this.abbrNum(company.GeneralReviewCount) : 0}
                </span>
                <span className="subtle"> Reviews</span>
              </a>
            </div>
            <div className="ei-contribution-wrap col-4 p-0">
              <a
                onClick={(event) => this.openCompanyTab(event, 'CompanySalaries')}
                href="#"
                className="eiCell cell salaries d-inline-block py-sm"
                // href="/Salary/Amazon-San-Jose-Salaries-EI_IE6036.0,6_IL.7,15_IM761.htm"
                data-label=""
              >
                <span className="num h2">
                  {' '}
                  {company.SalaryReviewCount ? this.abbrNum(company.SalaryReviewCount) : 0}
                </span>
                <span className="subtle"> Salaries</span>
              </a>
            </div>
            <div className="ei-contribution-wrap col-4 pl-0">
              <a
                onClick={(event) => this.openCompanyTab(event, 'CompanyInterviews')}
                href="#"
                className="eiCell cell interviews d-inline-block py-sm"
                // href="/Interview/Amazon-San-Jose-Interview-Questions-EI_IE6036.0,6_IL.7,15_IM761.htm"
                data-label=""
              >
                <span className="num h2">
                  {' '}
                  {company.InterviewReviewCount ? this.abbrNum(company.InterviewReviewCount) : 0}
                </span>
                <span className="subtle"> Inter­views</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default CompanyCard;
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

export default connect(null, mapDispatchToProps)(CompanyCard);
