import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import axios from 'axios';
// import serverUrl from '../../../config.js';
// import { updateCompanyProfile } from '../../../constants/action-types';
import { connect } from 'react-redux';
import './Body.css';

class RightBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authFlag: false,
      updateProfile: false,
    };
  }
  // componentDidMount() {
  //   //set the with credentials to true
  //   const data = localStorage.getItem('userId');
  //   console.log(data);
  //   axios.defaults.withCredentials = true;
  //   axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  //   //make a post request with the user data')
  //   axios
  //     .get(serverUrl + 'company/profile', {
  //       params: {
  //         CompanyID: data,
  //       },
  //     })
  //     .then(
  //       (response) => {
  //         if (response.status === 200) {
  //           console.log(response);
  //           localStorage.setItem('companyName',response.data.CompanyName);
  //           let payload = {
  //             CompanyName: response.data.CompanyName,
  //             Website: response.data.Website,
  //             Size: response.data.Size,
  //             ProfileImg: response.data.ProfileImg,
  //             Type: response.data.Type,
  //             Revenue: response.data.Revenue,
  //             Headquarter: response.data.Headquarter,
  //             Industry: response.data.Industry,
  //             Founded: response.data.Founded,
  //             CompanyDescription: response.data.CompanyDescription,
  //             CompanyMission: response.data.CompanyMission,
  //             CEO: response.data.CEO,
  //             City: response.data.City,
  //             State: response.data.State,
  //           };
  //           console.log('payload', payload);
  //           this.props.updateCompanyProfile(payload);
  //           this.setState({
  //             authFlag: true,
  //           });
  //         }
  //       },
  //       (error) => {
  //         this.setState({
  //           errorMessage: error.response.data,
  //         });
  //       }
  //     );
  // }

  handleUpdateProfile = () => {
    console.log('Inside update profile');
    this.props.handleClick('updateProfile');
    // this.setState({
    //   updateProfile: true,
    // });
    // console.log('flag', this.state.updateProfile);
  };
  render() {
    // let redirectVar = null;
    // if (this.state.updateProfile) {
    //   redirectVar = <Redirect to="/EmployerProfile" />;
    // }
    return (
      <div class="col-12 col-md-8">
        {/*redirectVar*/}
        <div>
          <div id="ProfilePageBannerContainer"></div>
          <div class="d-flex flex-column-reverse flex-md-column">
            <section
              class="SectionStyles__section___3ZANh px-std px-md-0 mt-lg mt-md-0"
              data-test="ProfileInfoSection"
              id="ProfileInfo"
            >
              <div class="profileInfoStyle__profileInfo___2aFZe">
                <div
                  class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters"
                  data-test="sectionHeader"
                >
                  <div class="d-flex justify-content-start align-items-center">
                    <div class="d-flex col no-gutters flex-column">
                      <div class="d-flex col justify-content-between align-items-center no-gutters SectionHeaderStyles__headingGroup___b6Lyf">
                        <div class="d-flex justify-content-start align-items-center SectionHeaderStyles__nameGroup___2N2pK SectionHeaderStyles__visible___3a7mt">
                          <h3 class="m-0 mr-sm SectionHeaderStyles__name___saD9S" title="Wipro">
                            {this.props.companyInfo.CompanyName} Overview
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="profileInfoStyle__profileInfoContainer___26tEl">
                  <div class="d-none justify-content-center align-items-center profileInfoStyle__loading___1UFs_">
                    <div
                      class="ui-spinner hi css-1ln3gi6"
                      color="#0caa41"
                      size="48"
                      stroke-width="2"
                    >
                      <span class="SVGInline">
                        <svg
                          class="SVGInline-svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="greena" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stop-color="currentColor"></stop>
                              <stop
                                offset="100%"
                                stop-color="currentColor"
                                stop-opacity=".4"
                              ></stop>
                            </linearGradient>
                            <linearGradient id="greenb" x1="0%" y1="100%" x2="100%" y2="0%">
                              <stop offset="0%" stop-color="currentColor" stop-opacity=".4"></stop>
                              <stop offset="66%" stop-color="currentColor" stop-opacity="0"></stop>
                            </linearGradient>
                          </defs>
                          <g fill="none">
                            <path
                              d="M21 12a9 9 0 00-18 0"
                              stroke="currentColor"
                              stroke-linecap="round"
                            ></path>
                            <path d="M3 12a9 9 0 009 9" stroke="url(#greena)"></path>
                            <path d="M12 21a9 9 0 009-9" stroke="url(#greenb)"></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div class="row mb-lg profileInfoStyle__profileInfoMain___Y8O5Z profileInfoStyle__visible___1bdIC">
                    <div
                      class="col-12 col-sm-6 col-lg-4 p-0"
                      style={{ flex: '0 0 100%', maxWidth: '100%' }}
                    >
                      <ul class="css-155za0w row px-0 m-0">
                        <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-xxsm">
                          <label class="css-1f0lhlt ecl3kjh0">Website:</label>
                          <a
                            href={this.props.companyInfo.Website}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="css-1hg9omi"
                            // style={{ fontSize: 'small' }}
                            data-test="employer-website"
                          >
                            {this.props.companyInfo.Website}
                          </a>
                        </li>
                        <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                          <label class="css-1f0lhlt ecl3kjh0">Headquarters:</label>
                          <div data-test="employer-headquarters">
                            {this.props.companyInfo.Headquarter}{' '}
                          </div>
                        </li>
                        <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                          <label class="css-1f0lhlt ecl3kjh0">Size:</label>
                          <div data-test="employer-size">{this.props.companyInfo.Size}</div>
                        </li>
                        <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                          <label class="css-1f0lhlt ecl3kjh0">Location:</label>
                          <div data-test="employer-size">
                            {this.props.companyInfo.City}, {this.props.companyInfo.State}
                          </div>
                        </li>
                        <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                          <label class="css-1f0lhlt ecl3kjh0">Founded:</label>
                          <div data-test="employer-founded">
                            {this.props.companyInfo.Founded &&
                            this.props.companyInfo.Founded.length > 0
                              ? this.props.companyInfo.Founded.substring(0, 4)
                              : ' '}{' '}
                          </div>
                        </li>
                        <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                          <label class="css-1f0lhlt ecl3kjh0">Type:</label>
                          <div data-test="employer-type">
                            Company - {this.props.companyInfo.Type}{' '}
                          </div>
                        </li>
                        <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                          <label class="css-1f0lhlt ecl3kjh0">Industry:</label>
                          <div data-test="employer-industry">
                            {this.props.companyInfo.Industry}{' '}
                          </div>
                        </li>
                        <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                          <label class="css-1f0lhlt ecl3kjh0">Revenue:</label>
                          <div data-test="employer-revenue">
                            {this.props.companyInfo.Revenue} (USD)
                          </div>
                        </li>
                        <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                          <label class="css-1f0lhlt ecl3kjh0">CEO:</label>
                          <div data-test="employer-revenue">{this.props.companyInfo.CEO}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="d-flex no-gutters justify-content-center align-items-start profileInfoStyle__actions___3-CvK">
                  <div class="col-4 px-xxsm d-flex flex-column justify-content-center align-items-center">
                    <a href="#" onClick={this.handleUpdateProfile}>
                      <button class="gd-ui-button m-0 mb-xsm p-0 d-flex justify-content-center align-items-center profileInfoStyle__actionBtn___2ectR css-1c2vj07">
                        <div class="d-flex mt-xsm justify-content-center align-items-center">
                          <div class="d-block d-md-none profileInfoStyle__actionIcon___iWiGy">
                            <span class="SVGInline">
                              <svg
                                class="SVGInline-svg"
                                style={{ width: '24px', height: '24px' }}
                                height="24"
                                width="24"
                                viewBox="0 0 32 40"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g fill="currentColor" fill-rule="evenodd">
                                  <path
                                    id="prefix__icon-update-2"
                                    d="M22.002 5.133C27.865 7.493 32 13.206 32 19.879c0 8.33-6.441 15.163-14.642 15.847l2.592 2.577a.99.99 0 01.115 1.268l-.115.138a1.005 1.005 0 01-1.276.115l-.138-.115-4.243-4.215a.99.99 0 01-.08-1.318l.103-.112 4.22-4.192a1.004 1.004 0 011.414 0 .99.99 0 010 1.405l-2.454 2.44C24.524 32.975 30 27.063 30 19.879c0-5.55-3.27-10.342-7.999-12.575V5.133zM14.292.29A1.005 1.005 0 0115.57.176l.138.115 4.243 4.215a.99.99 0 01.116 1.27l-.13.15-4.229 4.202-.138.115a1.006 1.006 0 01-1.138 0l-.138-.115-.116-.137a.99.99 0 010-1.13l.116-.138L17.03 6c-.34-.025-.684-.037-1.031-.037-7.732 0-14 6.23-14 13.915 0 6.304 4.217 11.629 10 13.34L12 35.282C5.1 33.517 0 27.29 0 19.88 0 11.096 7.163 3.976 16 3.976l.598.01-2.305-2.29A.99.99 0 0114.177.43l.116-.138z"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </button>
                    </a>
                    <div class="d-flex justify-content-center align-items-start">
                      <div class="profileInfoStyle__caption___7rzry">Update Profile</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
            data-test="AboutMeSection"
            id="AboutCompany"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <h3 data-test="profileHeading">About Company</h3>
              </div>
            </div>
            <p
              data-test="description"
              class="m-0 preWrap"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {this.props.companyInfo.CompanyDescription}
            </p>
          </section>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
            data-test="MissionSection"
            id="CompanyMission"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <h3 data-test="profileHeading">Mission</h3>
              </div>
            </div>
            <p
              data-test="description"
              class="m-0 preWrap"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {this.props.companyInfo.CompanyMission}
            </p>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { companyInfo } = state.CompaniesProfileReducer;
  return {
    companyInfo,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateCompanyProfile: (payload) => {
//       dispatch({
//         type: updateCompanyProfile,
//         payload,
//       });
//     },
//   };
// };

// export default LoginBody;
export default connect(mapStateToProps, null)(RightBlock);
