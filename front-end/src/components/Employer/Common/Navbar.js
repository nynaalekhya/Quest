import React, { Component, PropTypes } from 'react';
import './Navbar.css';
import { Redirect } from 'react-router';
import { history } from '../../../App';
import axios from 'axios';
import serverUrl from '../../../config';
import {
  openProfileTabOnClick,
  updateSearcFilter,
  updateCompanyProfile,
} from '../../../constants/action-types';
import { connect } from 'react-redux';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedout: false,
    };
  }

  componentDidMount() {
    //set the with credentials to true
    const data = localStorage.getItem('userId');
    console.log(data);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    //make a post request with the user data')
    axios
      .get(serverUrl + 'company/profile', {
        params: {
          CompanyID: data,
        },
      })
      .then(
        (response) => {
          if (response.status === 200) {
            console.log('company:', response.data);
            localStorage.setItem('companyName', response.data);
            let payload = {
              CompanyName: response.data.CompanyName,
              Website: response.data.Website,
              Size: response.data.Size,
              ProfileImg: response.data.ProfileImg,
              Type: response.data.Type,
              Revenue: response.data.Revenue,
              Headquarter: response.data.Headquarter,
              Industry: response.data.Industry,
              Founded: response.data.Founded,
              CompanyDescription: response.data.CompanyDescription,
              CompanyMission: response.data.CompanyMission,
              CEO: response.data.CEO,
              City: response.data.City,
              State: response.data.State,
              FeaturedReview: response.data.FeaturedReview,
              CoverPhoto: response.data.CoverPhoto,
            };
            console.log('payload', payload);
            localStorage.setItem('companyName', response.data.CompanyName);
            this.props.updateCompanyProfile(payload);
            this.setState({
              authFlag: true,
            });
          }
        },
        (error) => {
          this.setState({
            errorMessage: 'No Profile found',
          });
        }
      );
  }

  handleOnClick = (selectedOption) => {
    console.log('selected option', selectedOption);
    switch (selectedOption) {
      case 'Home': {
        localStorage.setItem('selectedOption', 'Home');
        console.log('inside home');
        history.push('/Employer');
        break;
      }
      case 'Jobs': {
        localStorage.setItem('selectedOption', 'Jobs');
        console.log('inside jobs');
        history.push('/EmployerJobs');
        break;
      }
      case 'Reviews': {
        localStorage.setItem('selectedOption', 'Reviews');
        console.log('inside reviews');
        history.push('/EmployerReviews');
        break;
      }
    }
  };

  showMainMenu = (event) => {
    event.preventDefault();
    const payload = {
      mainDropDown: !this.props.searchDropDownStore.mainDropDown,
    };
    this.props.updateSearcFilter(payload);
  };

  mainMenuClicked = (event, selectedMenuoption) => {
    // event.preventDefault();
    switch (selectedMenuoption) {
      case 'Sign Out': {
        localStorage.clear();
        axios.post(serverUrl + 'glassdoor/logout').then((response) => {
          if (response.status === 200) {
            this.setState({
              loggedout: true,
            });
          }
        });
        break;
      }
      case 'Profile': {
        history.push('/Employer');
        // this.setState({
        //   redirect: '/Profile',
        // });
        localStorage.setItem('openTab', selectedMenuoption);
        let payload = { openTab: selectedMenuoption };
        this.props.openProfileTabOnClick(payload);
        break;
      }
      case 'Reviews': {
        history.push('/EmployerReviews');
        // this.setState({
        //   redirect: '/Profile',
        // });
        localStorage.setItem('openTab', selectedMenuoption);
        let payload = { openTab: selectedMenuoption };
        this.props.openProfileTabOnClick(payload);
        break;
      }
      case 'Jobs': {
        history.push('/EmployerJobs');
        // this.setState({
        //   redirect: '/Profile',
        // });
        localStorage.setItem('openTab', selectedMenuoption);
        let payload = { openTab: selectedMenuoption };
        this.props.openProfileTabOnClick(payload);
        break;
      }
      case 'Report': {
        history.push('/EmployerReport');
        // this.setState({
        //   redirect: '/Profile',
        // });
        localStorage.setItem('openTab', selectedMenuoption);
        let payload = { openTab: selectedMenuoption };
        this.props.openProfileTabOnClick(payload);
        break;
      }
      default: {
        break;
      }
    }
    const payload = {
      mainDropDown: false,
    };
    this.props.updateSearcFilter(payload);
  };

  goToHomePage = () => {
    history.push('/Home');
  };
  render() {
    let redirectVar = null;
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('selectedOption') === 'Jobs') {
        redirectVar = <Redirect to="/EmployerJobs" />;
      } else if (localStorage.getItem('selectedOption') === 'Reviews') {
        redirectVar = <Redirect to="/EmployerReviews" />;
      }
    }
    return (
      <div>
        {' '}
        <header id="SiteNav">
          <nav className="d-flex align-items-center memberHeader__HeaderStyles__navigationBackground memberHeader__HeaderStyles__relativePosition">
            <div className="col memberHeader__HeaderStyles__bottomShadow">
              <div className="memberHeader__HeaderStyles__navigationWrapper">
                <div className="d-flex justify-content-between align-items-center px-std px-md-lg memberHeader__HeaderStyles__mainNav">
                  <div className="d-flex order-0 order-md-6">
                    <div class="d-none d-md-flex">
                      <div>
                        <div
                          onClick={this.showMainMenu}
                          class="d-flex "
                          data-test="user-profile-dropdown-trigger"
                        >
                          <span class="SVGInline d-flex icon__IconStyles__colorDefault">
                            <svg
                              class="SVGInline-svg d-flex-svg icon__IconStyles__colorDefault-svg"
                              style={{ width: '36px', height: '36px' }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 19a8.91 8.91 0 01-5.33-1.75 6 6 0 0110.66 0A8.91 8.91 0 0112 21zm6.11-2.4a7 7 0 00-12.22 0 9 9 0 1112.22 0zM12 6a4 4 0 104 4 4 4 0 00-4-4zm0 7a3 3 0 113-3 3 3 0 01-3 3z"
                                fill="currentColor"
                                fill-rule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </div>
                        <div class="popup__PopupStyles__popupContainer">
                          <div
                            className={`pt-xxsm popup__PopupStyles__popupContent popup__PopupStyles__popupContentRight ${
                              this.props.searchDropDownStore.mainDropDown
                                ? 'popup__PopupStyles__popupContentActive'
                                : ''
                            }`}
                          >
                            <div class="popup__PopupStyles__popupBackground">
                              <div class="d-flex flex-column col" style={{ width: '100%' }}>
                                <div class="accountPopup__AccountPopupStyles__menuContainer">
                                  <div class="accountPopup__AccountPopupStyles__accountMenu accountPopup__AccountPopupStyles__active">
                                    <ul class="p-0 m-0 memberHeader__HeaderStyles__list">
                                      <li
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {
                                          this.mainMenuClicked(event, 'Profile');
                                        }}
                                        class="p-0 m-0"
                                      >
                                        <a
                                          class="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="#"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="My Profile"
                                        >
                                          <div class="d-flex align-items-center py-std col header-menu-item-label">
                                            <span class="col">
                                              <span class="menuItem__MenuItemStyles__menuItemColor">
                                                Profile
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {
                                          this.mainMenuClicked(event, 'Jobs');
                                        }}
                                        class="p-0 m-0"
                                      >
                                        <a
                                          class="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="#"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="Job Postings"
                                        >
                                          <div class="d-flex align-items-center py-std col header-menu-item-label">
                                            <span class="col">
                                              <span class="menuItem__MenuItemStyles__menuItemColor">
                                                Job Postings
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {
                                          this.mainMenuClicked(event, 'Reviews');
                                        }}
                                        class="p-0 m-0"
                                      >
                                        <a
                                          class="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="#"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="My Reviews"
                                        >
                                          <div class="d-flex align-items-center py-std col header-menu-item-label">
                                            <span class="col">
                                              <span class="menuItem__MenuItemStyles__menuItemColor">
                                                Reviews
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {
                                          this.mainMenuClicked(event, 'Report');
                                        }}
                                        class="p-0 m-0"
                                      >
                                        <a
                                          class="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="#"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="Report"
                                        >
                                          <div class="d-flex align-items-center py-std col header-menu-item-label">
                                            <span class="col">
                                              <span class="menuItem__MenuItemStyles__menuItemColor">
                                                Report
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                    </ul>

                                    <ul class="p-0 m-0 memberHeader__HeaderStyles__list">
                                      <li
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {
                                          this.mainMenuClicked(event, 'Sign Out');
                                        }}
                                        class="p-0 m-0"
                                      >
                                        <a
                                          class="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="#"
                                          target=""
                                          rel=""
                                          data-ga-lbl="Sign Out"
                                          data-test="sign-out"
                                        >
                                          <div class="d-flex align-items-center py-std col header-menu-item-label">
                                            <span class="col">
                                              <span class="menuItem__MenuItemStyles__menuItemColor">
                                                Sign Out
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="accountPopup__AccountPopupStyles__notificationMenu accountPopup__AccountPopupStyles__inactive">
                                    <div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex order-2 memberHeader__HeaderStyles__brandLogoContainer">
                    <a
                      onClick={this.goToHomePage}
                      href="#"
                      alt=""
                      target="_top"
                      rel="nofollow"
                      data-test="header-glassdoor-logo"
                      aria-label="Glassdoor Logo"
                    >
                      <span class="SVGInline d-flex align-items-center memberHeader__HeaderStyles__brandLogo">
                        <svg
                          class="SVGInline-svg d-flex-svg align-items-center-svg memberHeader__HeaderStyles__brandLogo-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          width="122"
                          height="24"
                          viewBox="0 0 163 32"
                        >
                          <g fill="#0CAA41" fill-rule="evenodd">
                            <path
                              id="prefix__icon-logo-glassdoor-1"
                              d="M163 7.366a.55.55 0 00-.285-.447c-.37-.182-.908-.307-2.005-.307-2.475 0-4.664 1.211-5.619 3.237V7.374a.39.39 0 00-.393-.388h-3.706a.39.39 0 00-.393.388v16.684a.39.39 0 00.393.388h3.882a.391.391 0 00.394-.388v-7.505c0-3.352 2.366-5.018 5.442-5.018a6.37 6.37 0 011.794.274c.246.08.496-.12.496-.376V7.366zm-24.807 12.986c-2.653 0-4.705-1.85-4.705-4.644s2.053-4.645 4.705-4.645c2.653 0 4.704 1.852 4.704 4.645 0 2.794-2.051 4.644-4.704 4.644zm0-13.794c-5.447 0-9.515 3.702-9.515 9.15s4.068 9.15 9.515 9.15c5.446 0 9.514-3.702 9.514-9.15s-4.068-9.15-9.514-9.15zm-21.6 13.794c-2.653 0-4.705-1.85-4.705-4.644 0-2.793 2.052-4.644 4.705-4.644s4.704 1.85 4.704 4.644-2.051 4.644-4.704 4.644zm0-13.794c-5.447 0-9.515 3.702-9.515 9.15s4.068 9.15 9.515 9.15c5.446 0 9.514-3.702 9.514-9.15s-4.068-9.15-9.514-9.15zm-21.57 13.837c-2.652 0-4.633-1.85-4.633-4.68 0-2.828 1.981-4.68 4.634-4.68 2.618 0 4.633 1.782 4.633 4.68 0 2.864-2.015 4.68-4.633 4.68zM103.792.001H99.91a.39.39 0 00-.392.388V9.5c-1.203-1.676-3.184-2.969-5.943-2.969-4.315 0-7.994 3.284-7.994 9.186 0 5.901 3.68 9.183 8.064 9.183 2.583 0 4.6-1.117 5.872-2.898v2.057a.39.39 0 00.393.388h3.882a.39.39 0 00.393-.388V.39a.39.39 0 00-.393-.389zM83.01 19.161c0 3.981-2.936 5.693-7.64 5.693-3.249 0-6.044-.864-7.643-2.651a.395.395 0 01-.01-.504l2.244-2.877a.39.39 0 01.589-.022c1.187 1.199 3.01 1.932 5.28 1.932 1.309 0 2.37-.348 2.37-1.326 0-.944-.955-1.152-3.926-1.781-2.618-.525-5.872-1.711-5.872-5.518 0-3.527 2.83-5.553 7.464-5.553 3.047 0 5.238.908 6.783 2.338a.39.39 0 01.037.526l-2.13 2.73a.386.386 0 01-.558.06c-1.045-.92-2.78-1.498-4.486-1.498-1.45 0-2.264.455-2.264 1.223 0 .873.956 1.083 4.104 1.746 3.076.663 5.658 1.816 5.658 5.482zm-17.952.01c0 3.981-2.936 5.693-7.64 5.693-3.249 0-6.044-.864-7.643-2.651a.395.395 0 01-.01-.503l2.244-2.878a.391.391 0 01.589-.022c1.187 1.2 3.01 1.933 5.28 1.933 1.309 0 2.37-.349 2.37-1.327 0-.944-.955-1.152-3.926-1.781-2.618-.524-5.872-1.711-5.872-5.518 0-3.527 2.83-5.552 7.464-5.552 3.046 0 5.237.908 6.782 2.337a.39.39 0 01.037.526l-2.13 2.73a.386.386 0 01-.557.061c-1.045-.92-2.78-1.5-4.487-1.5-1.45 0-2.264.456-2.264 1.224 0 .873.957 1.083 4.104 1.746 3.076.663 5.659 1.816 5.659 5.482zm-23.268-1.78c0 1.92-1.59 3.597-4.067 3.597-1.627 0-2.512-.734-2.512-1.851 0-.978.744-1.712 2.194-1.922l4.385-.523v.699zM38.713 6.6c-3.704 0-6.495 1.224-7.742 3.643a.392.392 0 00.129.495l2.83 1.996c.178.125.428.084.535-.105.786-1.397 2.547-1.874 4.248-1.874 2.087 0 3.076.732 3.076 1.746v.279c0 .42-.247.63-.919.699l-4.846.419c-3.254.313-5.658 2.304-5.658 5.482 0 3.213 2.475 5.448 5.977 5.448 2.759 0 4.527-1.327 5.446-2.724v1.987a.39.39 0 00.393.388h3.883a.39.39 0 00.393-.388V13.689c0-4.854-2.582-7.089-7.745-7.089zM27.163.387v23.668a.39.39 0 01-.393.389h-3.918a.39.39 0 01-.393-.389V.38c0-.21.173-.38.385-.38h3.926a.39.39 0 01.393.388zm-17.72 19.99c-2.652 0-4.633-1.851-4.633-4.68 0-2.829 1.98-4.68 4.633-4.68s4.598 1.782 4.598 4.68c0 2.863-1.945 4.68-4.598 4.68zm8.768-13.41h-3.878a.396.396 0 00-.398.393v2.052c-.99-1.572-3.042-2.864-5.765-2.864-4.386 0-8.17 3.248-8.17 9.08C0 21.424 3.607 24.6 8.311 24.6c2.547 0 4.527-1.047 5.695-2.688v1.117c0 2.514-1.239 4.505-5.2 4.505-1.991 0-3.59-.654-4.992-1.88a.388.388 0 00-.59.082l-1.759 2.91c-.227.376-.196.587-.052.711 1.806 1.55 4.155 2.507 7.57 2.507 7.428 0 9.621-4.085 9.621-8.59V7.355a.39.39 0 00-.393-.388z"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <nav
            data-test="primary-header-nav"
            class="mt-std mb-std mb-md-0 pb-xsm memberHeader__HeaderStyles__bottomShadow"
          >
            <div class="memberHeader__HeaderStyles__navigationWrapper">
              <div class="px-std px-md-lg">
                <div class="d-flex flex-row align-items-center">
                  <div class="col">
                    <h2 data-test="primary-header-title" class="d-none d-md-block">
                      Hello, what would you like to explore today?
                    </h2>
                  </div>
                </div>
                <div class="css-trqft4">
                  <div class="memberHeader__HeaderStyles__navigationItem">
                    <div class="d-none d-md-flex align-items-center justify-content-center">
                      <div>
                        <a
                          class="gd-ui-button p-0 css-ddqncx  css-1s7hc3h"
                          type="button"
                          data-test="site-header-companies"
                          href="#"
                          target="_top"
                          data-ga-lbl="null"
                          onClick={(event) => this.handleOnClick('Home')}
                        >
                          <div class="d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-start">
                            <span class="SVGInline d-flex">
                              <svg
                                class="SVGInline-svg d-flex-svg"
                                style={{ width: '48px', height: '48px' }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                              >
                                <g fill="none" fill-rule="evenodd">
                                  <path
                                    fill="#0CAA41"
                                    fill-rule="nonzero"
                                    d="M19.182 10h19.636c1.205 0 2.182.895 2.182 2v27H17V12c0-1.105.977-2 2.182-2zM39 37V13a1 1 0 00-1-1H20a1 1 0 00-1 1v24h20z"
                                  ></path>
                                  <path
                                    fill="#DFF7E7"
                                    fill-rule="nonzero"
                                    d="M22 14h14a1 1 0 011 1v20h-4v-3a3 3 0 00-3-3h-2a3 3 0 00-3 3v3h-4V15a1 1 0 011-1z"
                                  ></path>
                                  <path
                                    fill="#0CAA41"
                                    fill-rule="nonzero"
                                    d="M16 19v2h-6a1 1 0 00-1 1v15h7v2H7V21c0-1.105.728-2 1.625-2H16z"
                                  ></path>
                                  <rect
                                    width="4"
                                    height="4"
                                    x="23"
                                    y="16"
                                    fill="#0CAA41"
                                    rx="2"
                                  ></rect>
                                  <rect
                                    width="4"
                                    height="4"
                                    x="23"
                                    y="21"
                                    fill="#0CAA41"
                                    rx="2"
                                  ></rect>
                                  <rect
                                    width="4"
                                    height="4"
                                    x="31"
                                    y="16"
                                    fill="#0CAA41"
                                    rx="2"
                                  ></rect>
                                  <rect
                                    width="4"
                                    height="4"
                                    x="31"
                                    y="21"
                                    fill="#0CAA41"
                                    rx="2"
                                  ></rect>
                                  <path
                                    fill="#0CAA41"
                                    stroke="#0CAA41"
                                    stroke-width="2"
                                    d="M27 38h4v-6a1 1 0 00-1-1h-2a1 1 0 00-1 1v6z"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                            <h3 class="mx-xsm">Home</h3>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="memberHeader__HeaderStyles__navigationItem">
                    <div class="d-none d-md-flex align-items-center justify-content-center">
                      <div>
                        <a
                          class="gd-ui-button p-0 css-ddqncx  css-1s7hc3h"
                          href="#"
                          type="button"
                          data-test="site-header-jobs"
                          target="_top"
                          data-ga-lbl="null"
                          onClick={(event) => this.handleOnClick('Jobs')}
                        >
                          <div class="d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-start">
                            <span class="SVGInline d-flex">
                              <svg
                                class="SVGInline-svg d-flex-svg"
                                style={{ width: '48px', height: '48px' }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                              >
                                <g fill="none" fill-rule="evenodd">
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
                            <h3 class="mx-xsm">Jobs</h3>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="memberHeader__HeaderStyles__navigationItem">
                    <div class="d-none d-md-flex align-items-center justify-content-center">
                      <div>
                        <a
                          class="gd-ui-button p-0 css-ddqncx  css-1s7hc3h"
                          type="button"
                          data-test="site-header-interviews"
                          href="#"
                          target="_top"
                          data-ga-lbl="null"
                          onClick={(event) => this.handleOnClick('Reviews')}
                        >
                          <div class="d-flex flex-column align-items-center justify-content-center flex-md-row justify-content-md-start">
                            <span class="SVGInline d-flex">
                              <svg
                                class="SVGInline-svg d-flex-svg"
                                style={{ width: '48px', height: '48px' }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                              >
                                <g fill="none" fill-rule="evenodd">
                                  <path
                                    fill="#0CAA41"
                                    fill-rule="nonzero"
                                    d="M10 22c0 .295.011.588.033.879C8.755 24.165 8 25.779 8 27.5c0 2.192 1.218 4.267 3.35 5.704l.741.5.122.885c.053.386.089.772.107 1.158.398-.226.765-.457 1.1-.693l.717-.505.859.186c.808.175 1.648.265 2.504.265.853 0 1.676-.089 2.458-.254 1.076.404 2.214.719 3.398.932C21.64 36.518 19.639 37 17.5 37c-1.012 0-1.993-.108-2.928-.31-1.206.849-2.73 1.62-4.572 2.31.345-1.38.422-2.758.232-4.137C7.649 33.12 6 30.469 6 27.5c0-2.934 1.61-5.557 4.14-7.3-.093.59-.14 1.19-.14 1.8z"
                                  ></path>
                                  <path
                                    fill="#FFF"
                                    stroke="#0CAA41"
                                    stroke-width="2"
                                    d="M32.714 37.39a11.828 11.828 0 01.309-3.935l.124-.5.479-.19C38.73 30.748 42 26.586 42 22c0-6.576-6.675-12-15-12s-15 5.424-15 12 6.675 12 14.991 12l.327-.003.667-.016.309.364c.946 1.115 2.418 2.134 4.42 3.044z"
                                  ></path>
                                  <ellipse cx="27" cy="22" fill="#DFF7E7" rx="12" ry="9"></ellipse>
                                  <circle cx="21" cy="22" r="2" fill="#0CAA41"></circle>
                                  <circle cx="27" cy="22" r="2" fill="#0CAA41"></circle>
                                  <circle cx="33" cy="22" r="2" fill="#0CAA41"></circle>
                                </g>
                              </svg>
                            </span>
                            <h3 class="mx-xsm">Reviews</h3>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
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
    openProfileTabOnClick: (payload) => {
      dispatch({
        type: openProfileTabOnClick,
        payload,
      });
    },
    updateSearcFilter: (payload) => {
      dispatch({
        type: updateSearcFilter,
        payload,
      });
    },
    updateCompanyProfile: (payload) => {
      dispatch({
        type: updateCompanyProfile,
        payload,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
//export default Navbar;
