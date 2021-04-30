import React, { Component } from 'react';
import './ApplicantProfile.css';
import axios from 'axios';
import serverUrl from '../../../config.js';
import { Redirect } from 'react-router';

class ApplicantProfileHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicantInfo: {},
      length: 0
    };
  }

  componentDidMount() {
    if(!localStorage.getItem('StudentId')) {
      return <Redirect to="/Employer" />;
    }
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'company/jobsApplicantProfile', {
        params: { StudentID: localStorage.getItem('StudentId') },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          console.log('response', response);
          this.setState({
            applicantInfo: response.data,
          });
        }
        this.setState({
          length: this.state.applicantInfo.Skills.length
        })        
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'No Reviews Found',
        });
      });
  }
  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'student') {
        return <Redirect to="/Home" />;
      } else if (localStorage.getItem('userrole') === 'admin') {
        return <Redirect to="/AdminHomePage" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    return (
      <div className="pageContentWrapper ">
        <div id="UserProfilePageContent" class>
          <div id="UserProfile" className="gdGrid container">
            <div className="css-1tgr9d eds5rs80">
              <div className="applicationStyle__profileApplication___Jyu4n">
                <div className="row flex-column flex-md-row p-0 px-md-lg py-md-xxl">
                  <div class="col-12 col-md-12">
                    <div>
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
                                  <div class="d-none d-md-block">
                                    <div data-test="profilePhoto" id="ProfilePhoto">
                                      <div class="profilePhotoStyle__profilePhoto___CTVQw">
                                        <div class="d-inline-flex justify-content-start align-items-center profilePhotoStyle__photoContainer___3itOq profilePhotoStyle__removeCursor___3tnuM">
                                          <div class="mr-xsm">
                                            {this.state.applicantInfo.ProfilePicURL === '' ? (
                                              <span class="SVGInline profilePhotoStyle__icon___1H_01">
                                                <svg
                                                  class="SVGInline-svg profilePhotoStyle__icon___1H_01-svg"
                                                  style={{ width: '55px', height: '55px' }}
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path
                                                    d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z"
                                                    fill="currentColor"
                                                    fill-rule="evenodd"
                                                  ></path>
                                                </svg>
                                              </span>
                                            ) : (
                                              <div
                                                id="ProfileImage"
                                                data-test="profileImageEditableContainer"
                                                class="profilePhotoStyle__editableContainer___3auRr"
                                              >
                                                <img
                                                  src={this.state.applicantInfo.ProfilePicURL}
                                                  alt="Profile Image"
                                                />
                                                <div>
                                                  <i class="icon-camera"></i>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <div class="profilePhotoBadge"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="d-flex col justify-content-between align-items-center no-gutters SectionHeaderStyles__headingGroup___b6Lyf">
                                    <div class="d-flex justify-content-start align-items-center SectionHeaderStyles__nameGroup___2N2pK SectionHeaderStyles__visible___3a7mt">
                                      <h3
                                        class="m-0 mr-sm SectionHeaderStyles__name___saD9S"
                                        title={this.state.applicantInfo.Name}
                                      >
                                        {this.state.applicantInfo.Name}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <section
                        class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
                        data-test="AboutMeSection"
                        id="AboutMe"
                      >
                        <div
                          class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
                          data-test="sectionHeader"
                        >
                          <div class="d-flex justify-content-start align-items-center">
                            <h3 data-test="profileHeading">
                              About {this.state.applicantInfo.Name}
                            </h3>
                          </div>
                        </div>
                        <p data-test="description" class="m-0 preWrap">
                          {this.state.applicantInfo.About}
                        </p>
                      </section>
                      <section
                        class="SectionStyles__section___3ZANh px-std px-md-0 mt-0"
                        data-test="AboutMeSection"
                        id="More Information"
                      >
                        <div
                          class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
                          data-test="sectionHeader"
                        >
                          <div class="d-flex justify-content-start align-items-center">
                            <h3 data-test="profileHeading">More Information</h3>
                          </div>
                        </div>
                        <div class="row mb-lg profileInfoStyle__profileInfoMain___Y8O5Z profileInfoStyle__visible___1bdIC">
                          <div
                            class="col-12 col-sm-6 col-lg-4 p-0"
                            style={{ flex: '0 0 100%', maxWidth: '100%' }}
                          >
                            <ul class="css-155za0w row px-0 m-0">
                              <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                                <label class="css-1f0lhlt ecl3kjh0">Current Job Title:</label>
                                <div data-test="employer-headquarters">
                                  {this.state.applicantInfo.CurrentJobTitle}
                                </div>
                              </li>
                              <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                                <label class="css-1f0lhlt ecl3kjh0">Job Status:</label>
                                <div data-test="employer-size">
                                  {this.state.applicantInfo.JobStatus}
                                </div>
                              </li>
                              <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                                <label class="css-1f0lhlt ecl3kjh0">Ethinicity:</label>
                                <div data-test="employer-size">
                                  {this.state.applicantInfo.Ethnicity}
                                </div>
                              </li>
                              <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                                <label class="css-1f0lhlt ecl3kjh0">Preferred Job Title:</label>
                                <div data-test="employer-founded">
                                  {' '}
                                  {this.state.applicantInfo.PreferredJobTitle}
                                </div>
                              </li>
                              <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                                <label class="css-1f0lhlt ecl3kjh0">Target Salary:</label>
                                <div data-test="employer-type">
                                  {this.state.applicantInfo.TargetSalary}
                                </div>
                              </li>
                              <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                                <label class="css-1f0lhlt ecl3kjh0">Open to Relocation:</label>
                                <div data-test="employer-industry">
                                  {this.state.applicantInfo.OpentoRelocation}
                                </div>
                              </li>
                              <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                                <label class="css-1f0lhlt ecl3kjh0">Disability:</label>
                                <div data-test="employer-revenue">
                                  {this.state.applicantInfo.Disability}
                                </div>
                              </li>
                              <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                                <label class="css-1f0lhlt ecl3kjh0">Veteran Status:</label>
                                <div data-test="employer-revenue">
                                  {this.state.applicantInfo.VeteranStatus}
                                </div>
                              </li>
                              <li class="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                                <label class="css-1f0lhlt ecl3kjh0">Race:</label>
                                <div data-test="employer-revenue">
                                  {this.state.applicantInfo.Race}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </section>
                      {this.state.length > 0 ? (
                      <section
                        class="SectionStyles__section___3ZANh px-std px-md-0 mt-lg"
                        id="Skills"
                      >
                        <div class="skillsStyle__skills___2I7sR">
                          <div
                            class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters SectionHeaderStyles__bordered___3i8xM"
                            data-test="sectionHeader"
                          >
                            <div class="d-flex justify-content-start align-items-center">
                              <h3 data-test="skillsHeading">Skills</h3>
                            </div>
                          </div>
                          <div
                            class="skillsStyle__capitalize___1tkT7 skillsStyle__skillList___3qVgi"
                            data-test="skillList"
                          >
                            { this.state.applicantInfo.Skills.map((listitem) => (
                            <div class="css-zomrfc" >
                              <span title="Html" class="css-1p0oo7a">
                                {listitem}
                              </span>
                              <span class="css-1dpqmrj"></span>
                            </div>
                            ))}
                          </div>
                        </div>
                      </section>
                      ) : ('' ) }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicantProfileHome;
