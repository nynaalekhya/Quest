import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
// import defaultplaceholder from '../CompanyNavbar/default-placeholder.png';
import { switchTab } from '../../../constants/action-types';

class AllPhotos extends Component {
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
    const photo = this.props.photo;

    return (
      <li class="empReview cf  " id="empReview_9642081">
        <div class="gdReview">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <time
                class="date subtle small"
                datetime="Sat Feb 20 2016 18:05:10 GMT-0800 (Pacific Standard Time)"
              >
                {moment(photo.DateUploaded).format('ll')}
              </time>
            </div>
          </div>
          <div id="companyReview" class="row mt">
            <div class="col-sm-1">
              <a data-ajax="true" className="sqLogoLink">
                <span className="sqLogo tighten medSqLogo logoOverlay">
                  <img src={photo.PhotoURL} className="" alt=" Logo" title="" />
                </span>
              </a>
            </div>
            <div class="col-sm-11 pl-sm-lg  mx-0">
              <div class="">
                <h2 style={{ paddingLeft: '30px' }} class="h2 summary strong mt-0 mb-xsm">
                  <a
                    onClick={(event) => this.openCompanyTab(event, 'CompanyPhotos')}
                    href="#"
                    class="reviewLink"
                  >
                    {photo.CompanyName}{' '}
                  </a>
                </h2>
              </div>
              <div class="">
                <div class="row mt-xsm mx-0"></div>
                <div class="reviewComments">
                  <div class="reviewFooter cf">
                    {photo.Status !== 'Not Approved' ? (
                      <strong style={{ float: 'right' }}>{photo.Status}</strong>
                    ) : (
                      ''
                    )}
                    {photo.Status === 'Not Approved' ? (
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
                    {photo.Status === 'Not Approved' ? (
                      <div
                        style={{ paddingRight: '2%' }}
                        class="floatRt helpfulBtn margRtMd tightVert"
                      >
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
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

// export default AllReview;
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

export default connect(mapStateToProps, mapDispatchToProps)(AllPhotos);
