import React, { Component } from 'react';
import './CompanyNavbar.css';
import { switchTab } from '../../../../constants/action-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultplaceholder from './default-placeholder.png';

class CompanyNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  switchTab = (event, tab) => {
    event.preventDefault();
    const payload = {
      selectedTab: tab,
    };
    this.props.switchTab(payload);
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
    const JobCount = this.abbrNum(Number(this.props.companyOverviewStore.companyOverview.JobCount));
    const GeneralReviewCount = this.abbrNum(
      Number(this.props.companyOverviewStore.companyOverview.GeneralReviewCount)
    );
    const SalaryReviewCount = this.abbrNum(
      Number(this.props.companyOverviewStore.companyOverview.SalaryReviewCount)
    );
    const InterviewReviewCount = this.abbrNum(
      Number(this.props.companyOverviewStore.companyOverview.InterviewReviewCount)
    );
    const PhotoCount = this.abbrNum(
      Number(this.props.companyOverviewStore.companyOverview.PhotoCount)
    );

    const defaultCoverPic =
      'https://s3-media0.fl.yelpcdn.com/assets/public/defaultBusinessHeaderImage.yji-a94634351a246719545b17b9bddc388f.png';

    return (
      <article id="WideCol">
        <div
          id="EIHdrModule"
          class="snug module noblur eep sticky"
          style={{ width: '992px', top: '0px' }}
        >
          <div
            id="EmpHeroAndEmpInfo"
            class="gdGrid"
            data-brandviews="MODULE:n=hub-profileImage:eid=6036"
          >
            <div id="HeroLbFrame-6036" class="hidden">
              <div class="lbSlideFrame">
                <div class="titleBar">
                  <span class="viewAll">
                    <a href="#">
                      <i></i>
                      <span>View All</span>
                    </a>
                  </span>
                  <span class="counter">
                    <span class="current">num</span> of <span class="total">num</span>
                  </span>
                  <span class="close">
                    <button type="button" title="Close (Esc)">
                      <span class="offScreen">Close (Esc)</span>
                    </button>
                  </span>
                </div>
                <div class="slides"></div>
              </div>
            </div>
            <div
              id="EmpHero"
              class=" coverPic noVideo"
              data-employer-id="6036"
              data-photo-frame-id="HeroLbFrame-6036"
            >
              <img
                class="lazy hero lazy-loaded"
                alt="Cover Image"
                src={
                  this.props.companyOverviewStore.companyOverview.CoverPhoto
                    ? this.props.companyOverviewStore.companyOverview.CoverPhoto
                    : defaultCoverPic
                }
              />
              <div class="overlay">
                <a
                  onClick={(event) => this.switchTab(event, 'CompanyPhotos')}
                  href="#"
                  class="noMargVert"
                  id="EmpHeroPhotoLink"
                >
                  <i class="camera cell middle">
                    <span>See All Photos</span>
                  </i>
                  <span class="padLtSm cell small middle">See All Photos</span>
                </a>
              </div>
            </div>
            <div class="empInfo tbl hideHH ">
              <div class="logo cell">
                <a data-ajax="true" class="sqLogoLink">
                  <span class="sqLogo tighten lgSqLogo logoOverlay">
                    <img
                      src={
                        this.props.companyOverviewStore.companyOverview.ProfileImg
                          ? this.props.companyOverviewStore.companyOverview.ProfileImg
                          : defaultplaceholder
                      }
                      class=""
                      alt=" Logo"
                      title=""
                    />
                  </span>
                </a>
              </div>
              <div style={{ paddingLeft: '100px' }} class="header cell info">
                <h1 class=" strong tightAll" title="" data-company="Amazon">
                  <span id="DivisionsDropdownComponent" class="d-inline-flex align-items-center">
                    {' '}
                    {this.props.companyOverviewStore.companyOverview.CompanyName}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div id="StickyNavWrapper" class="stickyNavWrapper ">
            <div id="SmarterNavContainer" class="initialStick">
              <div id="SmarterBannerContainer"></div>
              <div id="EmpLinksWrapper" class="empLinksWrapper  sticky">
                <div class="empLinks tbl ">
                  <div id="EIProductHeaders" class="tbl eiProductCells">
                    <div class="row ">
                      <span
                        onClick={(event) => this.switchTab(event, 'Overview')}
                        class={
                          this.props.companyNavbarStore.selectedTab === 'Overview'
                            ? 'eiCell cell overviews switchLogo active'
                            : 'eiCell cell overviews switchLogo '
                        }
                        // class="eiCell cell overviews switchLogo active"
                        data-selector="orgStructureOverviewDropdown"
                      >
                        <div id="HierarchiesDropdown"></div>
                        <span class="num h2">
                          <i class="icon-bullseye-select">
                            <span>Overview</span>
                          </i>
                        </span>
                        <span class="subtle"> Overview</span>
                      </span>{' '}
                      <div class="vline cell">
                        <i></i>
                      </div>
                      <a
                        onClick={(event) => this.switchTab(event, 'GeneralReview')}
                        class={
                          this.props.companyNavbarStore.selectedTab === 'GeneralReview'
                            ? 'eiCell cell reviews active'
                            : 'eiCell cell reviews '
                        }
                        href="#"
                        data-label="Reviews"
                      >
                        <span class="num h2"> {/*GeneralReviewCount*/}</span>
                        <span class="subtle"> Reviews</span>
                      </a>
                      <div class="vline cell">
                        <i></i>
                      </div>
                      <a
                        onClick={(event) => this.switchTab(event, 'CompanyJobs')}
                        class={
                          this.props.companyNavbarStore.selectedTab === 'CompanyJobs'
                            ? 'eiCell cell jobs active'
                            : 'eiCell cell jobs '
                        }
                        // class="eiCell cell jobs "
                        href="#"
                        data-label="Jobs"
                      >
                        <span class="num h2"> {JobCount}</span>
                        <span class="subtle"> Jobs</span>
                      </a>
                      <div class="vline cell">
                        <i></i>
                      </div>
                      <a
                        onClick={(event) => this.switchTab(event, 'CompanySalaries')}
                        class={
                          this.props.companyNavbarStore.selectedTab === 'CompanySalaries'
                            ? 'eiCell cell salaries active'
                            : 'eiCell cell salaries '
                        }
                        // class="eiCell cell salaries "
                        href="#"
                        data-label="Salaries"
                      >
                        <span class="num h2"> {/*SalaryReviewCount*/}</span>
                        <span class="subtle"> Salaries</span>
                      </a>
                      <div class="vline cell">
                        <i></i>
                      </div>
                      <a
                        onClick={(event) => this.switchTab(event, 'CompanyInterviews')}
                        class={
                          this.props.companyNavbarStore.selectedTab === 'CompanyInterviews'
                            ? 'eiCell cell interviews active'
                            : 'eiCell cell interviews '
                        }
                        // class="eiCell cell interviews "
                        href="#"
                        data-label="Inter­views"
                      >
                        <span class="num h2"> {/*InterviewReviewCount*/}</span>
                        <span class="subtle"> Inter­views</span>
                      </a>
                      <div class="vline cell">
                        <i></i>
                      </div>
                      <a
                        onClick={(event) => this.switchTab(event, 'CompanyPhotos')}
                        class={
                          this.props.companyNavbarStore.selectedTab === 'CompanyPhotos'
                            ? 'eiCell cell photos active'
                            : 'eiCell cell photos '
                        }
                        // class="eiCell cell photos "
                        href="#"
                        data-label="Photos"
                      >
                        <span class="num h2"> {/*PhotoCount*/}</span>
                        <span class="subtle"> Photos</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

// export default CompanyNavbar;

const mapStateToProps = (state) => {
  const { companyNavbarStore } = state.CompanyResultPageReducer;
  const { companyOverviewStore } = state.CompanyPageReducer;

  return {
    companyNavbarStore,
    companyOverviewStore,
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyNavbar);
