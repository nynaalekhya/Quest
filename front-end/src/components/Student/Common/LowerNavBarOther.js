/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { updateSearcFilter, updateLowerNavBar } from '../../../constants/action-types';
import { connect } from 'react-redux';
import './LowerNavBarOther.css';

class LowerNavBarOther extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  lowerMenuShow = (event, selectedOption) => {
    event.preventDefault();
    let payload;
    if (this.props.searchDropDownStore.LowerNavBarDropdown === selectedOption) {
      payload = {
        LowerNavBarDropdown: '',
      };
    } else {
      payload = {
        LowerNavBarDropdown: selectedOption,
      };
    }
    this.props.updateLowerNavBar(payload);
  };

  render() {
    return (
      <nav
        data-test="primary-header-nav"
        className="d-none d-md-block HeaderStyles__bottomShadow HeaderStyles__navigationBackground HeaderStyles__primaryNavigation"
      >
        <div className="d-flex align-items-center HeaderStyles__navigationWrapper">
          <div className="px-std px-md-lg col HeaderStyles__navigationScroll">
            <div
              // style={
              //   localStorage.getItem('selectedDropDown') === 'Jobs'
              //     ? { borderBottom: '4px solid #0caa41' }
              //     : {}
              // }
              className="d-inline-flex align-items-center mr-xl HeaderStyles__navigationItem "
            >
              <div>
                <a
                  className={`gd-ui-button d-flex plain px-xxsm   ${
                    this.props.searchDropDownStore.LowerNavBarDropdown === 'Jobs'
                      ? 'HeaderStyles__activeButton css-1aftjfw'
                      : 'css-1aftjfw'
                  } `}
                  // className="gd-ui-button d-flex plain px-xxsm  HeaderStyles__activeButton css-1aftjfw"
                  type="button"
                  data-test="site-header-jobs"
                  // href="#"
                  // target="_top"
                  data-ga-lbl="null"
                  // onClick={(event) => this.lowerMenuShow(event, 'Jobs')}
                >
                  <span className="SVGInline d-flex IconStyles__colorDefault ">
                    <svg
                      className="SVGInline-svg d-flex-svg IconStyles__colorDefault-svg -svg"
                      style={{ width: '24px', height: '24px' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      {localStorage.getItem('selectedDropDown') === 'Jobs' ? (
                        <path
                          d="M16 3a2 2 0 012 2v1h2a2 2 0 012 2v6a.9.9 0 01-1 1h-4.29l-.5 2H7.78l-.5-2H3a.9.9 0 01-1-1V8a2 2 0 012-2h2V5a2 2 0 012-2zM6.5 16l.5 2h10l.5-2H21v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3zm8-1h-5a.5.5 0 110-1h5a.5.5 0 110 1zM17 6H7V5a1 1 0 011-1h8a1 1 0 011 1z"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                      ) : (
                        <path
                          d="M16 4H8a1 1 0 00-1 1v1h10V5a1 1 0 00-1-1zm-1.5 10a.5.5 0 01.09 1H9.5a.5.5 0 010-1zM20 7H4a1 1 0 00-1 1v6a1 1 0 001 1h3.28l.5 2h8.44l.5-2H20a1 1 0 001-1V8a1 1 0 00-1-1zM6.5 16H4v3a1 1 0 001 1h14a1 1 0 001-1v-3h-2.5l-.5 2H7zM16 3a2 2 0 012 2v1h2a2 2 0 012 2v6a2 2 0 01-1 1.73V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-3.27A2 2 0 012 14V8a2 2 0 012-2h2V5a2 2 0 012-2z"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                      )}
                    </svg>
                  </span>
                  <b className="ml-xsm">Jobs</b>
                </a>
                <div className="PopupStyles__popupContainer">
                  <div
                    className={`pt-xxsm PopupStyles__popupContent PopupStyles__popupContentLeft ${
                      this.props.searchDropDownStore.LowerNavBarDropdown === 'Jobs'
                        ? 'PopupStyles__popupContentActive'
                        : ''
                    } `}
                    // className="pt-xxsm PopupStyles__popupContent PopupStyles__popupContentLeft PopupStyles__popupContentActive "
                  >
                    <div className="PopupStyles__popupBackground">
                      <div className="d-flex flex-column col">
                        <ul className="p-0 m-0 HeaderStyles__list">
                          <li className="p-0 m-0">
                            <a
                              className="d-flex align-items-center px-std MenuItemStyles__menuItem MenuItemStyles__menuItemHoverEffect header-menu-item"
                              href=""
                              target="_top"
                              rel=""
                              data-ga-lbl="Saved"
                            >
                              <div className="d-flex align-items-center py-std col header-menu-item-label">
                                <span className="col">
                                  <span className="MenuItemStyles__menuItemColor">Saved</span>
                                </span>
                              </div>
                            </a>
                          </li>
                          <li className="p-0 m-0">
                            <a
                              className="d-flex align-items-center px-std MenuItemStyles__menuItem MenuItemStyles__menuItemHoverEffect header-menu-item"
                              href="/Job/Home/appliedJobs.htm"
                              target="_top"
                              rel=""
                              data-ga-lbl="Applications"
                            >
                              <div className="d-flex align-items-center py-std col header-menu-item-label">
                                <span className="col">
                                  <span className="MenuItemStyles__menuItemColor">
                                    Applications
                                  </span>
                                </span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              // style={
              //   localStorage.getItem('selectedDropDown') === 'Companies'
              //     ? { borderBottom: '4px solid #0caa41' }
              //     : {}
              // }
              className="d-inline-flex align-items-center mr-xl HeaderStyles__navigationItem HeaderStyles__activeNavigationItem"
            >
              <div>
                <a
                  className={`gd-ui-button d-flex plain px-xxsm   ${
                    this.props.searchDropDownStore.LowerNavBarDropdown === 'Companies'
                      ? 'HeaderStyles__activeButton css-1aftjfw'
                      : 'css-1aftjfw'
                  } `}
                  // className="gd-ui-button d-flex plain px-xxsm HeaderStyles__activeMenuItem HeaderStyles__activeButton css-1aftjfw"
                  type="button"
                  data-test="site-header-companies"
                  // href="#"
                  // target="_top"
                  data-ga-lbl="null"
                  // onClick={(event) => this.lowerMenuShow(event, 'Companies')}
                >
                  <span className="SVGInline d-flex IconStyles__colorActive ">
                    <svg
                      className="SVGInline-svg d-flex-svg IconStyles__colorActive-svg -svg"
                      style={{ width: '24px', height: '24px' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      {localStorage.getItem('selectedDropDown') === 'Companies' ? (
                        <path
                          d="M21 3.5a1 1 0 011 1v16H8v-16a1 1 0 011-1zm-15 5v12H2v-11a.91.91 0 01.78-1zM12 7a.5.5 0 01.5-.5h1a.49.49 0 01.5.5v1a.5.5 0 01-.49.5h-1A.5.5 0 0112 8zm0 5v-1a.5.5 0 01.5-.5h1a.49.49 0 01.5.5v1a.5.5 0 01-.49.5h-1A.5.5 0 0112 12zm5 7.49h-4V16a.5.5 0 01.5-.5h3a.5.5 0 01.5.5zM18 12a.5.5 0 01-.5.5h-1a.51.51 0 01-.5-.5v-1a.5.5 0 01.5-.5h1a.5.5 0 01.5.5zm0-4a.5.5 0 01-.5.5h-1A.51.51 0 0116 8V7a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                      ) : (
                        <path
                          d="M13.5 6.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1A.5.5 0 0112 8V7a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1A.5.5 0 0116 8V7a.5.5 0 01.5-.5zm-4 4a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm-1 5h-3a.49.49 0 00-.5.5v3.5h4V16a.5.5 0 00-.5-.5zm4-11h-11A.5.5 0 009 5v14.5h3v-4a1 1 0 011-1h4a1 1 0 011 1v4h3V5a.5.5 0 00-.5-.5zm.5-1a1 1 0 011 1v16H8v-16a1 1 0 011-1zm-15 5v1H3.5a.5.5 0 00-.5.5v9.5h3v1H2v-11a.91.91 0 01.78-1z"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                      )}
                    </svg>
                  </span>
                  <b className="ml-xsm">Companies</b>
                </a>
                <div className="PopupStyles__popupContainer">
                  <div
                    className={`pt-xxsm PopupStyles__popupContent PopupStyles__popupContentLeft ${
                      this.props.searchDropDownStore.LowerNavBarDropdown === 'Companies'
                        ? 'PopupStyles__popupContentActive'
                        : ''
                    } `}
                  >
                    <div className="PopupStyles__popupBackground">
                      <div className="d-flex flex-column col">
                        <ul className="p-0 m-0 HeaderStyles__list">
                          <li className="p-0 m-0">
                            <a
                              className="d-flex align-items-center px-std MenuItemStyles__menuItem MenuItemStyles__menuItemHoverEffect header-menu-item"
                              href="/mz-survey/start_input.htm?showSurvey=REVIEWS&amp;c=PAGE_HEADER_NAV"
                              target="_top"
                              rel=""
                              data-ga-lbl="WriteReview"
                            >
                              <div className="d-flex align-items-center py-std col header-menu-item-label">
                                <span className="col">
                                  <span className="MenuItemStyles__menuItemColor">
                                    Write a Review
                                  </span>
                                </span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              // style={
              //   localStorage.getItem('selectedDropDown') === 'Salaries'
              //     ? { borderBottom: '4px solid #0caa41' }
              //     : {}
              // }
              className="d-inline-flex align-items-center mr-xl HeaderStyles__navigationItem "
            >
              <div>
                <a
                  className={`gd-ui-button d-flex plain px-xxsm   ${
                    this.props.searchDropDownStore.LowerNavBarDropdown === 'Salaries'
                      ? 'HeaderStyles__activeButton css-1aftjfw'
                      : 'css-1aftjfw'
                  } `}
                  // className="gd-ui-button d-flex plain px-xxsm  HeaderStyles__activeButton css-1aftjfw"
                  type="button"
                  data-test="site-header-salaries"
                  // href="#"
                  // target="_top"
                  data-ga-lbl="null"
                  // onClick={(event) => this.lowerMenuShow(event, 'Salaries')}
                >
                  <span className="SVGInline d-flex IconStyles__colorDefault ">
                    <svg
                      className="SVGInline-svg d-flex-svg IconStyles__colorDefault-svg -svg"
                      style={{ width: '24px', height: '24px' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      {localStorage.getItem('selectedDropDown') === 'Salaries' ? (
                        <path
                          d="M12 9a2 2 0 102 2 2 2 0 00-2-2zm0-1a3 3 0 11-3 3 3 3 0 013-3zm8 10a1 1 0 01-1 1H5a1 1 0 01-1-1zM5.06 6H3.5a.5.5 0 00-.5.5v1.56A2.06 2.06 0 005.06 6zM20.5 6h-1.56a1.74 1.74 0 002 2.07H21V6.5a.5.5 0 00-.5-.5zM3 13.94v1.56a.5.5 0 00.5.5h1.56A2.06 2.06 0 003 13.94zm18 0A2.06 2.06 0 0018.94 16h1.56a.5.5 0 00.5-.5zM21 5a1 1 0 011.05 1v10A1 1 0 0121 17H3.05A1 1 0 012 16V6.05a1 1 0 011-1z"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                      ) : (
                        <path
                          d="M12 9a2 2 0 102 2 2 2 0 00-2-2zm0-1a3 3 0 11-3 3 3 3 0 013-3zm8 10a1 1 0 01-1 1H5a1 1 0 01-1-1zm1-13H3.05a1 1 0 00-1 1v10a1 1 0 001 1.05H21A1 1 0 0022 16V6.05A1 1 0 0021 5zM3 6.5a.5.5 0 01.5-.5h1.56A2.06 2.06 0 013 8.06zm.5 9.5a.5.5 0 01-.5-.5v-1.56A2.06 2.06 0 015.06 16zm17.5-.5a.5.5 0 01-.5.5h-1.56A2.06 2.06 0 0121 13.94zm0-2.56A3.06 3.06 0 0017.94 16H6.06A3.06 3.06 0 003 12.94V9.06A3.06 3.06 0 006.06 6h11.88A3.06 3.06 0 0021 9.06zm0-4.88h-.1a1.74 1.74 0 01-2-2.07h1.6a.5.5 0 01.5.5z"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                      )}
                    </svg>
                  </span>
                  <b className="ml-xsm">Salaries</b>
                </a>
                <div className="PopupStyles__popupContainer">
                  <div
                    className={`pt-xxsm PopupStyles__popupContent PopupStyles__popupContentLeft ${
                      this.props.searchDropDownStore.LowerNavBarDropdown === 'Salaries'
                        ? 'PopupStyles__popupContentActive'
                        : ''
                    } `}
                  >
                    <div className="PopupStyles__popupBackground">
                      <div className="d-flex flex-column col">
                        <ul className="p-0 m-0 HeaderStyles__list">
                          <li className="p-0 m-0">
                            <a
                              className="d-flex align-items-center px-std MenuItemStyles__menuItem MenuItemStyles__menuItemHoverEffect header-menu-item"
                              href="/mz-survey/start_input.htm?showSurvey=SALARIES&amp;c=PAGE_HEADER_NAV"
                              target="_top"
                              rel=""
                              data-ga-lbl="AddSalary"
                            >
                              <div className="d-flex align-items-center py-std col header-menu-item-label">
                                <span className="col">
                                  <span className="MenuItemStyles__menuItemColor">
                                    Add a Salary
                                  </span>
                                </span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              // style={
              //   localStorage.getItem('selectedDropDown') === 'Interviews'
              //     ? { borderBottom: '4px solid #0caa41' }
              //     : {}
              // }
              className="d-inline-flex align-items-center mr-xl HeaderStyles__navigationItem "
            >
              <div>
                <a
                  className={`gd-ui-button d-flex plain px-xxsm   ${
                    this.props.searchDropDownStore.LowerNavBarDropdown === 'Interviews'
                      ? 'HeaderStyles__activeButton css-1aftjfw'
                      : 'css-1aftjfw'
                  } `}
                  // className="gd-ui-button d-flex plain px-xxsm  HeaderStyles__activeButton css-1aftjfw"
                  type="button"
                  data-test="site-header-interviews"
                  // href="#"
                  // target="_top"
                  data-ga-lbl="null"
                  // onClick={(event) => this.lowerMenuShow(event, 'Interviews')}
                >
                  <span className="SVGInline d-flex IconStyles__colorDefault ">
                    <svg
                      className="SVGInline-svg d-flex-svg IconStyles__colorDefault-svg -svg"
                      style={{ width: '24px', height: '24px' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      {localStorage.getItem('selectedDropDown') === 'Interviews' ? (
                        <path
                          d="M22 10.66C22 6.4 17.73 3 12.5 3S3 6.4 3 10.66a6.54 6.54 0 00.2 1.59A3.76 3.76 0 002 14.94c0 1.71 1.27 3.21 3.22 4a3.32 3.32 0 01-.1 1.43.5.5 0 00.58.63 5.48 5.48 0 001.86-.81 4.87 4.87 0 00.92-.78 7.19 7.19 0 003.27-1 .44.44 0 00.16-.14h.36a4.16 4.16 0 00.3.31 8.91 8.91 0 001.3 1.06 9.12 9.12 0 003 1.31.5.5 0 00.57-.68 6.7 6.7 0 01-.47-2.9c3-1.32 5-3.88 5-6.75M8 10a1 1 0 11-1 1 1 1 0 011-1m.21 8.41a.47.47 0 00-.41.23 3.91 3.91 0 01-.81.71 5.08 5.08 0 01-.76.42 4.65 4.65 0 00-.1-1.36.49.49 0 00-.33-.35C4.09 17.47 3 16.25 3 14.94a2.58 2.58 0 01.47-1.46 8.74 8.74 0 006.22 4.67h.11a7.34 7.34 0 01-1.58.23M12.51 12a1 1 0 111-1 1 1 0 01-1 1M16 11a1 1 0 111 1 1 1 0 01-1-1"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                      ) : (
                        <path
                          d="M17 10a1 1 0 11-1 1 1 1 0 011-1m-4.5 0a1 1 0 11-1 1 1 1 0 011-1M8 10a1 1 0 11-1 1 1 1 0 011-1m4.5-6C7.78 4 4 7 4 10.66s3.78 6.65 8.5 6.65a.47.47 0 01.39.2l.38.4a8.08 8.08 0 003 1.84A7.26 7.26 0 0116 17a.53.53 0 01.31-.4c2.88-1.14 4.69-3.43 4.69-5.94C21 7 17.22 4 12.5 4m0-1c5.23 0 9.5 3.4 9.5 7.66 0 2.87-2 5.43-5 6.75a6.7 6.7 0 00.47 2.9.5.5 0 01-.57.68 9.12 9.12 0 01-3-1.31 8.91 8.91 0 01-1.3-1.06 4.16 4.16 0 01-.3-.31h-.36a.44.44 0 01-.16.14 7.19 7.19 0 01-3.27 1 4.87 4.87 0 01-.92.78A5.48 5.48 0 015.7 21a.5.5 0 01-.58-.66 3.32 3.32 0 00.1-1.43C3.27 18.15 2 16.65 2 14.94a3.76 3.76 0 011.2-2.69 6.54 6.54 0 01-.2-1.59C3 6.4 7.27 3 12.5 3M3 14.94c0 1.31 1.09 2.53 2.81 3.12a.49.49 0 01.33.35 4.65 4.65 0 01.1 1.36 5.08 5.08 0 00.76-.42 3.91 3.91 0 00.81-.71.47.47 0 01.41-.23 7.34 7.34 0 001.58-.23h-.11a8.74 8.74 0 01-6.22-4.67A2.56 2.56 0 003 14.94"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                      )}
                    </svg>
                  </span>
                  <b className="ml-xsm">Interviews</b>
                </a>
                <div className="PopupStyles__popupContainer">
                  <div
                    className={`pt-xxsm PopupStyles__popupContent PopupStyles__popupContentLeft ${
                      this.props.searchDropDownStore.LowerNavBarDropdown === 'Interviews'
                        ? 'PopupStyles__popupContentActive'
                        : ''
                    } `}
                  >
                    <div className="PopupStyles__popupBackground">
                      <div className="d-flex flex-column col">
                        <ul className="p-0 m-0 HeaderStyles__list">
                          <li className="p-0 m-0">
                            <a
                              className="d-flex align-items-center px-std MenuItemStyles__menuItem MenuItemStyles__menuItemHoverEffect header-menu-item"
                              href="/mz-survey/start_input.htm?showSurvey=INTERVIEWS&amp;c=PAGE_HEADER_NAV"
                              target="_top"
                              rel=""
                              data-ga-lbl="AddInterview"
                            >
                              <div className="d-flex align-items-center py-std col header-menu-item-label">
                                <span className="col">
                                  <span className="MenuItemStyles__menuItemColor">
                                    Add an Interview
                                  </span>
                                </span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchDropDownStore } = state.searchDropDownReducer;
  return {
    searchDropDownStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSearcFilter: (payload) => {
      dispatch({
        type: updateSearcFilter,
        payload,
      });
    },
    updateLowerNavBar: (payload) => {
      dispatch({
        type: updateLowerNavBar,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LowerNavBarOther);

// export default ;
