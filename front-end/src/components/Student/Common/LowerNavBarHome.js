/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { updateSearcFilter, updateLowerNavBar } from '../../../constants/action-types';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
// import axios from 'axios';
// import serverUrl from '../../../config';

class LowerNavBarHome extends Component {
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
        style={{ background: '#fff' }}
        data-test="primary-header-nav"
        className="mt-std mb-std mb-md-0 pb-xsm memberHeader__HeaderStyles__bottomShadow"
      >
        <div className="memberHeader__HeaderStyles__navigationWrapper">
          <div className="px-std px-md-lg">
            <div className="d-flex flex-row align-items-center">
              <div className="col">
                <h2 data-test="primary-header-title" className="d-none d-md-block">
                  Hello, what would you like to explore today?
                </h2>
              </div>
            </div>
            <div className="css-trqft4">
              <div className="memberHeader__HeaderStyles__navigationItem">
                <div className="d-none d-md-flex align-items-center justify-content-center">
                  <div>
                    <a
                      // onClick={(event) => this.lowerMenuShow(event, 'Jobs')}
                      className="gd-ui-button p-0 css-ddqncx  css-1s7hc3h"
                      type="button"
                      data-test="site-header-jobs"
                      // href="#"
                      target="_top"
                      data-ga-lbl="null"
                    >
                      <div
                        id="lowerNavBarHome"
                        className="d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-start"
                      >
                        <span className="SVGInline d-flex">
                          <svg
                            className="SVGInline-svg d-flex-svg"
                            style={{ width: '48px', height: '48px' }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path
                                fill="#DFF7E7"
                                d="M10 29h4.465a1 1 0 01.832.445l1.11 1.664A2 2 0 0018.07 32h11.86a2 2 0 001.664-.89l1.11-1.665a1 1 0 01.831-.445H38v7H10v-7z"
                              ></path>
                              <path
                                fill="#0CAA41"
                                d="M11 32v3a1 1 0 001 1h24a1 1 0 001-1v-3a1 1 0 012 0v4a2 2 0 01-2 2H11a2 2 0 01-2-2v-4a1 1 0 012 0zm5-18v-2a2 2 0 012-2h12a2 2 0 012 2v2h7a2 2 0 012 2v11a2 2 0 01-2 2h-5.465a1 1 0 00-.832.445l-1.11 1.664A2 2 0 0129.93 32H18.07a2 2 0 01-1.664-.89l-1.11-1.665a1 1 0 00-.831-.445H9a2 2 0 01-2-2V16a2 2 0 012-2h7zm2 0h12v-1a1 1 0 00-1-1H19a1 1 0 00-1 1v1zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h5.465a1 1 0 01.832.445l1.406 2.11a1 1 0 00.832.445h10.93a1 1 0 00.832-.445l1.406-2.11a1 1 0 01.832-.445H38a1 1 0 001-1v-9a1 1 0 00-1-1H10zm11 10h6a1 1 0 010 2h-6a1 1 0 010-2z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <h3 className="mx-xsm">Jobs</h3>
                      </div>
                    </a>
                    <div className="popup__PopupStyles__popupContainer">
                      <div
                        className={`pt-xxsm popup__PopupStyles__popupContent popup__PopupStyles__popupContentLeft ${
                          this.props.searchDropDownStore.LowerNavBarDropdown === 'Jobs'
                            ? 'popup__PopupStyles__popupContentActive'
                            : ''
                        } `}
                      >
                        <div className="popup__PopupStyles__popupBackground">
                          <div className="d-flex flex-column col">
                            <ul className="p-0 m-0 memberHeader__HeaderStyles__list">
                              <li className="p-0 m-0">
                                <a
                                  className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                  href="/Job/Home/savedJobs.htm"
                                  target="_top"
                                  rel=""
                                  data-ga-lbl="Saved"
                                >
                                  <div className="d-flex align-items-center py-std col header-menu-item-label">
                                    <span className="col">
                                      <span className="menuItem__MenuItemStyles__menuItemColor">
                                        Saved
                                      </span>
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li className="p-0 m-0">
                                <a
                                  className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                  href="/Job/Home/appliedJobs.htm"
                                  target="_top"
                                  rel=""
                                  data-ga-lbl="Applications"
                                >
                                  <div className="d-flex align-items-center py-std col header-menu-item-label">
                                    <span className="col">
                                      <span className="menuItem__MenuItemStyles__menuItemColor">
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
              </div>
              <div className="memberHeader__HeaderStyles__navigationItem">
                <div className="d-none d-md-flex align-items-center justify-content-center">
                  <div>
                    <a
                      // onClick={(event) => this.lowerMenuShow(event, 'Companies')}
                      className="gd-ui-button p-0 css-ddqncx  css-1s7hc3h"
                      type="button"
                      data-test="site-header-companies"
                      // href="#"
                      target="_top"
                      data-ga-lbl="null"
                    >
                      <div
                        id="lowerNavBarHome"
                        className="d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-start"
                      >
                        <span className="SVGInline d-flex">
                          <svg
                            className="SVGInline-svg d-flex-svg"
                            style={{ width: '48px', height: '48px' }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path
                                fill="#0CAA41"
                                fillRule="nonzero"
                                d="M19.182 10h19.636c1.205 0 2.182.895 2.182 2v27H17V12c0-1.105.977-2 2.182-2zM39 37V13a1 1 0 00-1-1H20a1 1 0 00-1 1v24h20z"
                              ></path>
                              <path
                                fill="#DFF7E7"
                                fillRule="nonzero"
                                d="M22 14h14a1 1 0 011 1v20h-4v-3a3 3 0 00-3-3h-2a3 3 0 00-3 3v3h-4V15a1 1 0 011-1z"
                              ></path>
                              <path
                                fill="#0CAA41"
                                fillRule="nonzero"
                                d="M16 19v2h-6a1 1 0 00-1 1v15h7v2H7V21c0-1.105.728-2 1.625-2H16z"
                              ></path>
                              <rect width="4" height="4" x="23" y="16" fill="#0CAA41" rx="2"></rect>
                              <rect width="4" height="4" x="23" y="21" fill="#0CAA41" rx="2"></rect>
                              <rect width="4" height="4" x="31" y="16" fill="#0CAA41" rx="2"></rect>
                              <rect width="4" height="4" x="31" y="21" fill="#0CAA41" rx="2"></rect>
                              <path
                                fill="#0CAA41"
                                stroke="#0CAA41"
                                strokeWidth="2"
                                d="M27 38h4v-6a1 1 0 00-1-1h-2a1 1 0 00-1 1v6z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <h3 className="mx-xsm">Companies</h3>
                      </div>
                    </a>
                    <div className="popup__PopupStyles__popupContainer">
                      <div
                        className={`pt-xxsm popup__PopupStyles__popupContent popup__PopupStyles__popupContentLeft ${
                          this.props.searchDropDownStore.LowerNavBarDropdown === 'Companies'
                            ? 'popup__PopupStyles__popupContentActive'
                            : ''
                        } `}
                      >
                        <div className="popup__PopupStyles__popupBackground">
                          <div className="d-flex flex-column col">
                            <ul className="p-0 m-0 memberHeader__HeaderStyles__list">
                              <li className="p-0 m-0">
                                <a
                                  className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                  href="/mz-survey/start_input.htm?showSurvey=REVIEWS&amp;c=PAGE_HEADER_NAV"
                                  target="_top"
                                  rel=""
                                  data-ga-lbl="WriteReview"
                                >
                                  <div className="d-flex align-items-center py-std col header-menu-item-label">
                                    <span className="col">
                                      <span className="menuItem__MenuItemStyles__menuItemColor">
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
              </div>
              <div className="memberHeader__HeaderStyles__navigationItem">
                <div className="d-none d-md-flex align-items-center justify-content-center">
                  <div>
                    <a
                      // onClick={(event) => this.lowerMenuShow(event, 'Salaries')}
                      className="gd-ui-button p-0 css-ddqncx  css-1s7hc3h"
                      type="button"
                      data-test="site-header-salaries"
                      // href="#"
                      target="_top"
                      data-ga-lbl="null"
                    >
                      <div
                        id="lowerNavBarHome"
                        className="d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-start"
                      >
                        <span className="SVGInline d-flex">
                          <svg
                            className="SVGInline-svg d-flex-svg"
                            style={{ width: '48px', height: '48px' }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path
                                fill="#0CAA41"
                                d="M12 36h24a2 2 0 01-2 2H14a2 2 0 01-2-2zm-2-4h28a2 2 0 01-2 2H12a2 2 0 01-2-2zM9 10h30a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V12a2 2 0 012-2zm5 2a5 5 0 01-5 5v6a5 5 0 015 5h20a5 5 0 015-5v-6a5 5 0 01-5-5H14zm10 12a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
                              ></path>
                              <path
                                fill="#DFF7E7"
                                d="M15.71 14h16.58A7.015 7.015 0 0037 18.71v2.58A7.015 7.015 0 0032.29 26H15.71A7.015 7.015 0 0011 21.29v-2.58A7.015 7.015 0 0015.71 14zM24 24a4 4 0 100-8 4 4 0 000 8z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <h3 className="mx-xsm">Salaries</h3>
                      </div>
                    </a>
                    <div className="popup__PopupStyles__popupContainer">
                      <div
                        className={`pt-xxsm popup__PopupStyles__popupContent popup__PopupStyles__popupContentLeft ${
                          this.props.searchDropDownStore.LowerNavBarDropdown === 'Salaries'
                            ? 'popup__PopupStyles__popupContentActive'
                            : ''
                        } `}
                      >
                        <div className="popup__PopupStyles__popupBackground">
                          <div className="d-flex flex-column col">
                            <ul className="p-0 m-0 memberHeader__HeaderStyles__list">
                              <li className="p-0 m-0">
                                <a
                                  className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                  href="/mz-survey/start_input.htm?showSurvey=SALARIES&amp;c=PAGE_HEADER_NAV"
                                  target="_top"
                                  rel=""
                                  data-ga-lbl="AddSalary"
                                >
                                  <div className="d-flex align-items-center py-std col header-menu-item-label">
                                    <span className="col">
                                      <span className="menuItem__MenuItemStyles__menuItemColor">
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
              </div>
              <div className="memberHeader__HeaderStyles__navigationItem">
                <div className="d-none d-md-flex align-items-center justify-content-center">
                  <div>
                    <a
                      // onClick={(event) => this.lowerMenuShow(event, 'Interviews')}
                      className="gd-ui-button p-0 css-ddqncx  css-1s7hc3h"
                      type="button"
                      data-test="site-header-interviews"
                      // href="#"
                      target="_top"
                      data-ga-lbl="null"
                    >
                      <div
                        id="lowerNavBarHome"
                        className="d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-start"
                      >
                        <span className="SVGInline d-flex">
                          <svg
                            className="SVGInline-svg d-flex-svg"
                            style={{ width: '48px', height: '48px' }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path
                                fill="#0CAA41"
                                fillRule="nonzero"
                                d="M10 22c0 .295.011.588.033.879C8.755 24.165 8 25.779 8 27.5c0 2.192 1.218 4.267 3.35 5.704l.741.5.122.885c.053.386.089.772.107 1.158.398-.226.765-.457 1.1-.693l.717-.505.859.186c.808.175 1.648.265 2.504.265.853 0 1.676-.089 2.458-.254 1.076.404 2.214.719 3.398.932C21.64 36.518 19.639 37 17.5 37c-1.012 0-1.993-.108-2.928-.31-1.206.849-2.73 1.62-4.572 2.31.345-1.38.422-2.758.232-4.137C7.649 33.12 6 30.469 6 27.5c0-2.934 1.61-5.557 4.14-7.3-.093.59-.14 1.19-.14 1.8z"
                              ></path>
                              <path
                                fill="#FFF"
                                stroke="#0CAA41"
                                strokeWidth="2"
                                d="M32.714 37.39a11.828 11.828 0 01.309-3.935l.124-.5.479-.19C38.73 30.748 42 26.586 42 22c0-6.576-6.675-12-15-12s-15 5.424-15 12 6.675 12 14.991 12l.327-.003.667-.016.309.364c.946 1.115 2.418 2.134 4.42 3.044z"
                              ></path>
                              <ellipse cx="27" cy="22" fill="#DFF7E7" rx="12" ry="9"></ellipse>
                              <circle cx="21" cy="22" r="2" fill="#0CAA41"></circle>
                              <circle cx="27" cy="22" r="2" fill="#0CAA41"></circle>
                              <circle cx="33" cy="22" r="2" fill="#0CAA41"></circle>
                            </g>
                          </svg>
                        </span>
                        <h3 className="mx-xsm">Interviews</h3>
                      </div>
                    </a>
                    <div className="popup__PopupStyles__popupContainer">
                      <div
                        className={`pt-xxsm popup__PopupStyles__popupContent popup__PopupStyles__popupContentLeft ${
                          this.props.searchDropDownStore.LowerNavBarDropdown === 'Interviews'
                            ? 'popup__PopupStyles__popupContentActive'
                            : ''
                        } `}
                      >
                        <div className="popup__PopupStyles__popupBackground">
                          <div className="d-flex flex-column col">
                            <ul className="p-0 m-0 memberHeader__HeaderStyles__list">
                              <li className="p-0 m-0">
                                <a
                                  className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                  href="#"
                                  target="_top"
                                  rel=""
                                  data-ga-lbl="AddInterview"
                                >
                                  <div className="d-flex align-items-center py-std col header-menu-item-label">
                                    <span className="col">
                                      <span className="menuItem__MenuItemStyles__menuItemColor">
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
// export default LowerNavBarHome;
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

export default connect(mapStateToProps, mapDispatchToProps)(LowerNavBarHome);
